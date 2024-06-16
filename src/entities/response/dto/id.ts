import Elysia, { t, type Static } from "elysia";
import { Response } from "../schema";

export const ResponseId = t.Pick(Response, ["id"]);
export type ResponseId = Static<typeof ResponseId>;
export const ResponseIdModel = new Elysia().model({ ResponseId });
