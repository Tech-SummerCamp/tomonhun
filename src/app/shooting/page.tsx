import { ShootingView } from "../../components/shooting/ShootingView";
import type { Avatar } from "../../lib/shooting/avatar";

// TODO: データベースから取得
const avatarsData: Avatar[] = [
  {
    name: "寺田雄翔",
    imageUrl: "/kutsuhimo_musubu_man.png",
    message: "ぎゃー"
  },
  {
    name: "寺田雄翔",
    imageUrl: "/kutsuhimo_musubu_man.png",
    message: "ぎゃー"
  },
  {
    name: "寺田雄翔",
    imageUrl: "/kutsuhimo_musubu_man.png",
    message: "ぎゃー"
  },
  {
    name: "寺田雄翔",
    imageUrl: "/kutsuhimo_musubu_man.png",
    message: "ぎゃー"
  },
  {
    name: "寺田雄翔",
    imageUrl: "/kutsuhimo_musubu_man.png",
    message: "ぎゃー"
  },
  {
    name: "寺田雄翔",
    imageUrl: "/kutsuhimo_musubu_man.png",
    message: "ぎゃー"
  },
];

export default function Page() {
  return (
    <ShootingView avatars={avatarsData} />
  )
}