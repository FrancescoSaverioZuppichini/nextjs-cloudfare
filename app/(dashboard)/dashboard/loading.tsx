import { DataTableSkeleton } from "@/components/data-table-skeleton";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const runtime = "edge";

export default async function Home() {
  const session = await auth();
  if (!session) return redirect("/register");
  if (!session.user) return null;

  return (
    <div className="container h-full flex flex-col gap-4">
      <h1>Welcome {session.user.name}</h1>
      <DataTableSkeleton nColumns={3} nRows={5} />
    </div>
  );
}
