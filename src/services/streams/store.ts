import type ElysiaStream from "@elysiajs/stream";
import { Elysia } from "elysia";

export interface Stream {
  id: string;
  instance: ElysiaStream<string | number | boolean | object>;
  prevHeartbeat: number;
}

export const streamsStore = new Elysia().state("streams", [] as Stream[]);
