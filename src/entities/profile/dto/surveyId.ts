import Elysia, { t, type Static } from "elysia";
import { Profile } from "../schema";

export const ProfileSurveyId = t.Pick(Profile, ["surveyId"]);
export type ProfileSurveyId = Static<typeof ProfileSurveyId>;
export const ProfileSurveyIdModel = new Elysia().model({ ProfileSurveyId });
