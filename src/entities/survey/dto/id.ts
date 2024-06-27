import Elysia, { t, type Static } from "elysia";
import { Survey } from "../schema";

export const SurveyId = t.Pick(Survey, ["id"]);
export type SurveyId = Static<typeof SurveyId>;
export const SurveyIdModel = new Elysia().model({
  SurveyId,
});
