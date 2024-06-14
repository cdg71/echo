import { html } from "@elysiajs/html";
import { staticPlugin } from "@elysiajs/static";
import { tailwind } from "@gtramontina.com/elysia-tailwind";
import { htmxPlugin } from "@src/config/htmx";
import { adminService } from "@src/services/admin";
import { homepageService } from "@src/services/homepage";
import { streamsService } from "@src/services/streams";
import { Elysia } from "elysia";
import { htmlTemplate } from "./components/htmlTemplate";
import { snapshotService } from "./services/snapshot";
import { surveyService } from "./services/survey";

new Elysia()
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
        <div class="hero min-h-screen">
          <div class="hero-content text-center flex flex-col">
            <a href="/" class="mx-auto w-1/3">
              <img
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
