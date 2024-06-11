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
      data: { id, name, description, context, areas, positions, questions },
      hash,
    } = props;
    const query = db.prepare(
      `INSERT INTO Survey  (id,  name,  description,  context,  areas,  positions,   hash, questions,  createdAt)
       VALUES              ($id, $name, $description, $context, $areas, $positions, $hash, $questions, $createdAt);`
    );
    query.run({
      $id: id,
      $name: name,
      $description: description,
      $context: context,
      $areas: areas,
      $positions: positions,
      $questions: questions,
      $hash: hash,
      $createdAt: Date.now(),
    });
    query.finalize();
    const survey = getSurveyById(id);
    // the hash should never leave the database unattended
    delete survey.hash;
    return survey;
  } catch (error) {
    throw new Error("Cannot create survey.");
  }
};
