import { Survey } from "@src/entities/survey/schema";
import { Elysia, t, type Static } from "elysia";

export const Auth = t.Object({
  id: t.String(),
  password: t.String(),
});
export type Auth = Static<typeof Auth>;
export const AuthModel = new Elysia().model({
  Auth,
});

export const AuthJwt = t.Cookie({
  id: t.String(),
});
export const AuthCookie = t.Cookie({ auth: t.String() });

export const Hash = t.Pick(Survey, ["hash"]);
export type Hash = Static<typeof Hash>;
