import { Survey } from "@src/entities/survey/schema";
import { Elysia, t, type Static } from "elysia";

export const EditSurvey = t.Optional(t.Omit(Survey, ["hash", "createdAt"]));
export type EditSurvey = Static<typeof EditSurvey>;
export const EditSurveyModel = new Elysia().model({
  EditSurvey,
});
