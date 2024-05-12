import {
  SQLiteColumn,
  SQLiteSelect,
  SQLiteTable,
} from "drizzle-orm/sqlite-core";
import { SQL, count } from "drizzle-orm";
import { APIResources, APIResourcesPagination } from "@/types";
import { DrizzleD1Database } from "drizzle-orm/d1";
import * as schema from "@/lib/db/schema";

export function withPagination<T extends SQLiteSelect>(
  qb: T,
  orderByColumn: SQLiteColumn | SQL,
  page = 1,
  pageSize = 8
) {
  return qb
    .orderBy(orderByColumn)
    .limit(pageSize)
    .offset((page - 1) * pageSize);
}

export async function getPaginatedResponse<T>(
  db: DrizzleD1Database<typeof schema>,
  data: T[],
  table: SQLiteTable,
  cursor: number,
  pageSize: number,
  req: Request
): Promise<APIResources<T[]>> {
  const [{ count: totalItems }] = await db
    .select({ count: count() })
    .from(table);

  const totalPages = (totalItems % pageSize) + 1;
  const nextCursor = Math.min(cursor + pageSize, totalItems);
  const prevCursor = Math.max(cursor - pageSize, 0);
  const pagination = { cursor, nextCursor, totalPages, totalItems };
  const links = {
    prev: req.url + `?cursor=${prevCursor}`,
    next: cursor + 1 == totalItems ? null : req.url + `?cursor=${nextCursor}`,
    first: req.url + `?cursor=0`,
    last: req.url + `?cursor=${totalItems - 1}`,
  };
  const meta = { pagination, links };
  return { data, meta };
}
