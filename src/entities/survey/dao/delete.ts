import { db } from "@src/config/database";
import type { Survey } from "@src/entities/survey/schema";

export const deleteSurvey = (props: Pick<Survey, "id">) => {
  try {
    const { id } = props;
    const query = db.prepare(`DELETE FROM Survey WHERE id = $id;`);
    query.run({ $id: id });
    query.finalize();
    return true;
  } catch (error) {
    throw new Error("Cannot delete survey.");
  }
};
