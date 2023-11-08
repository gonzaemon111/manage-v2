import { PrismaAdapter } from '@auth/prisma-adapter';
import GitHubProvider from 'next-auth/providers/github';
import { prisma } from '@/server/infrastructure/lib/PrismaClient';
import { serverEnvironment } from '@/shared/ServerEnvironment';
import type { NextAuthOptions } from 'next-auth';

const { NODE_ENV, NEXTAUTH_SECRET, NEXTAUTH_GITHUB_CLIENT_ID, NEXTAUTH_GITHUB_CLIENT_SECRET } = serverEnvironment.get();

export const authOptions: NextAuthOptions = {
  // debug: process.env.NODE_ENV !== 'production',
  adapter: PrismaAdapter(prisma),
  secret: NEXTAUTH_SECRET,
  session: {
    // Choose how you want to save the user session.
    // The default is `"jwt"`, an encrypted JWT (JWE) stored in the session cookie.
    // If you use an `adapter` however, we default it to `"database"` instead.
    // You can still force a JWT session by explicitly defining `"jwt"`.
    // When using `"database"`, the session cookie will only contain a `sessionToken` value,
    // which is used to look up the session in the database.
    // データベースにはTokenを保存せず、セッションcookieから生成
    strategy: 'jwt'
  },
  providers: [
    GitHubProvider({
      clientId: NEXTAUTH_GITHUB_CLIENT_ID,
      clientSecret: NEXTAUTH_GITHUB_CLIENT_SECRET
    })
  ],
  logger: {},
  callbacks: {
    async jwt({ token, user, account }) {
      // strategyがjwtの場合
      if (user?.name) {
        token.name = user.name;
        token.id = user.id;
      }
      if (account?.access_token) {
        token.accessToken = account.access_token;
      }
      return token;
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          accessToken: token.accessToken
        }
      };
    }
  },
  theme: {
    colorScheme: 'auto',
    logo: NODE_ENV === 'development' ? 'http://localhost:3000/icon.png' : '/icon.png',
    brandColor: '#5eead4'
  }
};
