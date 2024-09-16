import { Inbox, UserRound } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

export function BottomBar() {
  return (
    <>
      <div className='fixed bottom-0 flex w-full items-center gap-4 border-t px-4 pb-2 sm:hidden'>
        <Button variant='ghost' className='flex-1 py-8' asChild>
          <Link href='/zukan'>
            <Inbox className='h-8 w-8' />
          </Link>
        </Button>

        <Button
          asChild
          variant='ghost'
          className='-mt-24 aspect-square h-fit flex-1 rounded-full bg-green-300 p-8 text-4xl font-black hover:bg-green-400'
        >
          <Link href='/shooting'>討伐</Link>
        </Button>

        <Button variant='ghost' className='flex-1 py-8' asChild>
          <Link href='/settings'>
            <UserRound className='h-8 w-8' />
          </Link>
        </Button>
      </div>
    </>
  );
}
