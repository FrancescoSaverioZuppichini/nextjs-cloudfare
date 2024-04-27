// https://github.com/cloudflare/next-on-pages/issues/675

import * as schema from "@/lib/db/schema";
import { DrizzleD1Database, drizzle } from "drizzle-orm/d1";

declare global {
  // eslint-disable-next-line no-var
  var cachedDb: DrizzleD1Database<typeof schema>;
}

let db: DrizzleD1Database<typeof schema>;
if (process.env.NODE_ENV === "production") {
  db = drizzle(process.env.DB! as unknown as D1Database, { schema });
} else {
  if (!global.cachedDb) {
    global.cachedDb = drizzle(process.env.DB! as unknown as D1Database, {
      schema,
    });
  }
  db = global.cachedDb;
}

export default db;
