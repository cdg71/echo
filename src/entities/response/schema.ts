import Elysia, { t } from "elysia";

export const AnswerPropKey = t.Union([
  t.Literal("value"),
  t.Literal("comment"),
]);
export type AnswerPropKey = typeof AnswerPropKey.static;

export const AnswerKey = t.TemplateLiteral("answer;${string};${value|comment}");
export type AnswerKey = typeof AnswerKey.static;

export const Response = t.Object({
  id: t.String(),
  surveyId: t.String(),
  profileId: t.String(),
  answers: t.Record(t.String(), t.Record(AnswerPropKey, t.String())),
  createdAt: t.Number(),
});
export type Response = typeof Response.static;
export const ResponseModel = new Elysia().model({ Response });
