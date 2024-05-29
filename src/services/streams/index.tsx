import { Elysia } from "elysia";
import { heartbeatRoute } from "./routes/heartbeat";
import { pubRoute } from "./routes/pub";
import { subRoute } from "./routes/sub";

export const streamsService = new Elysia()
  .use(subRoute)
  .use(pubRoute)
  .use(heartbeatRoute);
