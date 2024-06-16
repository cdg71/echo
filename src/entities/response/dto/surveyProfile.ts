import Elysia, { t, type Static } from "elysia";
import { Response } from "../schema";

export const ResponseSurveyProfile = t.Pick(Response, [
  "surveyId",
  "profileId",
]);
export type ResponseSurveyProfile = Static<typeof ResponseSurveyProfile>;
export const ResponseSurveyProfileModel = new Elysia().model({
  ResponseSurveyProfile,
});
