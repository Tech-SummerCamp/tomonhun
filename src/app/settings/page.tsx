import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Page() {
  return (
    <div className='max-w-screen-sm mx-auto py-8 px-4 h-full'>
      <h1 className='text-2xl font-bold pb-4 border-b-2'>ユーザー設定</h1>
      <div className='flex items-end'>
        <img
          src='/yutotuy.png'
          className='rounded-full w-24 h-24 sm:w-40 sm:h-40 mt-4'
        />
        <div className='flex-1 flex flex-col gap-2 ml-4'>
          <Label htmlFor='userName'>ユーザー名</Label>
          <Input id='userName' />
        </div>
      </div>

      <div className='flex gap-4 mt-8'>
        <Label className='flex-[calc(1/5)] my-auto' htmlFor='favorite'>
          好物
        </Label>
        <Input className='flex-[calc(4/5)]' id='favorite' />
      </div>

      <div className='flex gap-4 mt-8 justify-end max-sm:flex-col max-sm:fixed max-sm:left-4 max-sm:right-4 max-sm:bottom-4'>
        <Button variant='outline'>保存</Button>
        <Button variant='destructive'>ログアウト</Button>
      </div>
    </div>
  );
}
