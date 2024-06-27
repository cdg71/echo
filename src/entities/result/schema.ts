import Elysia, { t } from "elysia";

export const ResultItem = t.Object({
  label_x: t.String(),
  label_y: t.String(),
  question: t.String(),
  question_id: t.String(),
  imageUrl: t.String(),
  analyse: t.String(),
});
export type ResultItem = typeof ResultItem.static;
export const ResultItemModel = new Elysia().model({ ResultItem });

export const Result = t.Array(ResultItem);
export type Result = typeof Result.static;
export const ResultModel = new Elysia().model({ Result });
