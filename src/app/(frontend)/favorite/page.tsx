"use client";
import { useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

export default function Favorites() {
  const { data: session } = useSession();
  const router = useRouter();
  const [name, setName] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!name) {
      alert("好物の名前を入力してください");
      return;
    }

    try {
      const res = await fetch("/api/favorites", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ name }),
      });

      if (res.ok) {
        setName("");
        alert("好物が作成されました");
        router.push("/favorites");
      } else {
        const errorData = await res.json();
        alert(errorData.message || "エラーが発生しました");
      }
    } catch (error) {
      alert("エラーが発生しました");
    }
  };

  return (
    <div>
      {!session ? (
        <p>ログインしてください</p>
      ) : (
        <form onSubmit={handleSubmit}>
          <div>
            <label htmlFor="name">好物の名前</label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <button type="submit">作成</button>
        </form>
      )}
    </div>
  );
}
