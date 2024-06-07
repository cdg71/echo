import { Elysia, getSchemaValidator, t } from "elysia";

export type AuthSurveyDTO = typeof authSurveySchema;

export const authSurveySchema = t.Object({
  id: t.String(),
  password: t.String(),
});

export const AuthJwtSchema = t.Cookie({
  id: t.String(),
});
export const AuthCookie = t.Cookie({ auth: t.String() });

export const authSurveyModel = new Elysia().model({
  authSurveyDTO: authSurveySchema,
});

export const isAuthSurveyDTO = (obj: unknown): obj is AuthSurveyDTO => {
  const validator = getSchemaValidator(authSurveySchema);
  return validator.Check(obj);
};
