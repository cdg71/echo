import { Elysia } from "elysia";
import { subRoute } from "./routes/sub";
import { pubRoute } from "./routes/pub";
import { heartbeatRoute } from "./routes/heartbeat";

export const streamsService = new Elysia()
  .use(subRoute)
  .use(pubRoute)
  .use(heartbeatRoute);
