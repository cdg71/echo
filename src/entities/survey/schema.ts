import { Type, type Static } from "@sinclair/typebox";
import { notEmptyString, surveyCodeString } from "@src/utils/schemaPatterns";

export const Survey = Type.Object({
  id: Type.String({ pattern: surveyCodeString, default: "" }),
  name: Type.String({ pattern: notEmptyString, default: "" }),
  description: Type.Optional(Type.String()),
  context: Type.Optional(Type.String()),
  positions: Type.Optional(Type.String()),
  areas: Type.Optional(Type.String()),
  hash: Type.Optional(Type.String()),
  createdAt: Type.Number(),
});
export type Survey = Static<typeof Survey>;
