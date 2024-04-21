import { SignOut } from "@/components/signout-button";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const runtime = "edge";

export default async function Home() {
  const session = await auth();
  if (!session) return redirect("/register");
  if (!session.user) return null;

  return (
    <h1>
      Welcome {session.user.name} <SignOut />
    </h1>
  );
}
