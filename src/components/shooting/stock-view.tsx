import type { Avatar } from '@/lib/shooting/avatar';

export function StockView({ avatars }: { avatars: Avatar[] }) {
  return (
    <div className='fixed bottom-4 flex w-full justify-center gap-4'>
      {/* {avatars.map((avatar, index) => (
        <div key={index} className="stock-view__avatar">
          <img src={avatar.imageUrl} alt={avatar.name} />
          <p>{avatar.message}</p>
        </div>
      ))} */}
      {avatars.map((item, index) => (
        <div
          key={index}
          className='aspect-square max-h-20 w-20 border-4 border-[#F5F5F5] bg-[#D9D9D9]'
        >
          <img
            src={item.imageUrl}
            alt='avatar'
            className='m-auto aspect-auto max-h-[72px] max-w-[72px]'
          />
          {/* <p>message</p> */}
        </div>
      ))}
      {Array.from({ length: 5 - avatars.length }).map((_, index) => (
        <div
          key={index}
          className='aspect-square max-h-20 w-20 border-4 border-[#F5F5F5] bg-[#D9D9D9]'
        >
          {/* <img src="https://placehold.jp/80x80.png" alt="avatar" className="max-w-16 max-h-16 aspect-auto" /> */}
          {/* <p>message</p> */}
        </div>
      ))}
    </div>
  );
}
