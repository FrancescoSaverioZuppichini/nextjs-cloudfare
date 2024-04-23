"use client";
import { useState } from "react";
import { Icons } from "./icons";
import { Button } from "./ui/button";
import { signIn } from "next-auth/react";

export default function UserAuthForm() {
  const [isGitHubLoading, setGitHubLoading] = useState(false);
  return (
    <Button
      variant={"outline"}
      onClick={() => {
        setGitHubLoading(true);
        signIn("github", { redirect: false, callbackUrl: "/dashboard" });
      }}
      isLoading={isGitHubLoading}
    >
      <Icons.GitHub className="mr-2 w-4 h-4" />
      GitHub
    </Button>
  );
}
