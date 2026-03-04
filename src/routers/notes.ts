import Elysia from "elysia";
import { notesTable } from "../db/schema";
import { db } from "../db/db";

import { cors } from "@elysiajs/cors";

const router = new Elysia({ prefix: "/notes" });

router.get("/", async () => {
  const results = await db.select().from(notesTable);

  if (results.length === 0) status(204, "Notes are empty");
  return results;
});

router.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend's URL
    credentials: true, // Optional: if you need to support cookies
  }),
);

export default router;
