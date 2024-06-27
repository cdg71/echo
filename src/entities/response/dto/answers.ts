import { Elysia, t } from "elysia";
import { Response } from "../schema";

export const Answers = t.Index(Response, ["answers"]);
export type Answers = typeof Answers.static;
export const AnswersModel = new Elysia().model({ Answers });
