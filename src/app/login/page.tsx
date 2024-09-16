import { auth, signIn } from '@/auth';

async function signInWithTwitter() {
  'use server';
  await signIn('twitter');
}

export default async function Login() {
  const session = await auth();

  return (
    <div className='flex min-h-screen items-center justify-center bg-gray-100'>
      <div className='w-96 rounded-lg bg-white p-8 shadow-md'>
        <h1 className='mb-6 text-center text-3xl font-bold text-gray-800'>
          ログイン
        </h1>
        {session ? (
          <div className='text-center'>
            <p className='text-lg text-gray-600'>
              ログイン中:{' '}
              <span className='font-semibold'>{session.user?.name}</span>
            </p>
          </div>
        ) : (
          <form action={signInWithTwitter} className='mt-4'>
            <button
              type='submit'
              className='w-full rounded bg-blue-500 px-4 py-2 font-bold text-white transition duration-300 hover:bg-blue-600'
            >
              Twitterでログイン
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
