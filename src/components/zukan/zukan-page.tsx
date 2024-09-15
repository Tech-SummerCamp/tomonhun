'use client';

import { Avatar } from '@/lib/shooting/avatar';
import { cn } from '@/lib/utils';
import { ChevronLeft, UserRound } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import { AvatarDetailsView } from './avatar-details-view';

export function ZukanClientPage({ avatars }: { avatars: Avatar[] }) {
  const [selected, setSelected] = useState<Avatar | null>(null);
  const [tagList, setTagList] = useState(false);

  return (
    <div className='lg:grid lg:grid-cols-2 max-lg:relative'>
      <div className='lg:container mx-auto h-screen overflow-y-scroll'>
        <div className='sticky top-0 bg-white'>
          <div className='flex items-stretch justify-center gap-2'>
            <Button
              variant='ghost'
              className='text-lg relative'
              size='lg'
              onClick={() => setTagList(true)}
            >
              タグ
              {tagList && (
                <div className='absolute h-1 bottom-0 left-8 right-8 bg-green-300 rounded-lg' />
              )}
            </Button>
            <Button
              variant='ghost'
              className='text-lg relative'
              size='lg'
              onClick={() => setTagList(false)}
            >
              ともん
              {!tagList && (
                <div className='absolute h-1 bottom-0 left-8 right-8 bg-green-300 rounded-lg' />
              )}
            </Button>
          </div>
        </div>
        <ul className='flex gap-x-4 gap-y-6 flex-wrap justify-center mt-4'>
          {avatars.map((avatar, index) => (
            <li
              key={index}
              className={cn(
                'max-w-32 hover:bg-gray-200 rounded-[12px]',
                avatar === selected ? 'bg-gray-100' : 'bg-transparent',
              )}
              onClick={() => setSelected(avatar)}
            >
              <h2 className='text-center mb-2'>Lv. 1</h2>
              <img src={avatar.imageUrl} alt={avatar.name} />
              <h2 className='text-center bg-gray-200 rounded-full mt-2'>
                {avatar.name}
              </h2>
            </li>
          ))}
        </ul>
      </div>

      <div className='max-h-screen overflow-y-scroll relative max-lg:bg-white max-lg:absolute max-lg:top-0 max-lg:left-0 max-lg:right-0'>
        {selected !== null && (
          <>
            <Button
              onClick={() => setSelected(null)}
              variant='outline'
              className='rounded-full p-2 absolute top-2 left-2'
            >
              <ChevronLeft />
            </Button>
            <Button
              onClick={() => setSelected(null)}
              variant='outline'
              className='rounded-full p-2 absolute top-2 right-2'
            >
              <UserRound />
            </Button>
            <AvatarDetailsView avatar={selected} />
          </>
        )}
        {selected === null && (
          <div className='max-lg:hidden h-full flex justify-center items-center'>
            <p className='text-xl font-bold'>選択されてないよ</p>
          </div>
        )}
      </div>
    </div>
  );
}
