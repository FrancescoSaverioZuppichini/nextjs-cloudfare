import { drizzle } from "drizzle-orm/d1";
import { z } from "zod";
import { authors } from "@/lib/db/schema";

import { getRequestContext } from "@cloudflare/next-on-pages";
import { NextRequest, NextResponse } from "next/server";
import { getPaginatedResponse } from "@/lib/db/utils";

import * as schema from "@/lib/db/schema";
import db from "@/lib/db/db";
import { AuthorsCreateSchema, CursorSchema } from "@/lib/schemas";
import { Author } from "@/lib/crud";
import { InvalidCursor, decodeCursor } from "@/lib/cursor";
export const runtime = "edge";

const pageSize = Number(process.env.PAGE_SIZE) || 8;

export async function GET(req: NextRequest) {
  try {
    const cursor = decodeCursor(req.nextUrl.searchParams.get("cursor"));
    const res = await db.query.authors.findMany({
      where: (authors, { lt }) =>
        cursor ? lt(authors.id, cursor.id) : undefined,
      orderBy: (authors, { desc }) => desc(authors.createdAt),
      limit: pageSize,
    });
    if (!res)
      return NextResponse.json({ message: "Not Found" }, { status: 404 });
    const paginatedResponse = await getPaginatedResponse<Author>(res);
    return NextResponse.json(paginatedResponse);
  } catch (error) {
    if (error instanceof InvalidCursor)
      return NextResponse.json({ message: "Invalid cursor" }, { status: 400 });
    else return NextResponse.json({ message: "Error" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const schema = AuthorsCreateSchema.parse(body);

    const db = drizzle(getRequestContext().env.DB);
    const [newAuthor] = await db.insert(authors).values(schema).returning();
    return new Response(JSON.stringify({ data: newAuthor }), { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }
    console.error(error);
    return new Response(null, { status: 500 });
  }
}
