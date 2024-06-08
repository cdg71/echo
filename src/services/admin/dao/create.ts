import { db } from "@src/config/database";
import { getSurveyById } from "@src/entities/survey/dao";
import { isCreateSurveyDTO } from "@src/services/admin/dto/create";
import { getStaticType } from "@src/utils/getStaticType";

// Create a new survey
export const createSurvey = (props: {
  createSurveyDTO: unknown;
  hash: string;
}) => {
  if (!isCreateSurveyDTO(props.createSurveyDTO)) {
    throw new Error("Invalid data for survey creation");
  }
  const createSurveyStaticType = getStaticType(props.createSurveyDTO);
  const { id, name } = createSurveyStaticType;

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
  return survey;
};
