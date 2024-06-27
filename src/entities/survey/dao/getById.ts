import { db } from "@src/config/database";
import { Survey } from "@src/entities/survey/schema";

export const getSurveyById = (props: Pick<Survey, "id">) => {
  try {
    const selectQuery = db.prepare("SELECT * FROM Survey WHERE id = $id");
    const survey = selectQuery.get({ $id: props.id }) as Survey;
    selectQuery.finalize();
    delete survey.hash;
    return survey;
  } catch (error) {
    throw new Error("Cannot get survey by id.");
  }
};
