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
      <div className='w-screen h-svh bg-[#6C95C6]'>
        <div className='flex flex-col h-full'>
          {/* self-screenのキャラクター表示のレスポンシブ版 */}
          <div className='flex-1 h-[20%] flex justify-center'>
            <div className='flex flex-col items-center max-w-md'>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                style={{ viewTransitionName: 'avatarImage', contain: 'paint' }}
                src={avatar.imageUrl}
                alt={avatar.name}
                className='h-full aspect-auto z-10'
              />
              <div className='blur-sm -translate-y-1/2 w-full'>
                {/* height: 256*0.3 */}
                <div
                  className='bg-white rounded-full aspect-square w-full scale-y-[30%]'
                  style={{
                    viewTransitionName: 'avatarShadow',
                    contain: 'paint',
                  }}
                />
              </div>
            </div>
          </div>

          {/* 白い部分の分下にずらす */}
          <div className='flex-1 pt-[calc(16rem*0.3*0.5)] flex justify-center'>
            <div className='max-w-md w-full py-8 flex flex-col gap-2 items-center'>
              <p className='font-bold text-3xl text-white'>{avatar.name}</p>
              <div className='border-b-white pb-2 px-4 border-b-[1px] text-center text-xl md:text-2xl'>
                体重1kg 身長1m
              </div>
              <div className='border-b-white pb-2 px-4 border-b-[1px] text-center text-xl md:text-2xl'>
                好物: {avatar.favote}
              </div>
              <div className='border-b-white pb-2 px-4 border-b-[1px] text-center text-xl md:text-2xl'>
                これまでに討伐した 名前 の数 N 体
              </div>
            </div>
          </div>
          <div className='flex-2 flex justify-center'>
            <div className='bg-slate-200 rounded-3xl ml-4 mr-4 max-w-md w-full p-8 mb-8 flex flex-col items-stretch gap-2'>
              <p className='text-center text-bold text-2xl'>
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
              <p className='text-end -mb-4'>あと{remain}人捕獲できます</p>
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
