import { db } from "@src/config/database";
import type { Survey } from "@src/entities/survey/schema";

type DeleteSurveyProps = Pick<Survey, "id">;

export const deleteSurvey = (props: DeleteSurveyProps) => {
  try {
    const { id } = props;
    const query = db.prepare(`DELETE FROM Survey WHERE id = $id;`);
    query.run({ $id: id });
    query.finalize();
    return true;
  } catch (error) {
    throw new Error("Cannot create survey.");
  }
};
