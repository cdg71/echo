import { db } from "@src/config/database";
import { getSurveyById } from "@src/entities/survey/dao/getById";
import type { Survey } from "@src/entities/survey/schema";
import type { EditSurvey } from "../dto/edit";

export const updateSurvey = (props: EditSurvey) => {
  try {
    const { id } = props;
    const prev = getSurveyById({ id });
    const next = { ...prev, ...props } as Survey;
    const { name, description, context, areas, positions, questions } = next;
    const query = db.prepare(`
      UPDATE Survey
      SET
        name = $name,
        description = $description,
        context = $context,
        areas = $areas,
        positions = $positions,
        questions = $questions
      WHERE
        id = $id;
    `);
    query.run({
      $name: name,
      $description: description,
      $context: context,
      $areas: areas,
      $positions: positions,
      $questions: questions,
      $id: id,
    });
    query.finalize();
    const survey = getSurveyById({ id });
    // the hash should never leave the database unattended
    delete survey.hash;
    return survey;
  } catch (error) {
    throw new Error("Cannot update survey.");
  }
};
