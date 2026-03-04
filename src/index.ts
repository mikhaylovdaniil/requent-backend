import { Elysia } from "elysia";
import swagger from "@elysiajs/openapi";
import notesRouter from "./routers/notes";

const app = new Elysia()
  .use(
    swagger({
      documentation: {
        openapi: "3.1.0",
        info: {
          title: "My API",
          version: "1.0.0",
          description: "Пример API, сгенерированный Elysia + OpenAPI",
        },
        servers: [{ url: "http://localhost:3000" }],
      },
      // путь, где будет доступен UI (по умолчанию /swagger)
      path: "/swagger",
    }),
  )
  .use(notesRouter)
  .listen(3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`,
);
