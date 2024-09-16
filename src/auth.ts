import PostgresAdapter from '@auth/pg-adapter';
import { createPool } from '@vercel/postgres';
import NextAuth from 'next-auth';
import Twitter from 'next-auth/providers/twitter';

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PostgresAdapter(createPool()),
  providers: [Twitter],
});
