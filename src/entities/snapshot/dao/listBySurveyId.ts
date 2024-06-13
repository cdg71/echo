import { db } from "@src/config/database";
import { Snapshot } from "@src/entities/snapshot/schema";

export const listSnapshotsBySurveyId = (props: Pick<Snapshot, "surveyId">) => {
  try {
    const selectQuery = db.prepare(
      "SELECT * FROM Snapshot WHERE surveyId = $surveyId ORDER BY createdAt ASC"
    );
    const snapshot = selectQuery.all({
      $surveyId: props.surveyId,
    }) as Snapshot[];
    selectQuery.finalize();
    return snapshot;
  } catch (error) {
    throw new Error("Cannot list snapshots by surveyId.");
  }
};
