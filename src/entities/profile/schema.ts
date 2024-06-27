import { type Static } from "@sinclair/typebox";
import Elysia, { t } from "elysia";

export const Profile = t.Object({
  id: t.String(),
  surveyId: t.String(),
  position: t.Optional(t.String()),
  area: t.Optional(t.String()),
  createdAt: t.Number(),
});
export type Profile = Static<typeof Profile>;
export const ProfileModel = new Elysia().model({ Profile });
