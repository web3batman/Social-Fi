import NextAuth, { NextAuthOptions } from "next-auth";
import TwitterProvider from "next-auth/providers/twitter";
import Router from "next/navigation";

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
    async signIn(user, account, profile) {
      return true
    },
    async session(session, user) {
      if (!session.user) return session;
      session.user = user
      return session
    },
    async jwt(token, user, account, profile, isNewUser) { 
      if (user) {
        token.id = user.id   
      }
      return token
    }
  },
  secret: process.env.NEXTAUTH_SECRET
});
