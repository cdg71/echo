import { notEmptyString, surveyCodeString } from "@src/libs/patterns";
import { Elysia, t } from "elysia";

export const surveyModel = new Elysia().model({
  survey: t.Object({
    name: t.String({ pattern: notEmptyString }),
    id: t.String({ pattern: surveyCodeString }),
    description: t.String(),
  }),
});
