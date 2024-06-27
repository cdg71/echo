import Elysia, { t, type Static } from "elysia";
import { Response } from "../schema";

export const UpdateResponse = t.Pick(Response, ["id", "answers"]);
export type UpdateResponse = Static<typeof UpdateResponse>;
export const UpdateResponseModel = new Elysia().model({ UpdateResponse });
