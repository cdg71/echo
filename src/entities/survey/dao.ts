import { db } from "@src/config/database";
import { Survey } from "@src/entities/survey/schema";

// Get a survey by id
export const getSurveyById = (id: string) => {
  try {
    const selectQuery = db.prepare("SELECT * FROM Survey WHERE id = $id");
    const survey = selectQuery.get({ $id: id }) as Survey;
    selectQuery.finalize();
    return survey;
  } catch (error) {
    throw new Error("Cannot get survey by id.");
  }
};

// Get a survey hash by id
export const getHashById = (id: string) => {
  try {
    const selectQuery = db.query("SELECT hash FROM Survey WHERE id = $id");
    const survey = selectQuery.get({ $id: id }) as Survey;
    selectQuery.finalize();
    return survey.hash;
  } catch (error) {
    throw new Error("Cannot get hash by survey id.");
  }
};

// // Update a survey
// export const updateSurvey = (survey: Survey) => {
//   const { id, name, description, securityCode, created, updated } = survey;
//   db.run(
//     `UPDATE Survey SET name = ?, description = ?, securityCode = ?, created = ?, updated = ? WHERE id = ?`,
//     [name, description, securityCode, created, updated, id]
//   );
// };

// // Delete a survey
// export const deleteSurvey = (id: string) => {
//   db.run(`DELETE FROM Survey WHERE id = ?`, [id]);
// };
