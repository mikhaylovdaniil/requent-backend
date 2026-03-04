import Elysia from "elysia";
import { notesTable } from "../db/schema";
import { db } from "../db/db";

const router = new Elysia({ prefix: "/notes" });

router.get("/", async () => {
  const results = await db.select().from(notesTable);

  if (results.length === 0) status(204, "Notes are empty");
  return results;
});

export default router;
