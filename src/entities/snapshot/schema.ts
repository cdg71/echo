import { type Static } from "@sinclair/typebox";
import { t } from "elysia";

export const Snapshot = t.Object({
  id: t.String(),
  surveyId: t.String(),
  createdAt: t.Number(),
  result: t.Optional(t.String()),
  readyAt: t.Optional(t.Number()),
});
export type Snapshot = Static<typeof Snapshot>;
