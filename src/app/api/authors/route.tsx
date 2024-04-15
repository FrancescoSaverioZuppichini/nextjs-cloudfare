import { drizzle } from "drizzle-orm/d1";
import { z } from "zod";
import { authors } from "@/lib/db/schema";

import { getRequestContext } from "@cloudflare/next-on-pages";

export const runtime = "edge";

export async function GET(req: Request) {
  const db = drizzle(getRequestContext().env.DB);
  const res = await db.select().from(authors).all();
  return new Response(
    JSON.stringify({
      data: res,
    })
  );
}

const AuthorsCreateSchema = z.object({
  name: z.string().min(1),
});

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
    return new Response(null, { status: 500 });
  }
}
