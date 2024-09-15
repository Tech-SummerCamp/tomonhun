import { Avatar } from './lib/shooting/avatar';

export const AvatarsDemo = [
  {
    name: 'タローくん',
    imageUrl: '/k-taro.png',
    message: 'えぇ〜〜',
    favorite: 'Web',
  },
  {
    name: 'ひなりん',
    imageUrl: '/hinalin.png',
    message: 'Gradleよりも強敵だ！！',
    favorite: 'Kotlin',
  },
  {
    name: '浦くん',
    imageUrl: '/ura.png',
    message: 'ぎゃー',
    favorite: 'ハンバーグ',
  },
  {
    name: '大先生',
    imageUrl: '/yutotuy.png',
    message: 'ぎゃー',
    favorite: 'ハンバーグ',
  },
  {
    name: 'たまちゃ',
    imageUrl: '/tamacha.png',
    message: 'ぎゃー',
    favorite: 'ハンバーグ',
  },
] as const satisfies Avatar[];
