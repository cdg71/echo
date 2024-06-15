import { jwtSecret } from "@src/config/jwtSecret";
import { t } from "elysia";

export const ProfilesCookie = t.Cookie(
  {
    profiles: t.Record(t.String(), t.String()),
  },
  {
    secrets: jwtSecret,
    httpOnly: true,
    sameSite: true,
    sign: ["profiles"],
  }
);
