import NextAuth, { User } from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import GitHub from "next-auth/providers/github";
import db from "./db/db";
import { eq } from "drizzle-orm";
import { users } from "./db/schema";

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [GitHub],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    //   jwt({ token, user }) {
    //     if (user) {
    //       // User is available during sign-in
    //       token.id = user.id!;
    //     }
    //     return token;
    //   },
    //   session({ session, token }) {
    //     session.user.id = token.id;
    //     return session;
    //   },
    // },
    async jwt({ token, user }) {
      const dbUser = await db.query.users.findFirst({
        where: eq(users.email, token.email!),
      });
      console.log(dbUser);

      if (!dbUser) {
        if (user) {
          // User is available during sign-in
          token.id = user.id!;
        }
        return token;
      }
      return {
        id: dbUser.id,
        name: dbUser.name,
        email: dbUser.email,
        picture: dbUser.image,
      };
    },
    session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email!;
        session.user.image = token.picture;
      }

      return session;
    },
  },
});
