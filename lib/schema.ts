import { z } from "zod";

export const AuthorsCreateSchema = z.object({
  name: z.string().min(1, { message: "name must be at least 1 character." }),
});
