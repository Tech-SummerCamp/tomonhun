import SortingClientPage from '@/components/sorting/sorting-page';

export default function Page() {
  return (
    <SortingClientPage
      initialRemainCount={10}
      avatars={[
        {
          name: 'Yuto Terada',
          imageUrl: '/kutsuhimo_musubu_man.png',
          message: 'ぎゃー',
          favote: 'ハンバーガー',
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
          favote: '生ハム',
        },
        {
          name: 'Yuto Terada',
          imageUrl: '/kutsuhimo_musubu_man.png',
          message: 'ぎゃー',
          favote: 'コーヒー',
        },
      ]}
    />
  );
}
