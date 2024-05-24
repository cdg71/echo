import { Elysia } from "elysia";
import { html } from "@elysiajs/html";
import { htmx } from "elysia-htmx";

export const htmxPlugin = new Elysia()
  .use(html())
  .use(htmx())
  .get(
    "/public/scripts/htmx.js",
    Bun.file("node_modules/htmx.org/dist/htmx.min.js")
  )
  .get(
    "/public/scripts/sse.js",
    Bun.file("node_modules/htmx.org/dist/ext/sse.js")
  );
