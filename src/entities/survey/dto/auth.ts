import { Type, type Static } from "@sinclair/typebox";
import { Survey } from "@src/entities/survey/schema";
import { Elysia, t } from "elysia";

export const Auth = Type.Object({
  id: Type.String(),
  password: Type.String(),
});
export type Auth = Static<typeof Auth>;
export const AuthModel = new Elysia().model({
  Auth,
});

export const AuthJwt = t.Cookie({
  id: Type.String(),
});
export const AuthCookie = t.Cookie({ auth: Type.String() });

export const Hash = Type.Pick(Survey, ["hash"]);
export type Hash = Static<typeof Hash>;
