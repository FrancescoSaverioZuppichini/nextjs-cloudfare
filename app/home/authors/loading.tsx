import { DataTableSkeleton } from "@/components/data-table-skeleton";
import { auth } from "@/lib/auth";
import { redirect } from "next/navigation";

export const runtime = "edge";

export default async function Home() {
  const session = await auth();
  if (!session) return redirect("/register");
  if (!session.user) return null;

  return <DataTableSkeleton nColumns={3} nRows={5} />;
}
