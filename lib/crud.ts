import { z } from "zod";
import { authors, users } from "./db/schema";
import { AuthorsCreateSchema, UsersUpdateSchema } from "./schemas";
import { APIResource, APIResources } from "@/types";

export type Author = typeof authors.$inferSelect;
export type User = typeof users.$inferSelect;

export async function createAuthor(
  body: z.infer<typeof AuthorsCreateSchema>
): Promise<APIResource<Author>> {
  const res = await fetch("/api/authors", {
    method: "POST",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}

export async function updateMe(
  body: z.infer<typeof UsersUpdateSchema>
): Promise<APIResource<User>> {
  const res = await fetch(`/api/users/me`, {
    method: "PATCH",
    body: JSON.stringify(body),
    headers: { "Content-Type": "application/json" },
  });
  return res.json();
}
