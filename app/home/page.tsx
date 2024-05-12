import Authors from "@/components/authors";
import CreateAuthorButton from "@/components/create-author-button";
import { getCurrentUser } from "@/lib/session";
import { redirect } from "next/navigation";

export const runtime = "edge";

export default async function Home() {
  const user = await getCurrentUser();
  if (!user) return redirect("/login");

  return (
    <div className="container h-full flex flex-col gap-4">
      <h1>Welcome {user.name}</h1>
      <Authors />
      <div className="flex sm:justify-end">
        <div>
          <CreateAuthorButton />
        </div>
      </div>
    </div>
  );
}
