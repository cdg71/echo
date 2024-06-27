import { db } from "@src/config/database";
import { Snapshot } from "@src/entities/snapshot/schema";
import type { SnapshotId } from "../dto/id";

export const getSnapshotById = (props: SnapshotId) => {
  try {
    const selectQuery = db.prepare("SELECT * FROM Snapshot WHERE id = $id");
    const snapshot = selectQuery.get({ $id: props.id }) as Snapshot;
    selectQuery.finalize();
    return snapshot;
  } catch (error) {
    throw new Error("Cannot get snapshot by id.");
  }
};
