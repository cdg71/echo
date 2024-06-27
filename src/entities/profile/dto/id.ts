import Elysia, { t, type Static } from "elysia";
import { Profile } from "../schema";

export const ProfileId = t.Pick(Profile, ["id"]);
export type ProfileId = Static<typeof ProfileId>;
export const ProfileIdModel = new Elysia().model({ ProfileId });
