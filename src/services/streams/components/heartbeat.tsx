export const heartbeatComponent = (streamId: string) => (
  <div
    hx-get={`/keepalive/${streamId}`}
    hx-trigger={`load delay:${process.env["STREAM_EXPIRES_AFTER_SECONDS"]}s`}
    hx-swap="outerHTML"
    class="hidden"
  />
);
