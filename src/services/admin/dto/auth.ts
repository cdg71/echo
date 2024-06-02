import { SurveySchema } from "@src/entities/survey/schema";
import { Elysia, getSchemaValidator, t } from "elysia";

export type AuthSurveyDTO = typeof authSurveySchema;

export const authSurveySchema = t.Pick(SurveySchema, ["id", "securityCode"]);

export const authSurveyModel = new Elysia().model({
  authSurveyDTO: authSurveySchema,
});

export const isAuthSurveyDTO = (obj: unknown): obj is AuthSurveyDTO => {
  const validator = getSchemaValidator(authSurveySchema);
  return validator.Check(obj);
};
