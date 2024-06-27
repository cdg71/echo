import { db } from "@src/config/database";
import { getSnapshotById } from "@src/entities/snapshot/dao/getById";
import type { Snapshot } from "@src/entities/snapshot/schema";
import dayjs from "dayjs";

export const markSnapshotAsReady = (props: Pick<Snapshot, "id">) => {
  try {
    const { id } = props;
    const query = db.prepare(`
      UPDATE Snapshot
      SET
        readyAt = $readyAt
      WHERE
        id = $id;
    `);
    query.run({
      $id: id,
      $readyAt: dayjs().unix(),
    });
    query.finalize();
    const snapshot = getSnapshotById({ id });
    return snapshot;
  } catch (error) {
    throw new Error("Cannot mark snapshot as ready.");
  }
};
