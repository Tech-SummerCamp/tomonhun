import type { Avatar } from '@/lib/shooting/avatar';

export function StockView({ avatars }: { avatars: Avatar[] }) {
  return (
    <div className='fixed bottom-4 flex w-full justify-center gap-4'>
      {avatars.map((item, index) => (
        <div
          key={index}
          className='aspect-square max-h-20 w-20 flex-[1/5] border-4 border-[#F5F5F5] bg-[#D9D9D9]'
        >
          <img src={item.imageUrl} alt='avatar' className='aspect-auto' />
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
