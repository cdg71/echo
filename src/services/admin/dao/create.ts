import { db } from "@src/config/database";
import { getSurveyById } from "@src/entities/survey/dao";
import { isCreateSurveyDTO } from "@src/services/admin/dto/create";
import { createCredential } from "@src/utils/credentialManagement";
import { getStaticType } from "@src/utils/getStaticType";

// Create a new survey
export const createSurvey = async (createSurveyDTO: unknown) => {
  if (!isCreateSurveyDTO(createSurveyDTO)) {
    throw new Error("Invalid data for survey creation");
  }
  const createSurveyStaticType = getStaticType(createSurveyDTO);
  const { id, name } = createSurveyStaticType;

  const query = db.prepare(
    "INSERT INTO Survey (id, name, hash, createdAt) VALUES ($id, $name, $hash, $createdAt);"
  );
  const now = Date.now();
  const credential = await createCredential();
  query.run({
    $id: id,
    $name: name,
    $hash: credential.hash,
    $createdAt: now,
  });
  query.finalize();
  const survey = getSurveyById(id);
  return {
    survey,
    password: credential.password,
  };
};
