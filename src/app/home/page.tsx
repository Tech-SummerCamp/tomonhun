import { BottomBar } from '@/components/bottom-bar';
import { TopBar } from '@/components/top-bar';
import { AvatarsDemo } from '@/demo';
import { cn } from '@/lib/utils';
import styles from '@/styles/bounce.module.css';

export default function Page() {
  return (
    <div className='h-full max-w-screen-md mx-auto'>
      {/* ボトムバー */}
      <BottomBar />

      {/* PC用 */}
      <TopBar />

      <div className='flex justify-center sm:mt-24'>
        <div className='relative w-[460px] h-[500px]'>
          {/* 最初の8こまで */}
          {AvatarsDemo.filter((_, i) => i < 5).map((avatar, i) => (
            <div
              key={i}
              className={cn(styles[`ellipse${i + 1}`], 'bg-cover')}
              style={{ backgroundImage: `url(${avatar.imageUrl})` }}
            ></div>
          ))}
        </div>
      </div>

      {/* 自分の簡易プロフィール */}
      <div className='fixed bottom-6 max-sm:bottom-24 max-sm:left-6 sm:right-[calc((100vw-768px)/2)] flex flex-col gap-2 z-10'>
        <p>ID: yutotuy</p>
        <p>プレイヤー: 大先生</p>
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img
          src='/yutotuy.png'
          className='border rounded-full w-20 h-20 sm:ml-auto'
        />
      </div>
    </div>
  );
}
