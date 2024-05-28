import {
  SQLiteColumn,
  SQLiteSelect,
  SQLiteTable,
} from "drizzle-orm/sqlite-core";
import { SQL, count } from "drizzle-orm";
import { APIResources, APIResourcesPagination } from "@/types";
import { DrizzleD1Database } from "drizzle-orm/d1";
import * as schema from "@/lib/db/schema";
import { createNextCursor } from "../cursor";

type TWithID = {
  id: number | string;
};

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

export async function getPaginatedResponse<T extends TWithID>(
  data: T[]
): Promise<APIResources<T>> {
  const nextCursor = createNextCursor(data);
  const pagination = { nextCursor };
  const meta = { pagination };
  return { data, meta };
}
