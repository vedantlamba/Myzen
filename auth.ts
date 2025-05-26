import NextAuth from "next-auth";
import { PrismaAdapter } from "@auth/prisma-adapter";
import authConfig from "./auth.config";
import { db } from "./lib/db";

export const { auth, handlers, signIn, signOut } = NextAuth({
  ...authConfig,
  callbacks: {
    async signIn({ account }) {
      // For Oauth providers like google and github
      if (account?.provider !== "credentials") {
        return true;
      }
      return true;
    },
    async session({ token, session }) {
      // console.log({ sessionToken: session });
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }
      return session;
    },
    async jwt({ token }) {
      // if (!token.sub) return token;
      // const existingUser = await getUserById(token.sub);

      return token;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
});
