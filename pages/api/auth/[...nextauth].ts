import NextAuth, { AuthOptions, Profile } from 'next-auth';
import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { prisma } from '@/config/prisma';

interface GitHubProfile extends Profile {
  login: string;
  id: string;
  avatar_url: string;
  url: string;
  followers: number;
  following: number;
}

export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ profile }) {
      const p = profile as GitHubProfile;

      if (Number(p?.id) !== Number(process.env.ALLOWED_GITHUB_PROFILE_ID)) {
        return false;
      }

      return true;
    },
    async jwt({ token }) {
      return token;
    },
    async session({ session }) {
      console.log('asking for ession: ', session);
      return session;
    },
  },
};

export default NextAuth(authOptions);
