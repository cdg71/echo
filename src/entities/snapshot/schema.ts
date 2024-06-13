import { type Static } from "@sinclair/typebox";
import Elysia, { t } from "elysia";

export const Snapshot = t.Object({
  id: t.String(),
  surveyId: t.String(),
  createdAt: t.Number(),
  result: t.Optional(t.String()),
  readyAt: t.Optional(t.Number()),
});
export type Snapshot = Static<typeof Snapshot>;
export const SnapshotModel = new Elysia().model({ Snapshot });
