import NextAuth from "next-auth";
import { DrizzleAdapter } from "@auth/drizzle-adapter";
import GitHub from "next-auth/providers/github";
import { drizzle } from "drizzle-orm/d1";

// [TODO] @fra ugly!
const db = drizzle(process.env.DB! as unknown as D1Database);
export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: DrizzleAdapter(db),
  providers: [GitHub],
  session: {
    strategy: "jwt",
  },
  callbacks: {
    async signIn({ profile }) {
      // called when user signIn
      return true;
    },
  },
});
