import { type Static } from "@sinclair/typebox";
import { surveyCodeString } from "@src/utils/schemaPatterns";
import { t } from "elysia";

export const Survey = t.Object({
  id: t.String({ pattern: surveyCodeString, default: "" }),
  name: t.String(),
  description: t.String(),
  context: t.String(),
  positions: t.String(),
  areas: t.String(),
  questions: t.String(),
  hash: t.Optional(t.String()),
  createdAt: t.Number(),
});
export type Survey = Static<typeof Survey>;
