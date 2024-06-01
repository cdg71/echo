import { heartbeatRoute } from "@src/services/streams/routes/heartbeat";
import { pubRoute } from "@src/services/streams/routes/pub";
import { subRoute } from "@src/services/streams/routes/sub";
import { Elysia } from "elysia";

export const streamsService = new Elysia()
  .use(subRoute)
  .use(pubRoute)
  .use(heartbeatRoute);
