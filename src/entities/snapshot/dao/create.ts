import { db } from "@src/config/database";
import { getSnapshotById } from "@src/entities/snapshot/dao/getById";
import { randomUUID } from "crypto";
import dayjs from "dayjs";
import type { SnapshotSurveyId } from "../dto/surveyId";

export const createSnapshot = (props: SnapshotSurveyId) => {
  try {
    const id = randomUUID() as string;
    const { surveyId } = props;
    const query = db.prepare(
      `INSERT INTO Snapshot (id,  surveyId, createdAt)
       VALUES               ($id, $surveyId, $createdAt);`
    );
    query.run({
      $id: id,
      $surveyId: surveyId,
      $createdAt: dayjs().unix(),
    });
    query.finalize();
    const snapshot = getSnapshotById({ id });
    return snapshot;
  } catch (error) {
    throw new Error("Cannot create snapshot.");
  }
};
