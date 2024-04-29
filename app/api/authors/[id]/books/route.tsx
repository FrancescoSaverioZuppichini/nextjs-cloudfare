import { drizzle } from "drizzle-orm/d1";
import { z } from "zod";
import * as schema from "@/lib/db/schema";
import { authors, books } from "@/lib/db/schema";

import { getRequestContext } from "@cloudflare/next-on-pages";
import { getPaginatedResponse } from "@/lib/db/utils";
import { NextRequest } from "next/server";

export const runtime = "edge";

export async function GET(
  req: NextRequest,
  context: { params: { id: string } }
) {
  const authorId = context.params.id;
  const cursor = Number(req.nextUrl.searchParams.get("cursor")) || 0;
  const pageSize = 2;

  const db = drizzle(getRequestContext().env.DB, { schema });

  const res = await db.query.books.findMany({
    where: (books, { eq, gt }) =>
      eq(books.authorId, Number(authorId)) && gt(books.id, cursor),
    orderBy: (books, { asc }) => asc(books.createdAt),
    limit: pageSize,
  });

  if (!res)
    return new Response(JSON.stringify({ message: "Not Found" }), {
      status: 404,
    });
  const Books = books.$inferSelect;
  const paginatedResponse = await getPaginatedResponse<typeof Books>(
    db,
    res,
    books,
    cursor,
    pageSize,
    req
  );
  return new Response(JSON.stringify(paginatedResponse));
}
