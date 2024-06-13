import { db } from "@src/config/database";
import { getSnapshotById } from "@src/entities/snapshot/dao/getById";
import type { Snapshot } from "@src/entities/snapshot/schema";

export const updateSnapshot = (
  props: Omit<Snapshot, "createdAt" | "surveyId">
) => {
  try {
    const { id } = props;
    const prev = getSnapshotById({ id });
    const next = { ...prev, ...props } as Snapshot;
    const { result, readyAt } = next;
    const query = db.prepare(`
      UPDATE Snapshot
      SET
        result = $result,
        readyAt = $readyAt
      WHERE
        id = $id;
    `);
    query.run({
      $id: id,
      $result: result ?? "",
      $readyAt: readyAt ?? null,
    });
    query.finalize();
    const snapshot = getSnapshotById({ id });
    return snapshot;
  } catch (error) {
    throw new Error("Cannot update snapshot.");
  }
};
