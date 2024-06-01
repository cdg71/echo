import { cors } from "@elysiajs/cors";
import { staticPlugin } from "@elysiajs/static";
import { tailwind } from "@gtramontina.com/elysia-tailwind";
import { htmxPlugin } from "@src/config/htmx";
import { editSurveyService } from "@src/services/adminSurvey";
import { homepageService } from "@src/services/homepage";
import { streamsService } from "@src/services/streams";
import { Elysia } from "elysia";
import { helmet } from "elysia-helmet";

new Elysia()
  .use(cors())
  .use(helmet())
  .use(staticPlugin({ prefix: "/static", assets: "src/static" }))
  .use(
    staticPlugin({
      prefix: "/assets",
      assets: "data/assets",
      ignorePatterns: [".gitkeep"],
    })
  )
  .use(htmxPlugin)
  .use(
    tailwind({
      path: "/static/styles/globals.css",
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
  .get("/empty", () => <></>)
  .listen(import.meta.env.PORT);
