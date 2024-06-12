import { db } from "@src/config/database";
import { getSurveyById } from "@src/entities/survey/dao";
import type { Survey } from "@src/entities/survey/schema";
import type { EditSurvey } from "../dto/edit";

export const updateSurvey = (props: EditSurvey) => {
  try {
    const { id } = props;
    const prev = getSurveyById(id);
    const next = { ...prev, ...props } as Survey;
    const {
      name,
      description,
      context,
      areas,
      positions,
      questions,
      hash,
      createdAt,
    } = next;
    const query = db.prepare(`
      UPDATE Survey
      SET
        name = $name,
        description = $description,
        context = $context,
        areas = $areas,
        positions = $positions,
        questions = $questions,
        hash = $hash,
        createdAt = $createdAt
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
      $hash: hash ?? "",
      $createdAt: createdAt,
      $id: id,
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
