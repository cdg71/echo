import { db } from "@src/config/database";
import { Survey } from "@src/entities/survey/schema";

// Get a survey hash by id
export const getHashById = (props: Pick<Survey, "id">) => {
  try {
    const selectQuery = db.query("SELECT hash FROM Survey WHERE id = $id");
    const survey = selectQuery.get({ $id: props.id }) as Survey;
    selectQuery.finalize();
    return survey.hash;
  } catch (error) {
    throw new Error("Cannot get survey hash by id.");
  }
};
