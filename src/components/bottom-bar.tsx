import { Inbox, UserRound } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

export function BottomBar() {
  return (
    <>
      <div className='sm:hidden fixed bottom-0 w-full px-4 pb-2 border-t flex gap-4 items-center'>
        <Button variant='ghost' className='flex-1 py-8' asChild>
          <Link href='/zukan'>
            <Inbox className='w-8 h-8' />
          </Link>
        </Button>

        <Button
          asChild
          variant='ghost'
          className='flex-1 aspect-square h-fit p-8 text-4xl font-black rounded-full -mt-24 bg-green-300 hover:bg-green-400'
        >
          <Link href='/shooting'>討伐</Link>
        </Button>

        <Button variant='ghost' className='flex-1 py-8'>
          <UserRound className='w-8 h-8' />
        </Button>
      </div>
    </>
  );
}
