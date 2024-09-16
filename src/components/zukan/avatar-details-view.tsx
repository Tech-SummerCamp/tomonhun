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
    <div className='mx-auto mb-4 mt-16 flex max-w-sm flex-col gap-4'>
      <div className='relative flex items-center justify-center'>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          className='pointer-events-none h-60 select-none'
          src={avatar.imageUrl}
          alt={avatar.name}
        />
        <Button
          variant='ghost'
          className='absolute bottom-2 left-2 rounded-full p-2'
        >
          <ChevronLeft />
        </Button>
        <Button
          variant='ghost'
          className='absolute bottom-2 right-2 rounded-full p-2'
        >
          <ChevronRight />
        </Button>
      </div>
      <div>
        <div className='bottom-0 flex h-16 w-full items-center justify-center bg-green-300 p-4'>
          <p className='text-2xl font-bold'>{avatar.name}</p>
        </div>
      </div>

      <div className='border-b-[1px] border-b-gray-300 px-4 pb-2 text-center text-lg md:text-xl'>
        体重:
        <span className='mr-4 text-xl font-semibold md:text-2xl'>
          {avatar.weight}kg
        </span>
        身長:
        <span className='mr-4 text-xl font-semibold md:text-2xl'>
          {avatar.height}m
        </span>
        <br />
        好物:
        <span className='mr-4 text-xl font-semibold md:text-2xl'>
          {avatar.favorite}
        </span>
      </div>

      <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-center gap-2 text-lg md:text-xl'>
          Lv.{avatar.level} <MoveRight />{' '}
          <span className='font-bold text-orange-300'>{avatar.level + 1}</span>
        </div>
        <div className='flex items-center justify-center gap-4'>
          <Button variant='outline' className='rounded-full p-2'>
            <Minus />
          </Button>
          <span className='text-xl font-semibold'>{avatar.favorite}</span>
          <Button variant='outline' className='rounded-full p-2'>
            <Plus />
          </Button>
        </div>
        <Button
          size='lg'
          className='self-center rounded-full bg-green-300 text-xl font-bold text-gray-950 hover:bg-green-400'
        >
          強化する
        </Button>
      </div>

      <div>
        <div className='flex h-12 items-center gap-4'>
          <Star className='min-h-8 min-w-8 fill-gray-400 stroke-none' />
          <p>
            次のデコレまであと<span className='text-xl font-bold'>14個</span>
          </p>
        </div>
        <div className='flex h-12 items-center gap-4'>
          <Star className='min-h-8 min-w-8 fill-gray-400 stroke-none' />
          <p>
            好物総取得数:{' '}
            <span className='text-xl font-bold'>
              {avatar.numberOfFavorites}個
            </span>
          </p>
        </div>
        <div className='flex h-12 items-center gap-4'>
          <Star className='min-h-8 min-w-8 fill-gray-400 stroke-none' />
          <p>
            断末魔:
            <span className='text-xl font-bold'>{avatar.message}</span>
          </p>
        </div>
        <div className='flex h-12 items-center gap-4'>
          <Star className='min-h-8 min-w-8 fill-gray-400 stroke-none' />
          <p>
            合計討伐数:{' '}
            <span className='text-xl font-bold'>{avatar.defeats}体</span>
          </p>
        </div>
        <div className='flex h-12 items-center gap-4'>
          <Star className='min-h-8 min-w-8 fill-gray-400 stroke-none' />
          <p>
            出会った日時:{' '}
            <span className='text-xl font-bold'>
              {avatar.firstMet.toLocaleDateString()}
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
