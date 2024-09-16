import { BottomBar } from '@/components/bottom-bar';
import { TopBar } from '@/components/top-bar';
import { AvatarsDemo } from '@/demo';
import { cn } from '@/lib/utils';
import styles from '@/styles/bounce.module.css';

export default function Page() {
  return (
    <div className='mx-auto h-full max-w-screen-md'>
      {/* ボトムバー */}
      <BottomBar />

      {/* PC用 */}
      <TopBar />

      <div className='flex justify-center sm:mt-24'>
        <div className='relative h-[500px] w-[460px]'>
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
      <div className='fixed bottom-6 z-10 flex flex-col gap-2 max-sm:bottom-24 max-sm:left-6 sm:right-[calc((100vw-768px)/2)]'>
        <p>ID: yutotuy</p>
        <p>プレイヤー: 大先生</p>
        {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
        <img
          src='/yutotuy.png'
          className='h-20 w-20 rounded-full border sm:ml-auto'
        />
      </div>
    </div>
  );
}
