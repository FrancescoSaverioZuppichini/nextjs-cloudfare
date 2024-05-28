"use client";

import { authors } from "@/lib/db/schema";
import { APIResources, APIResourcesRequest } from "@/types";
import {
  keepPreviousData,
  useInfiniteQuery,
  useQuery,
} from "@tanstack/react-query";
import { DataTable } from "./data-table";
import { columns } from "@/app/api/authors/columns";
import { Author, getAuthors } from "@/lib/crud";
import React from "react";

interface AuthorsProps {
  initialData?: APIResources<Author>;
}

export default function Authors({ initialData }: AuthorsProps) {
  const { data, isLoading, fetchNextPage, hasNextPage } = useInfiniteQuery<
    APIResources<Author>
  >({
    queryKey: ["authors"],
    queryFn: async ({ pageParam }) =>
      await getAuthors(pageParam as APIResourcesRequest),
    initialPageParam: { cursor: "" },
    getNextPageParam: (lastPage, pages) => ({
      cursor: lastPage.meta.pagination.nextCursor,
    }),
    placeholderData: keepPreviousData,
  });

  console.log(hasNextPage);
  const flatData = React.useMemo(
    () => data?.pages?.flatMap((page) => page.data) ?? [],
    [data]
  );

  return (
    <div className="grid gap-2">
      {isLoading && <p>Loading</p>}
      <button onClick={() => fetchNextPage()}>next</button>
      {data && <DataTable columns={columns} data={flatData} />}
    </div>
  );
}
