import Elysia, { t, type Static } from "elysia";
import { Response } from "../schema";

export const CreateResponse = t.Pick(Response, [
  "surveyId",
  "profileId",
  "answers",
]);
export type CreateResponse = Static<typeof CreateResponse>;
export const CreateResponseModel = new Elysia().model({ CreateResponse });
