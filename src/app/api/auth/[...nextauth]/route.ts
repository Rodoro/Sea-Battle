import NextAuth from "next-auth"
import { Account, User as AuthUser, Session } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import User from "@/models/User";
import connect from "@/utils/db";

export const authOptions:any = {
  providers: [
    CredentialsProvider({
        id: "credentials",
        name: "Credentials",
        credentials: {
          name: { label: "Name", type: "text" },
          password: { label: "Password", type: "password" },
        },
        
        async authorize(credentials: any) {
          await connect();
          try {
            const user = await User.findOne({ name: credentials.name });
            if (user) {
              const isPasswordCorrect = await bcrypt.compare(
                credentials.password,
                user.password
              );
              if (isPasswordCorrect) {
                return user;
              }
            }
          } catch (err: any) {
            throw new Error(err);
          }
        },
      }),
  ],
  callbacks: {
    async signIn({ user, account }: { user: AuthUser; account: Account }) {
      if (account?.provider == "credentials") {
        return true;
      }
    },
    async jwt({token, user, account, profile, isNewUser}: any) {
      if (user && user.role) {
        token.role = user.role;
      }
      return token;
    },
    async session({session, token}: any) {
      if (token && token.role) {
        session.user.role = token.role;
      }
      return session;
    },
  },
}
export const handler = NextAuth(authOptions);
export {handler as GET, handler as POST}