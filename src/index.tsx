import { Elysia } from "elysia";
import { cors } from "@elysiajs/cors";
import { helmet } from "elysia-helmet";
import { tailwind } from "@gtramontina.com/elysia-tailwind";
import { staticPlugin } from "@elysiajs/static";
import { streamsStore } from "@src/services/streams/store";
import { htmxPlugin } from "@src/plugins/htmx";
import { homepageService } from "@src/services/homepage";
import { streamsService } from "@src/services/streams";

new Elysia()
  .use(streamsStore)
  .use(cors())
  .use(helmet())
  .use(staticPlugin())
  .use(htmxPlugin)
  .use(
    tailwind({
      path: "/public/styles/globals.css",
      source: "./src/styles/globals.css",
      config: "./tailwind.config.js",
      options: {
        minify: true,
        autoprefixer: false,
      },
    })
  )
  .use(homepageService)
  .use(streamsService)
  .listen(process.env["PORT"]);
