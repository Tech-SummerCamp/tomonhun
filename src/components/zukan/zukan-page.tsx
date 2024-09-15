'use client';

import { Avatar } from '@/lib/shooting/avatar';
import { cn } from '@/lib/utils';
import { ChevronLeft, Home, UserRound } from 'lucide-react';
import Link from 'next/link';
import { useState } from 'react';
import { Button } from '../ui/button';
import { AvatarDetailsView } from './avatar-details-view';

export function ZukanClientPage({ avatars }: { avatars: Avatar[] }) {
  const [selected, setSelected] = useState<Avatar | null>(null);
  const [tagList, setTagList] = useState(false);

  return (
    <div className='max-lg:relative lg:grid lg:grid-cols-2'>
      <div className='mx-auto h-screen overflow-y-scroll lg:container'>
        <div className='sticky top-0 bg-white'>
          <Button
            asChild
            variant='ghost'
            className='rounded-full p-2 absolute left-2 top-2'
          >
            <Link href='/home'>
              <Home />
            </Link>
          </Button>
          <div className='flex items-stretch justify-center gap-2'>
            <Button
              variant='ghost'
              className='text-lg relative bg-transparent h-14'
              size='lg'
              onClick={() => setTagList(true)}
            >
              タグ
              {tagList && (
                <div className='absolute bottom-0 left-8 right-8 h-1 rounded-lg bg-green-300' />
              )}
            </Button>
            <Button
              variant='ghost'
              className='text-lg relative bg-transparent h-14'
              size='lg'
              onClick={() => setTagList(false)}
            >
              ともん
              {!tagList && (
                <div className='absolute bottom-0 left-8 right-8 h-1 rounded-lg bg-green-300' />
              )}
            </Button>
          </div>
        </div>
        <ul className='mt-4 flex flex-wrap justify-center gap-x-4 gap-y-6'>
          {avatars.map((avatar, index) => (
            <li
              key={index}
              className={cn(
                'max-w-32 rounded-[12px] hover:bg-gray-200',
                avatar === selected ? 'bg-gray-100' : 'bg-transparent',
              )}
              onClick={() => setSelected(avatar)}
            >
              <h2 className='mb-2 text-center'>Lv. 1</h2>
              <img
                src={avatar.imageUrl}
                alt={avatar.name}
                className='pointer-events-none select-none'
              />
              <h2 className='mt-2 rounded-full bg-gray-200 text-center'>
                {avatar.name}
              </h2>
            </li>
          ))}
        </ul>
      </div>

      <div className='relative max-h-screen overflow-y-scroll max-lg:absolute max-lg:left-0 max-lg:right-0 max-lg:top-0 max-lg:bg-white'>
        {selected !== null && (
          <>
            <Button
              onClick={() => setSelected(null)}
              variant='outline'
              className='absolute left-2 top-2 z-10 rounded-full p-2'
            >
              <ChevronLeft />
            </Button>
            <Button
              onClick={() => setSelected(null)}
              variant='outline'
              className='absolute right-2 top-2 z-10 rounded-full p-2'
            >
              <UserRound />
            </Button>
            <AvatarDetailsView avatar={selected} />
          </>
        )}
        {selected === null && (
          <div className='flex h-full items-center justify-center max-lg:hidden'>
            <p className='text-xl font-bold'>選択されてないよ</p>
          </div>
        )}
      </div>
    </div>
  );
}
