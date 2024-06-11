import { html } from "@elysiajs/html";
import { Elysia } from "elysia";
import { htmx } from "elysia-htmx";

export const htmxPlugin = new Elysia()
  .use(html())
  .use(htmx())
  .get(
    "/static/scripts/htmx.js",
    Bun.file("node_modules/htmx.org/dist/htmx.min.js")
  )
  .get(
    "/static/scripts/sse.js",
    Bun.file("node_modules/htmx.org/dist/ext/sse.js")
  );
