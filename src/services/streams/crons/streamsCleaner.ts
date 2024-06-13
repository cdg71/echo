import { Patterns, cron } from "@elysiajs/cron";
import { streamsStore } from "@src/services/streams/store";
import dayjs from "dayjs";
import { Elysia } from "elysia";

export const streamCleanerCron = new Elysia().use(streamsStore).use(
  cron({
    name: "streamsCleaner",
    pattern: Patterns[
      import.meta.env.STREAM_CLEANER_CRON_PATTERN
    ] as unknown as string,
    run: () => {
      const now = dayjs().unix();
      for (const [index, client] of streamCleanerCron.store.streams.entries()) {
        if (
          Math.floor((now - client.prevHeartbeat) / 1000) >
          Number(import.meta.env.STREAM_EXPIRES_AFTER_SECONDS)
        ) {
          client.instance.close();
          streamCleanerCron.store.streams.splice(index, 1);
        }
      }
    },
  })
);
