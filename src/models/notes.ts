import { t } from "elysia";
import { notesTable } from "../db/schema";

export const NoteCreate = t.Object({
  title: t.String({ minLength: 6 }),
  description: t.String({ minLength: 6 }),
  tags: t.Optional(t.Array(t.String({ minLength: 2 }))),
});

export type newNote = typeof notesTable.$inferInsert;
