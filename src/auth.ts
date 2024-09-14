import NextAuth from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [
    TwitterProvider({
      clientId: process.env.TWITTER_CLIENT_ID!,
      clientSecret: process.env.TWITTER_CLIENT_SECRET!,
      // version: "2.0",
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SECRET,
  session: {
    strategy: "jwt",
  },
  debug: true,
  // callbacks: {
  //   async session({ session, token, user }) {
  //     if (session.user) {
  //       session.user.id = user.id;
  //       session.user.twitterId = user.twitterId;
  //     }
  //     return session;
  //   },
  //   async jwt({ token, user, account, profile, isNewUser }) {
  //     if (account?.providerAccountId) {
  //       token.twitterId = account.providerAccountId;
  //     }
  //     return token;
  //   },
  // },
});
