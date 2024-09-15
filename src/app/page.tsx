'use client';

import { createClient } from '@/utils/supabase/client';

export default function SignIn() {
  const supabase = createClient();

  const signInWithTwitter = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'twitter',
    });
    if (error) {
      console.error('Error signing in with Twitter:', error);
    } else {
      console.log('Signed in with Twitter:', data);
    }
  };

  return (
    <div>
      <button onClick={signInWithTwitter}>Sign in with Twitter</button>
    </div>
  );
}
