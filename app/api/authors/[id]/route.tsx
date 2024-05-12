import { drizzle } from "drizzle-orm/d1";
import * as schema from "@/lib/db/schema";
import { authors } from "@/lib/db/schema";
import { z } from "zod";
import { getRequestContext } from "@cloudflare/next-on-pages";
import { eq } from "drizzle-orm";

export const runtime = "edge";

const routeContextSchema = z.object({
  params: z.object({
    id: z.string().min(1),
  }),
});

export async function GET(
  req: Request,
  context: z.infer<typeof routeContextSchema>
) {
  try {
    const { params } = routeContextSchema.parse(context);

    const db = drizzle(getRequestContext().env.DB, { schema });
    const res = await db.query.authors.findFirst({
      where: eq(authors.id, Number(params.id)),
    });
    if (!res)
      return new Response(JSON.stringify({ message: "Not Found" }), {
        status: 404,
      });
    return new Response(JSON.stringify(res));
  } catch (error) {
    if (error instanceof z.ZodError) {
      return new Response(JSON.stringify(error.issues), { status: 422 });
    }

    return new Response(null, { status: 500 });
  }
}
