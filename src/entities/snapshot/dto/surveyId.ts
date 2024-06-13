import Elysia, { t, type Static } from "elysia";
import { Snapshot } from "../schema";

export const SnapshotSurveyId = t.Pick(Snapshot, ["surveyId"]);
export type SnapshotSurveyId = Static<typeof SnapshotSurveyId>;
export const SnapshotSurveyIdModel = new Elysia().model({ SnapshotSurveyId });
