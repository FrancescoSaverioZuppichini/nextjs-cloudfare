import { relations } from "drizzle-orm";
import { sqliteTable, text, integer } from "drizzle-orm/sqlite-core";

export const authors = sqliteTable("authors", {
  id: integer("id").primaryKey(),
  name: text("name", { length: 256 }).unique(),
});

export const authorsRelations = relations(authors, ({ many }) => ({
  books: many(books),
}));

export const books = sqliteTable("books", {
  id: integer("id").primaryKey(),
  title: text("title", { length: 256 }).unique(),
  authorId: integer("author_id").references(() => authors.id, {
    onDelete: "cascade",
  }),
});

export const booksRelations = relations(books, ({ one }) => ({
  authorId: one(authors, {
    fields: [books.authorId],
    references: [authors.id],
  }),
}));
