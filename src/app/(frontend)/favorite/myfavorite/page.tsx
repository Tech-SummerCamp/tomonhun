"use client";

import { useEffect, useState } from "react";
import { useSession } from "next-auth/react";

interface Favorite {
  id: string;
  name: string;
}

export default function MyFavorite() {
  const { data: session } = useSession();
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFavorite, setCurrentFavorite] = useState<Favorite | null>(null);
  const [newName, setNewName] = useState("");

  useEffect(() => {
    if (session) {
      fetchFavorites();
    }
  }, [session]);

  const fetchFavorites = async () => {
    try {
      const res = await fetch("/api/favorites");
      if (!res.ok) {
        throw new Error("Failed to fetch favorites");
      }
      const data: Favorite[] = await res.json();
      setFavorites(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const openModal = (favorite: Favorite) => {
    setCurrentFavorite(favorite);
    setNewName(favorite.name);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setCurrentFavorite(null);
    setNewName("");
  };

  const handleEdit = async () => {
    if (!currentFavorite) return;

    try {
      const res = await fetch(`/api/favorites/${currentFavorite.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name: newName }),
      });

      if (!res.ok) {
        throw new Error("Failed to update favorite");
      }

      setFavorites((prev) =>
        prev.map((fav) =>
          fav.id === currentFavorite.id ? { ...fav, name: newName } : fav
        )
      );
      closeModal();
    } catch (error) {
      console.error(error);
    }
  };

  if (!session) {
    return <p>ログインしてください</p>;
  }

  if (loading) {
    return <p>読み込み中...</p>;
  }

  return (
    <div>
      <h1>お気に入りリスト</h1>
      <ul>
        {favorites.map((favorite) => (
          <li key={favorite.id}>
            {favorite.name}{" "}
            <button onClick={() => openModal(favorite)}>編集</button>
          </li>
        ))}
      </ul>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>お気に入りを編集</h2>
            <input
              type="text"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
            />
            <button onClick={handleEdit}>保存</button>
            <button onClick={closeModal}>キャンセル</button>
          </div>
        </div>
      )}
    </div>
  );
}
