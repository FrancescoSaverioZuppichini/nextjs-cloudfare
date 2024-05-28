import { z } from "zod";

export const AuthorsCreateSchema = z.object({
  name: z.string().min(1, { message: "name must be at least 1 character." }),
});

export const UsersUpdateSchema = z.object({
  name: z.string().min(1, { message: "name must be at least 1 character." }),
});

export const CursorSchema = z.object({
  id: z.number().min(0),
});
