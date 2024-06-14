import { cors } from "@elysiajs/cors";
import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import { tailwind } from "@gtramontina.com/elysia-tailwind";
import { htmxPlugin } from "@src/config/htmx";
import { adminService } from "@src/services/admin";
import { homepageService } from "@src/services/homepage";
import { streamsService } from "@src/services/streams";
import { Elysia } from "elysia";
import { helmet } from "elysia-helmet";
import { htmlTemplate } from "./components/htmlTemplate";
import { snapshotService } from "./services/snapshot";
import { surveyService } from "./services/survey";

new Elysia()
  .use(cors())
  .use(helmet())
  .use(html())
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
  .get("/empty", () => <></>)
  .use(homepageService)
  .use(streamsService)
  .use(adminService)
  .use(snapshotService)
  .use(surveyService)
  .onError(({ set }) => {
    set.headers["Content-Type"] = "text/html; charset=utf8";
    return htmlTemplate({
      content: (
        <div class="hero h-screen">
          <div class="hero-content text-center">
            <a href="/">
              <img
                class="mx-auto w-3/5 md:w-1/2 lg:w-3/4"
                src="/static/images/page_not_found.svg"
                alt="Page not found"
              />
            </a>
          </div>
        </div>
      ),
    });
  })
  .listen(import.meta.env.PORT);
