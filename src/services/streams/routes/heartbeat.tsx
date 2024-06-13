import dayjs from "dayjs";
import { Elysia } from "elysia";
import { heartbeatComponent } from "../components/heartbeat";
import { streamsStore } from "../store";

export const heartbeatRoute = new Elysia()
  .use(streamsStore)
  .get("/heartbeat/:id", ({ params, store }) => {
    const { id } = params;
    const index = store.streams.findIndex((c) => c.id === id);
    store.streams[index].prevHeartbeat = dayjs().unix();
    return heartbeatComponent(id);
  });
