import { Stream } from "@elysiajs/stream";
import { Elysia } from "elysia";
import { streamsStore } from "../store";

export const subRoute = new Elysia()
  .use(streamsStore)
  .get("/sub/:streamid", ({ store, params }) => {
    const streamId = params.streamid;
    const prevHeartbeat = Date.now();
    const stream = new Stream();
    store.streams.push({
      id: streamId,
      instance: stream,
      prevHeartbeat: prevHeartbeat,
    });
    return stream;
  });
