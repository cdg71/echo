import { db } from "@src/config/database";
import { Profile } from "@src/entities/profile/schema";

export const allProfilesBySurveyId = (props: Pick<Profile, "surveyId">) => {
  try {
    const selectQuery = db.prepare(
      "SELECT * FROM Profile WHERE surveyId = $surveyId"
    );
    const profile = selectQuery.all({
      $surveyId: props.surveyId,
    }) as Profile[];
    selectQuery.finalize();
    return profile;
  } catch (error) {
    throw new Error("Cannot list profiles by surveyId.");
  }
};
