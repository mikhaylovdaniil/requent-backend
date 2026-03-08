import Elysia from "elysia";
import { notesTable } from "../db/schema";
import { db } from "../db/db";
import { eq } from "drizzle-orm";
import { cors } from "@elysiajs/cors";
import { newNote, NoteCreate } from "../models/notes";
const router = new Elysia({ prefix: "/notes" });

router.get("/", async ({ status }) => {
  const results = await db.select().from(notesTable);

  if (results.length === 0) status(204, "Notes are empty");
  return results;
});

router.post(
  "/",
  async ({ body, status }) => {
    try {
      const insertNote: newNote = {
        title: body.title,
        description: body.description,
        tags: body.tags?.join(","),
        progress: 0,
        completed: 0,
      };

      const result = await db
        .insert(notesTable)
        .values(insertNote)
        .returning({ insertedId: notesTable.id });

      return { id: result[0].insertedId };
    } catch (err) {
      console.log("Error while inserting note: " + err);
      status(500, "Note not created");
    }
  },
  {
    body: NoteCreate,
  },
);

router.get("/:id", async ({ params: { id }, status }) => {
  const result = await db
    .select()
    .from(notesTable)
    .where(eq(notesTable.id, id));

  if (result.length === 0) status(404, "Note not found");
  return result;
});

router.put("/:id/complete", async ({ params: { id }, status }) => {
  const note = await db.select().from(notesTable).where(eq(notesTable.id, id));

  if (note.length === 0) status(404, "Note not found");

  try {
    const calculatedProgress = note[0].progress + 25;
    await db
      .update(notesTable)
      .set({ progress: calculatedProgress })
      .where(eq(notesTable.id, id)); // magic number
    return { progress: calculatedProgress };
  } catch (err) {
    status(500, "Error occured while updating notes");
  }
});

router.delete("/:id", async ({ params: { id }, status }) => {
  try {
    await db.delete(notesTable).where(eq(notesTable.id, id));
    return { message: "Note Deleted" };
  } catch (err) {
    console.log(`Error while deleting note: ${err}`);
    status(404, "Note not found");
  }
});

router.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend's URL
    credentials: true, // Optional: if you need to support cookies
  }),
);

export default router;
