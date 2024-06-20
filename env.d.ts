import { Patterns } from "@elysiajs/cron";

declare module "bun" {
  interface Env {
    PORT: number;
    STREAM_CLEANER_CRON_PATTERN: keyof typeof Patterns;
    STREAM_EXPIRES_AFTER_SECONDS: number;
    JWT_SECRET_PATH: string;
    LOCAL_ENDPOINT_URL: string;
    CLOUD_ENDPOINT_URL: string;
    CLOUD_ENDPOINT_PREFIX: string;
    LOAD_POLLING_SEC: number;
    CLOUD_GEN_ABORTABLE_AFTER_SEC: number;
  }
}
