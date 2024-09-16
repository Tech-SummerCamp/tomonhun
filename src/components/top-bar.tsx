import { Inbox, UserRound } from 'lucide-react';
import Link from 'next/link';
import { Button } from './ui/button';

export function TopBar() {
  return (
    <div className='fixed top-0 flex items-start max-sm:hidden'>
      <Button
        asChild
        variant='ghost'
        className='m-4 aspect-square h-fit flex-1 rounded-full bg-green-300 p-8 text-4xl font-black hover:bg-green-400'
      >
        <Link href='/shooting'>討伐</Link>
      </Button>

      <Button variant='ghost' className='mt-8 flex-1 py-8' asChild>
        <Link href='/zukan'>
          <Inbox className='h-8 w-8' />
        </Link>
      </Button>
      <Button variant='ghost' className='mt-8 flex-1 py-8' asChild>
        <Link href='/settings'>
          <UserRound className='h-8 w-8' />
        </Link>
      </Button>
    </div>
  );
}
