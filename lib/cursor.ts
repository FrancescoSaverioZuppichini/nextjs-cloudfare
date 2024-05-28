import { z } from "zod";

export const CursorSchema = z.object({
  id: z.number(),
});

export class InvalidCursor extends Error {
  constructor() {
    super();
    this.message = "Invalid cursor";
    this.name = "InvalidCursor";
  }
}
export function decodeCursor(
  cursorBase64: string | null
): z.infer<typeof CursorSchema> | null {
  if (!cursorBase64) return null;

  try {
    const cursor = CursorSchema.parse(
      JSON.parse(Buffer.from(cursorBase64, "base64").toString("ascii"))
    );
    return cursor;
  } catch (e) {
    throw new InvalidCursor();
  }
}

export function createNextCursor(
  data: Array<{ id: number | string }>
): string | null {
  return data.length > 0
    ? Buffer.from(JSON.stringify({ id: data.at(-1)?.id })).toString("base64")
    : null;
}
