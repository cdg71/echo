import { notEmptyString, surveyCodeString } from "@src/utils/schemaPatterns";
import { t } from "elysia";

export type Survey = typeof SurveySchema;

export const SurveySchema = t.Object({
  id: t.String({ pattern: surveyCodeString, default: "" }),
  name: t.String({ pattern: notEmptyString, default: "" }),
  description: t.String(),
  context: t.String(),
  positions: t.String(),
  areas: t.String(),
  hash: t.String(),
  createdAt: t.Number(),
});
