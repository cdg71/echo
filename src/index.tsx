import { cors } from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";
import { tailwind } from "@gtramontina.com/elysia-tailwind";
import { htmxPlugin } from "@src/plugins/htmx";
import { homepageService } from "@src/services/homepage";
import { streamsService } from "@src/services/streams";
import { Elysia } from "elysia";
import { helmet } from "elysia-helmet";
import { editSurveyService } from "./services/survey";

new Elysia()
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
  .use(editSurveyService)
  .listen(import.meta.env["PORT"]);
