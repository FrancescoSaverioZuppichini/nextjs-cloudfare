import { users } from "@/lib/db/schema";
import { UsersUpdateSchema } from "@/lib/schemas";
import { getCurrentUser } from "@/lib/session";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { eq } from "drizzle-orm";
import { drizzle } from "drizzle-orm/d1";
import { z } from "zod";

export const runtime = "edge";

export async function PATCH(req: Request) {
  try {
    const user = await getCurrentUser();
    if (!user) return new Response(null, { status: 403 });
    const body = await req.json();
    const schema = UsersUpdateSchema.parse(body);
    const db = drizzle(getRequestContext().env.DB);
    await db.update(users).set(schema).where(eq(users.id, user.id!));
    return new Response(null, { status: 200 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }
    console.error(error);
    return new Response(null, { status: 500 });
  }
}
