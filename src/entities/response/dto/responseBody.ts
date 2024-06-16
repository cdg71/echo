import Elysia, { t, type Static } from "elysia";
import { Response } from "../schema";

const AnswerKey = t.TemplateLiteral("answer;${string};${value|comment}");

export const ResponseBody = t.Intersect([
  t.Pick(Response, ["id", "surveyId", "profileId"]),
  t.Record(AnswerKey, t.String()),
]);
export type ResponseBody = Static<typeof ResponseBody>;
export const ResponseBodyModel = new Elysia().model({ ResponseBody });
