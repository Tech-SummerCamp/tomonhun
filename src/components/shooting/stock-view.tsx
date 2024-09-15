import type { Avatar } from '@/lib/shooting/avatar';

export function StockView({ avatars }: { avatars: Avatar[] }) {
  return (
    <div className='fixed bottom-4 flex w-full justify-center gap-4'>
      {avatars.map((item, index) => (
        <div
          key={index}
          className='flex-[1/5] bg-[#D9D9D9] border-[#F5F5F5] border-4 w-20 max-h-20 aspect-square'
        >
          <img src={item.imageUrl} alt='avatar' className='aspect-auto' />
          {/* <p>message</p> */}
        </div>
      ))}
      {Array.from({ length: 5 - avatars.length }).map((_, index) => (
        <div
          key={index}
          className='aspect-square max-h-20 w-20 border-4 border-[#F5F5F5] bg-[#D9D9D9]'
        />
      ))}
    </div>
  );
}
