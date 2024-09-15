import type { Avatar } from '@/lib/shooting/avatar';

export function StockView({ avatars }: { avatars: Avatar[] }) {
  return (
    <div className='flex gap-4 w-full bottom-4 justify-center fixed'>
      {avatars.map((item, index) => (
        <div
          key={index}
          className='flex-[1/5] bg-[#D9D9D9] border-[#F5F5F5] border-4 w-20 max-h-20 aspect-square'
        >
          <img src={item.imageUrl} alt='avatar' className='aspect-auto' />
        </div>
      ))}
      {Array.from({ length: 5 - avatars.length }).map((_, index) => (
        <div
          key={index}
          className='bg-[#D9D9D9] border-[#F5F5F5] border-4 w-20 max-h-20 aspect-square'
        />
      ))}
    </div>
  );
}
