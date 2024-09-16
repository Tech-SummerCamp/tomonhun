'use client';

import { Avatar } from '@/lib/shooting/avatar';
import { ChevronDown } from 'lucide-react';
import { Button } from '../ui/button';

export function SerifScreen({
  avatar,
  onClick,
}: {
  avatar: Avatar;
  onClick: (avatar: Avatar) => void;
}) {
  if (!avatar) return <></>;

  return (
    <div className='relative h-svh w-screen bg-[#6C95C6]'>
      <div className='absolute left-1/2 top-[calc(10rem+33.33%)] -translate-x-1/2 -translate-y-1/2 blur-sm'>
        <div
          className='h-64 w-64 scale-y-[30%] rounded-full bg-white'
          style={{ viewTransitionName: 'avatarShadow', contain: 'paint' }}
        />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={avatar.imageUrl}
        alt={avatar.name}
        style={{ viewTransitionName: 'avatarImage', contain: 'paint' }}
        className='absolute left-1/2 top-40 aspect-auto h-1/3 -translate-x-1/2'
      />
      <div className='absolute bottom-8 left-4 right-4 flex flex-col rounded-3xl bg-slate-200 p-8 md:left-1/2 md:w-full md:max-w-md md:-translate-x-1/2'>
        <p>{avatar.message}</p>
        <Button
          onClick={() => onClick(avatar)}
          variant='ghost'
          className='-mb-4 -mr-4 self-end'
        >
          <ChevronDown />
        </Button>
      </div>
    </div>
  );
}
