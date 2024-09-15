'use client';

import { supabase } from '@/utils/supabase/client';

export default function SignIn() {
  const signInWithTwitter = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: 'twitter',
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
      },
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
