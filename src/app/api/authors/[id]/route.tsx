import { drizzle } from "drizzle-orm/d1";
import * as schema from "@/lib/db/schema";
import { authors } from "@/lib/db/schema";

import { getRequestContext } from "@cloudflare/next-on-pages";
import { eq } from "drizzle-orm";

export const runtime = "edge";

export async function GET(req: Request, context: { params: { id: string } }) {
  const authorId = context.params.id;

  const db = drizzle(getRequestContext().env.DB, { schema });
  const res = await db.query.authors.findFirst({
    where: eq(authors.id, Number(authorId)),
  });
  if (!res)
    return new Response(JSON.stringify({ message: "Not Found" }), {
      status: 404,
    });
  return new Response(JSON.stringify(res));
}
