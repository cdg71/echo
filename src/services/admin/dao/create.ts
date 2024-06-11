import { db } from "@src/config/database";
import { getSurveyById } from "@src/entities/survey/dao";
import type { Survey } from "@src/entities/survey/schema";

// Create a new survey
interface CreateSurveyProps {
  data: Survey;
  hash: string;
}
export const createSurvey = (props: CreateSurveyProps) => {
  try {
    const {
      data: { id, name, settings, createdAt },
    } = props;
    const query = db.prepare(
      "INSERT INTO Survey (id, name, settings, hash, createdAt) VALUES ($id, $name, $settings, $hash, $createdAt);"
    );
    query.run({
      $id: id,
      $name: name,
      $settings: settings,
      $hash: props.hash,
      $createdAt: createdAt,
    });
    query.finalize();
    const survey = getSurveyById(id);
    delete survey.hash;
    return survey;
  } catch (error) {
    throw new Error("Cannot create survey.");
  }
};
