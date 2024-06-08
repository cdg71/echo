import { db } from "@src/config/database";
import type { Survey } from "@src/entities/survey/schema";
import type { HashDTO } from "@src/services/admin/dto/auth";
import { getStaticType } from "@src/utils/getStaticType";

// Get a survey by id
export const getSurveyById = (id: string) => {
  const selectQuery = db.prepare("SELECT * FROM Survey WHERE id = $id");
  const res = selectQuery.get({ $id: id }) as Survey;
  selectQuery.finalize();
  delete res["hash"];
  return res;
};
// Get a survey by id
export const getHashById = (id: string) => {
  const selectQuery = db.query("SELECT hash FROM Survey WHERE id = $id");
  const res = selectQuery.get({ $id: id }) as HashDTO;
  selectQuery.finalize();
  const { hash } = getStaticType(res);
  return hash;
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
