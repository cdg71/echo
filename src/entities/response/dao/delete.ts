import { db } from "@src/config/database";
import type { ResponseId } from "../dto/id";

export const deleteResponse = (props: ResponseId) => {
  try {
    const { id } = props;
    const query = db.prepare(`DELETE FROM Response WHERE id = $id;`);
    query.run({ $id: id });
    query.finalize();
    return true;
  } catch (error) {
    throw new Error("Cannot delete response.");
  }
};
