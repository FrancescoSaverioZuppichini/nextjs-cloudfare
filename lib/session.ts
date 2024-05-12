import { User } from "next-auth";
import { auth } from "./auth";

export async function getCurrentUser(): Promise<User | null> {
  const session = await auth();
  if (!session) return null;
  if (!session.user) return null;
  console.log("getCurrentUser", session.user);
  return session.user;
}
