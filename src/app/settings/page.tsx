import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export default function Page() {
  return (
    <div className='mx-auto h-full max-w-screen-sm px-4 py-8'>
      <h1 className='border-b-2 pb-4 text-2xl font-bold'>ユーザー設定</h1>
      <div className='flex items-end'>
        <img
          src='/yutotuy.png'
          className='mt-4 h-24 w-24 rounded-full sm:h-40 sm:w-40'
        />
        <div className='ml-4 flex flex-1 flex-col gap-2'>
          <Label htmlFor='userName'>ユーザー名</Label>
          <Input id='userName' />
        </div>
      </div>

      <div className='mt-8 flex gap-4'>
        <Label className='my-auto flex-[calc(1/5)]' htmlFor='favorite'>
          好物
        </Label>
        <Input className='flex-[calc(4/5)]' id='favorite' />
      </div>

      <div className='mt-8 flex justify-end gap-4 max-sm:fixed max-sm:bottom-4 max-sm:left-4 max-sm:right-4 max-sm:flex-col'>
        <Button variant='outline'>保存</Button>
        <Button variant='destructive'>ログアウト</Button>
      </div>
    </div>
  );
}
