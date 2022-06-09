import NextAuth from 'next-auth'
import GithubProvider from 'next-auth/providers/github'
import { PrismaAdapter } from '@next-auth/prisma-adapter'
import { prisma } from '@/app/prisma'

export default NextAuth({
  adapter: PrismaAdapter(prisma),
  // Configure one or more authentication providers
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ profile }) {
      if (profile.id !== Number(process.env.ALLOWED_GITHUB_PROFILE_ID)) {

        return false;
      }

      return true
    },
    async jwt({ token }) {
      return token
    },
    //@ts-ignore
    async session({ session, user, token }) {
      return session
    },
  },
})
