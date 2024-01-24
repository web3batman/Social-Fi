import NextAuth, { NextAuthOptions } from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import api from '../../../constants/auth';

export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    TwitterProvider({
      clientId: process.env.NEXT_PUBLIC_TWITTER_CONSUMER_KEY,
      clientSecret: process.env.NEXT_PUBLIC_TWITTER_CONSUMER_SECRET,
    })
    // ...add more providers here
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      const response = api.post('/users', { profile: profile });
      const { token } = response;
      return true;
    },
    async session(session, user) {
      session.user = user
      return session
    }
  },
  secret: process.env.NEXTAUTH_SECRET
});
