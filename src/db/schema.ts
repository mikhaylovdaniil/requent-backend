import { int, sqliteTable as table, text } from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const notesTable = table("notes", {
  id: int().primaryKey({ autoIncrement: true }),
  title: text().notNull(),
  description: int().notNull(),
  tags: text(),
  progress: int()
    .notNull()
    .default(sql`0`),
  completed: int()
    .notNull()
    .default(sql`0`),
  created_at: text()
    .notNull()
    .default(sql`current_timestamp`),
});
