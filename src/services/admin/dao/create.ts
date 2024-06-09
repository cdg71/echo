import { db } from "@src/config/database";
import { getSurveyById } from "@src/entities/survey/dao";
import type { EditSurvey } from "../dto/edit";

// Create a new survey
interface CreateSurveyProps {
  data: EditSurvey;
  hash: string;
}
export const createSurvey = (props: CreateSurveyProps) => {
  try {
    const {
      data: { id, name },
    } = props;

    const query = db.prepare(
      "INSERT INTO Survey (id, name, hash, createdAt) VALUES ($id, $name, $hash, $createdAt);"
    );
    const now = Date.now();
    query.run({
      $id: id,
      $name: name,
      $hash: props.hash,
      $createdAt: now,
    });
    query.finalize();
    const survey = getSurveyById(id);
    delete survey.hash;
    return survey;
  } catch (error) {
    throw new Error("Cannot create survey.");
  }
};
