'use client';

import { Avatar } from '@/lib/shooting/avatar';
import { useState } from 'react';
import { Button } from '../ui/button';
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '../ui/dialog';
import { Input } from '../ui/input';
import { Label } from '../ui/label';

export function SortingScreen({
  avatar,
  remain,
  onReleaseClick,
  onAddClick,
}: {
  avatar: Avatar;
  remain: number;
  onReleaseClick: (avatar: Avatar) => void;
  onAddClick: (avatar: Avatar, tag?: string) => void;
}) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [tag, setTag] = useState('');

  const handleAddWithTagClick = () => {
    setDialogOpen(true);
  };

  return (
    <>
      <div className='h-svh w-screen bg-[#6C95C6]'>
        <div className='flex h-full flex-col'>
          {/* self-screenのキャラクター表示のレスポンシブ版 */}
          <div className='flex h-[20%] flex-1 justify-center'>
            <div className='flex max-w-md flex-col items-center'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                style={{ viewTransitionName: 'avatarImage', contain: 'paint' }}
                src={avatar.imageUrl}
                alt={avatar.name}
                className='z-10 aspect-auto h-full'
              />
              <div className='w-full -translate-y-1/2 blur-sm'>
                {/* height: 256*0.3 */}
                <div
                  className='aspect-square w-full scale-y-[30%] rounded-full bg-white'
                  style={{
                    viewTransitionName: 'avatarShadow',
                    contain: 'paint',
                  }}
                />
              </div>
            </div>
          </div>

          {/* 白い部分の分下にずらす */}
          <div className='flex flex-1 justify-center pt-[calc(16rem*0.3*0.5)]'>
            <div className='flex w-full max-w-md flex-col items-center gap-2 py-8'>
              <p className='text-3xl font-bold text-white'>{avatar.name}</p>
              <div className='border-b-[1px] border-b-white px-4 pb-2 text-center text-xl md:text-2xl'>
                体重{avatar.weight}kg 身長{avatar.height}m
              </div>
              <div className='border-b-[1px] border-b-white px-4 pb-2 text-center text-xl md:text-2xl'>
                好物: {avatar.favorite}
              </div>
              <div className='border-b-[1px] border-b-white px-4 pb-2 text-center text-xl md:text-2xl'>
                これまでに討伐した {avatar.name} の数 {avatar.defeats} 体
              </div>
            </div>
          </div>
          <div className='flex-2 flex justify-center'>
            <div className='mb-8 ml-4 mr-4 flex w-full max-w-md flex-col items-stretch gap-2 rounded-3xl bg-slate-200 p-8'>
              <p className='text-bold text-center text-2xl'>
                {avatar.name}を仲間に加えますか？
              </p>
              <Button
                variant='ghost'
                className='text-xl'
                onClick={() => onAddClick(avatar)}
              >
                加える
              </Button>
              <Button
                variant='ghost'
                className='text-xl'
                onClick={handleAddWithTagClick}
              >
                タグをつけて加える
              </Button>
              <Button
                variant='ghost'
                className='text-xl'
                onClick={() => onReleaseClick(avatar)}
              >
                野に返す
              </Button>
              <p className='-mb-4 text-end'>あと{remain}人捕獲できます</p>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={dialogOpen} onOpenChange={() => setDialogOpen(false)}>
        <DialogContent className='bg-white'>
          <DialogHeader>
            <DialogTitle>タグをつけてください</DialogTitle>
          </DialogHeader>
          <Label htmlFor='tagInput'>タグ</Label>
          <Input
            id='tagInput'
            value={tag}
            onChange={(e) => setTag(e.target.value)}
          />
          <DialogFooter>
            <DialogClose asChild>
              <Button
                type='button'
                variant='secondary'
                onClick={() => onAddClick(avatar, tag)}
              >
                完了
              </Button>
            </DialogClose>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
