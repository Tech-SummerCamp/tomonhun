import { ShootingView } from '../../components/shooting/shooting-view';
import type { Avatar } from '../../lib/shooting/avatar';

// TODO: データベースから取得
const avatarsData: Avatar[] = [
  {
    name: 'Yuto Terada',
    imageUrl: '/kutsuhimo_musubu_man.png',
    message: 'ぎゃー',
    favote: 'ハンバーグ',
  },
  {
    name: 'Yuto Terada',
    imageUrl: '/kutsuhimo_musubu_man.png',
    message: 'ぎゃー',
    favote: 'ハンバーグ',
  },
  {
    name: 'Yuto Terada',
    imageUrl: '/kutsuhimo_musubu_man.png',
    message: 'ぎゃー',
    favote: 'ハンバーグ',
  },
  {
    name: 'Yuto Terada',
    imageUrl: '/kutsuhimo_musubu_man.png',
    message: 'ぎゃー',
    favote: 'ハンバーグ',
  },
  {
    name: 'Yuto Terada',
    imageUrl: '/kutsuhimo_musubu_man.png',
    message: 'ぎゃー',
    favote: 'ハンバーグ',
  },
  {
    name: 'Yuto Terada',
    imageUrl: '/kutsuhimo_musubu_man.png',
    message: 'ぎゃー',
    favote: 'ハンバーグ',
  },
  {
    name: 'Yuto Terada',
    imageUrl: '/kutsuhimo_musubu_man.png',
    message: 'ぎゃー',
    favote: 'ハンバーグ',
  },
];

export default function Page() {
  return <ShootingView avatars={avatarsData} />;
}
