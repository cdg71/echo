import { heartbeatComponent } from "./heartbeat";

export const chatComponent = (streamid: string) => (
  <div class="max-w-md pt-5" hx-ext="sse" sse-connect={`/sub/${streamid}`}>
    {heartbeatComponent(streamid)}
    <div sse-swap="message" hx-swap="afterbegin" />
  </div>
);
