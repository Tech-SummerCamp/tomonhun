import { Avatar } from '@/lib/shooting/avatar';
import {
  ChevronLeft,
  ChevronRight,
  Minus,
  MoveRight,
  Plus,
  Star,
} from 'lucide-react';
import { Button } from '../ui/button';

export function AvatarDetailsView({ avatar }: { avatar: Avatar }) {
  return (
    <div className='flex flex-col max-w-sm mx-auto gap-4'>
      <div className='flex items-center justify-center relative'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img className='h-60' src={avatar.imageUrl} alt={avatar.name} />
        <Button
          variant='ghost'
          className='absolute left-2 bottom-2 p-2 rounded-full'
        >
          <ChevronLeft />
        </Button>
        <Button
          variant='ghost'
          className='absolute right-2 bottom-2 p-2 rounded-full'
        >
          <ChevronRight />
        </Button>
      </div>
      <div>
        <div className='bottom-0 w-full h-16 p-4 bg-green-300 flex items-center justify-center'>
          <p className='font-bold text-2xl'>{avatar.name}</p>
        </div>
      </div>

      <div className='border-b-gray-300 pb-2 px-4 border-b-[1px] text-center text-lg md:text-xl'>
        体重:
        <span className='font-semibold text-xl md:text-2xl mr-4'>
          {avatar.weight}kg
        </span>
        身長:
        <span className='font-semibold text-xl md:text-2xl mr-4'>
          {avatar.height}m
        </span>
        <br />
        好物:
        <span className='font-semibold text-xl md:text-2xl mr-4'>
          {avatar.favorite}
        </span>
      </div>

      <div className='flex flex-col gap-4'>
        <div className='flex gap-2 justify-center items-center text-lg md:text-xl'>
          Lv.{avatar.level} <MoveRight />{' '}
          <span className='text-orange-300 font-bold'>{avatar.level + 1}</span>
        </div>
        <div className='flex gap-4 justify-center items-center'>
          <Button variant='outline' className='p-2 rounded-full'>
            <Minus />
          </Button>
          <span className='font-semibold text-xl'>{avatar.favorite}</span>
          <Button variant='outline' className='p-2 rounded-full'>
            <Plus />
          </Button>
        </div>
        <Button
          size='lg'
          className='bg-green-300 text-gray-950 hover:bg-green-400 rounded-full self-center font-bold text-xl'
        >
          強化する
        </Button>
      </div>

      <div>
        <div className='flex gap-4 items-center h-12'>
          <Star className='min-w-8 min-h-8 fill-gray-400 stroke-none' />
          <p>
            次のデコレまであと<span className='font-bold text-xl'>14個</span>
          </p>
        </div>
        <div className='flex gap-4 items-center h-12'>
          <Star className='min-w-8 min-h-8 fill-gray-400 stroke-none' />
          <p>
            好物総取得数:{' '}
            <span className='font-bold text-xl'>
              {avatar.numberOfFavorites}個
            </span>
          </p>
        </div>
        <div className='flex gap-4 items-center h-12'>
          <Star className='min-w-8 min-h-8 fill-gray-400 stroke-none' />
          <p>
            断末魔:
            <span className='font-bold text-xl'>{avatar.message}</span>
          </p>
        </div>
        <div className='flex gap-4 items-center h-12'>
          <Star className='min-w-8 min-h-8 fill-gray-400 stroke-none' />
          <p>
            合計討伐数:{' '}
            <span className='font-bold text-xl'>{avatar.defeats}体</span>
          </p>
        </div>
        <div className='flex gap-4 items-center h-12'>
          <Star className='min-w-8 min-h-8 fill-gray-400 stroke-none' />
          <p>
            出会った日時:{' '}
            <span className='font-bold text-xl'>
              {avatar.firstMet.toLocaleDateString()}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
