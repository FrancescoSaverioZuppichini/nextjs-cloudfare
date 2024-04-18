import { SignOut } from "@/components/signout-button";
import { auth } from "@/lib/auth";

export const runtime = "edge";

export default async function Home() {
  const session = await auth();
  if (!session) return null;
  if (!session.user) return null;

  return (
    <h1>
      Welcome {session.user.name} <SignOut />
    </h1>
  );
}
