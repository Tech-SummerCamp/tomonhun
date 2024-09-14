import { ThreeJSDemo } from "../../../components/shooting/canvas";
import { Avatar } from "../../../lib/shooting/avatar";

// TODO: データベースから取得
const avatarsData: Avatar[] = [
  {
    name: "寺田雄翔",
    imageUrl: "/kutsuhimo_musubu_man.png",
    message: "ぎゃー"
  }
];

export default function Page() {
  return (
    <ThreeJSDemo avatars={avatarsData} />
  )
}