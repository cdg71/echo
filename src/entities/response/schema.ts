import Elysia, { t } from "elysia";

export const Response = t.Object({
  id: t.String(),
  surveyId: t.String(),
  profileId: t.String(),
  answers: t.Record(
    t.String(),
    t.Object({
      questionId: t.String(),
      value: t.String(),
      comment: t.String(),
    })
  ),
  createdAt: t.Number(),
});
export type Response = typeof Response.static;
export const ResponseModel = new Elysia().model({ Response });
