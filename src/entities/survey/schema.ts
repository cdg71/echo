import { notEmptyString, surveyCodeString } from "@src/utils/schemaPatterns";
import { t } from "elysia";

export type Survey = typeof SurveySchema;

export const SurveySchema = t.Object({
  id: t.String({ pattern: surveyCodeString, default: "" }),
  name: t.String({ pattern: notEmptyString, default: "" }),
  description: t.String({ default: "" }),
  securityCode: t.String(),
  created: t.Number(),
  updated: t.Number(),
});
