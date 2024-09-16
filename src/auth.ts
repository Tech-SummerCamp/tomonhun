import NextAuth from 'next-auth';
import Twitter from 'next-auth/providers/twitter';

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Twitter],
});
