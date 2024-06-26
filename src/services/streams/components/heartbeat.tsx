export const heartbeatComponent = (streamId: string) => (
  <div
    hx-get={`/heartbeat/${streamId}`}
    hx-trigger={`load delay:${import.meta.env.STREAM_EXPIRES_AFTER_SECONDS}s`}
    hx-swap="outerHTML"
    class="hidden"
  />
);
