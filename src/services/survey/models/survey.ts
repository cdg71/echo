import { notEmptyString, surveyCodeString } from "@src/libs/patterns";
import { Elysia, t } from "elysia";

const surveySchema = t.Object({
  id: t.String({ pattern: surveyCodeString }),
  name: t.String({ pattern: notEmptyString }),
  description: t.String(),
  securityCode: t.String(),
  created: t.Date(),
  updated: t.Date(),
});

export const createSurveyDTO = new Elysia().model({
  createSurveyDTO: t.Pick(surveySchema, ["name", "id", "description"]),
});
