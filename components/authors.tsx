"use client";

import { authors } from "@/lib/db/schema";
import { APIReponse } from "@/types";
import { useQuery } from "@tanstack/react-query";

async function getAuthors(): Promise<
  APIReponse<Array<typeof authors.$inferSelect>>
> {
  const res = await fetch("/api/authors");
  return res.json();
}

export default function Authors() {
  const { data, isLoading } = useQuery({
    queryKey: ["authors"],
    queryFn: getAuthors,
  });

  console.log(data);

  return (
    <div className="grid gap-2">
      {isLoading && <p>Loading</p>}
      <ul>
        {data &&
          data.data.map((el) => (
            <li key={el.id}>
              <p>{el.name || "unknown"}</p>
            </li>
          ))}
      </ul>
    </div>
  );
}
