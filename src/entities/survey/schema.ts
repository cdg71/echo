import { notEmptyString, surveyCodeString } from "@src/utils/schemaPatterns";
import { t } from "elysia";

export type Survey = typeof SurveySchema;

export const SurveySchema = t.Object({
  id: t.String({ pattern: surveyCodeString }),
  name: t.String({ pattern: notEmptyString }),
  description: t.String({ default: "" }),
  securityCode: t.String(),
  created: t.Number(),
  updated: t.Number(),
});
