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
  secret: process.env.NEXTAUTH_SECRET,
  events: {
    async signIn(message) { 
      console.log('signin', message)
     },
    async signOut(message) { 
      console.log('signout', message)
     },
    async createUser(message) { /* user created */ },
    async updateUser(message) { /* user updated - e.g. their email was verified */ },
    async linkAccount(message) { /* account (e.g. Twitter) linked to a user */ },
    async session(message) { /* session is active */ },
  },
  pages: {
    signOut: '/'
  }
});
