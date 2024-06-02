import { SurveySchema } from "@src/entities/survey/schema";
import { Elysia, getSchemaValidator, t } from "elysia";

export type CreateSurveyDTO = typeof createSurveySchema;

export const createSurveySchema = t.Pick(SurveySchema, [
  "id",
  "name",
  "description",
]);

export const createSurveyModel = new Elysia().model({
  createSurveyDTO: createSurveySchema,
});

export const isCreateSurveyDTO = (obj: unknown): obj is CreateSurveyDTO => {
  const validator = getSchemaValidator(createSurveySchema);
  return validator.Check(obj);
};
