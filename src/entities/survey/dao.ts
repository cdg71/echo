import { db } from "@src/config/database";
import type { Survey } from "@src/entities/survey/schema";

// Get a survey by id
export const getSurveyById = (id: string) => {
  const selectQuery = db.prepare("SELECT * FROM Survey WHERE id = $id");
  const res = selectQuery.get({ $id: id });
  selectQuery.finalize();
  return res as Survey;
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
