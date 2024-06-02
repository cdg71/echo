import { db } from "@src/config/database";
import { getSurveyById } from "@src/entities/survey/dao";
import type { Survey } from "@src/entities/survey/schema";
import { isCreateSurveyDTO } from "@src/services/admin/dto/create";
import { flattenTypebox } from "@src/utils/flattenTypebox";
import { createSecurityCode } from "@src/utils/securityCodeManagement";

// Create a new survey
export const createSurvey = async (createSurveyDTO: unknown) => {
  if (!isCreateSurveyDTO(createSurveyDTO)) {
    throw new Error("Invalid data for survey creation");
  }
  const flat = flattenTypebox(createSurveyDTO);
  const { id, name, description } = flat;

  const query = db.prepare(
    "INSERT INTO Survey (id, name, description, securityCode, created, updated) VALUES ($id, $name, $description, $securityCode, $created, $updated);"
  );
  const now = Date.now();
  const securityCode = await createSecurityCode();
  query.run({
    $id: id,
    $name: name,
    $description: description ? description : "",
    $securityCode: securityCode.hash,
    $created: now,
    $updated: now,
  });
  query.finalize();
  const res = getSurveyById(id);
  return {
    ...res,
    securityCode: securityCode.code,
  } as Survey;
};
