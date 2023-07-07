import { prisma } from '@/config/prisma';
import GithubProvider from 'next-auth/providers/github';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import NextAuth, { AuthOptions, Profile } from 'next-auth';

interface GitHubProfile extends Profile {
  login: string;
  id: string;
  avatar_url: string;
  url: string;
  followers: number;
  following: number;
}

export const authOptions: AuthOptions = {
  // secret: process.env.NEXTAUTH_SECRET as string,
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID as string,
      clientSecret: process.env.GITHUB_SECRET as string,
    }),
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
      return session;
    },
  },
};

export default NextAuth(authOptions);
