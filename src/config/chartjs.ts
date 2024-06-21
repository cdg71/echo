import { Elysia } from "elysia";

export const chartjsPlugin = new Elysia().get(
  "/static/scripts/chart.js",
  ({ set }) => {
    set.headers["Content-Type"] = "text/javascript; charset=utf8";
    return Bun.file("node_modules/chart.js/dist/chart.umd.js");
  }
);
