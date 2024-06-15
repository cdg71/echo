import { db } from "@src/config/database";
import { getProfileById } from "@src/entities/profile/dao/getById";
import { randomUUID } from "crypto";
import dayjs from "dayjs";
import type { ProfileSurveyId } from "../dto/surveyId";

export const createProfile = (props: ProfileSurveyId) => {
  try {
    const id = randomUUID() as string;
    const { surveyId } = props;
    const query = db.prepare(
      `INSERT INTO Profile (id,  surveyId,  createdAt)
       VALUES               ($id, $surveyId, $createdAt);`
    );
    query.run({
      $id: id,
      $surveyId: surveyId,
      $createdAt: dayjs().unix(),
    });
    query.finalize();
    const profile = getProfileById({ id });
    return profile;
  } catch (error) {
    console.log(error);

    throw new Error("Cannot create profile.");
  }
};
