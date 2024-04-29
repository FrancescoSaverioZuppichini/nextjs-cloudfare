import { drizzle } from "drizzle-orm/d1";
import { z } from "zod";
import { authors } from "@/lib/db/schema";

import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextRequest, NextResponse } from "next/server";
import { getPaginatedResponse } from "@/lib/db/utils";

import * as schema from "@/lib/db/schema";
import db from "@/lib/db/db";
import { AuthorsCreateSchema } from "@/lib/schema";
export const runtime = "edge";

export async function GET(req: NextRequest) {
  const cursor = Number(req.nextUrl.searchParams.get("cursor")) || 0;
  const pageSize = 8;
  // const db = drizzle(getRequestContext().env.DB, { schema });
  const res = await db.query.authors.findMany({
    where: (authors, { gt }) => gt(authors.id, cursor),
    orderBy: (authors, { desc }) => desc(authors.createdAt),
    limit: pageSize,
  });
  if (!res)
    return new Response(JSON.stringify({ message: "Not Found" }), {
      status: 404,
    });
  const Authors = authors.$inferSelect;
  const paginatedResponse = await getPaginatedResponse<typeof Authors>(
    db,
    res,
    authors,
    cursor,
    pageSize,
    req,
  );
  return NextResponse.json(paginatedResponse);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const schema = AuthorsCreateSchema.parse(body);

    const db = drizzle(getRequestContext().env.DB);
    const [newAuthor] = await db.insert(authors).values(schema).returning();
    return new Response(JSON.stringify(newAuthor), { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }
    console.error(error);
    return new Response(null, { status: 500 });
  }
}
