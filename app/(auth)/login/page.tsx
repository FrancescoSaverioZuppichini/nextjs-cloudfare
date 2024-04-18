import { SignIn } from "@/components/signin-button";
import Image from "next/image";

export default function LogIn() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <SignIn />
    </main>
  );
}
