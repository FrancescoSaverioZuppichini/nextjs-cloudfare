"use client";
import { signIn } from "next-auth/react";
// https://authjs.dev/guides/pages/signin
export function SignIn() {
  return (
    <button
      onClick={() =>
        signIn("github", { redirect: false, callbackUrl: "/home" })
      }
    >
      Sign In
    </button>
  );
}
