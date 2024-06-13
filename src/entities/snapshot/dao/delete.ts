import { db } from "@src/config/database";
import type { Snapshot } from "@src/entities/snapshot/schema";

export const deleteSnapshot = (props: Pick<Snapshot, "id">) => {
  try {
    const { id } = props;
    const query = db.prepare(`DELETE FROM Snapshot WHERE id = $id;`);
    query.run({ $id: id });
    query.finalize();
    return true;
  } catch (error) {
    throw new Error("Cannot delete snapshot.");
  }
};
