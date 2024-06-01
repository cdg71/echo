import { Patterns } from "@elysiajs/cron";

declare module "bun" {
  interface Env {
    PORT: number;
    STREAM_CLEANER_CRON_PATTERN: keyof typeof Patterns;
    STREAM_EXPIRES_AFTER_SECONDS: number;
  }
}
