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
  return (
    <div className='w-screen h-svh bg-[#6C95C6] relative'>
      <div className='blur-sm absolute left-1/2 -translate-x-1/2 top-[calc(10rem+33.33%)] -translate-y-1/2'>
        <div
          className='bg-white rounded-full h-64 w-64 scale-y-[30%]'
          style={{ viewTransitionName: 'avatarShadow', contain: 'paint' }}
        />
      </div>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={avatar.imageUrl}
        alt={avatar.name}
        style={{ viewTransitionName: 'avatarImage', contain: 'paint' }}
        className='h-1/3 aspect-auto absolute top-40 left-1/2 -translate-x-1/2'
      />
      <div className='bg-slate-200 rounded-3xl left-4 right-4 md:max-w-md md:w-full p-8 absolute bottom-8 md:left-1/2 md:-translate-x-1/2 flex flex-col'>
        <p>{avatar.message}</p>
        <Button
          onClick={() => onClick(avatar)}
          variant='ghost'
          className='self-end -mr-4 -mb-4'
        >
          <ChevronDown />
        </Button>
      </div>
    </div>
  );
}
