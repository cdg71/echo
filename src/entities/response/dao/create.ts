import { db } from "@src/config/database";
import { getResponseById } from "@src/entities/response/dao/getById";
import { randomUUID } from "crypto";
import dayjs from "dayjs";
import type { CreateResponse } from "../dto/create";

export const createResponse = (props: CreateResponse) => {
  try {
    const id = randomUUID() as string;
    const { surveyId, profileId, answers } = props;
    const answersJson = JSON.stringify(answers);
    const query = db.prepare(
      `INSERT INTO Response (id,  surveyId,  profileId, answersJson, createdAt)
       VALUES               ($id, $surveyId, $profileId, $answersJson, $createdAt);`
    );
    query.run({
      $id: id,
      $surveyId: surveyId,
      $profileId: profileId,
      $answersJson: answersJson,
      $createdAt: dayjs().unix(),
    });
    query.finalize();
    const Response = getResponseById({ id });
    return Response;
  } catch (error) {
    throw new Error("Cannot create response.");
  }
};
