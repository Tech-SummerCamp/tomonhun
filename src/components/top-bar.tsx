import { Inbox, UserRound } from 'lucide-react';
import { Button } from './ui/button';

export function TopBar() {
  return (
    <div className='max-sm:hidden fixed top-0 flex items-start'>
      <Button
        variant='ghost'
        className='flex-1 aspect-square h-fit p-8 text-4xl font-black rounded-full m-4 bg-green-300 hover:bg-green-400'
      >
        討伐
      </Button>

      <Button variant='ghost' className='flex-1 py-8 mt-8'>
        <Inbox className='w-8 h-8' />
      </Button>
      <Button variant='ghost' className='flex-1 py-8 mt-8'>
        <UserRound className='w-8 h-8' />
      </Button>
    </div>
  );
}
