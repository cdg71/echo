import Elysia, { t, type Static } from "elysia";
import { Profile } from "../schema";

export const EditProfile = t.Pick(Profile, ["position", "area"]);
export type EditProfile = Static<typeof EditProfile>;
export const EditProfileModel = new Elysia().model({ EditProfile });
