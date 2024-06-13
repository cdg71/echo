import Elysia, { t, type Static } from "elysia";
import { Snapshot } from "../schema";

export const SnapshotId = t.Pick(Snapshot, ["id"]);
export type SnapshotId = Static<typeof SnapshotId>;
export const SnapshotIdModel = new Elysia().model({ SnapshotId });
