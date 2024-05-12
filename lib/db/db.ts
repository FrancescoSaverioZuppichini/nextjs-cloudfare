// https://github.com/cloudflare/next-on-pages/issues/675

import * as schema from "@/lib/db/schema";
import { DrizzleD1Database, drizzle } from "drizzle-orm/d1";

declare global {
  // eslint-disable-next-line no-var
  var cachedDb: DrizzleD1Database<typeof schema>;
}

const DB = process.env.DB! as unknown as D1Database;

let db: DrizzleD1Database<typeof schema>;
if (process.env.NODE_ENV === "production") {
  db = drizzle(DB, { schema });
} else {
  if (!global.cachedDb) {
    console.log(DB, "DB");
    global.cachedDb = drizzle(DB, {
      schema,
    });
  }
  db = global.cachedDb;
}

export default db;
