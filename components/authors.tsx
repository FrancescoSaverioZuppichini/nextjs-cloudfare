"use client";

import { authors } from "@/lib/db/schema";
import { APIResponse } from "@/types";
import { useQuery } from "@tanstack/react-query";
import { DataTable } from "./data-table";
import { columns } from "@/app/api/authors/columns";

async function getAuthors(): Promise<
  APIResponse<Array<typeof authors.$inferSelect>>
> {
  const res = await fetch("/api/authors");
  return res.json();
}

export default function Authors() {
  const { data, isLoading } = useQuery({
    queryKey: ["authors"],
    queryFn: getAuthors,
  });

  return (
    <div className="grid gap-2">
      {isLoading && <p>Loading</p>}
      {data && <DataTable columns={columns} data={data.data} />}
    </div>
  );
}
