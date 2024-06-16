import { db } from "@src/config/database";
import type { ResponseSurveyProfile } from "../dto/surveyProfile";

export const allBySurveyProfile = (props: ResponseSurveyProfile) => {
  try {
    const { surveyId, profileId } = props;
    const selectQuery = db.prepare(
      "SELECT * FROM Response WHERE surveyId = $surveyId AND surveyId = $surveyId AND profileId = $profileId ORDER BY createdAt ASC"
    );
    const response = selectQuery.all({
      $surveyId: surveyId,
      $profileId: profileId,
    }) as Response[];
    selectQuery.finalize();
    return response;
  } catch (error) {
    throw new Error("Cannot get all responses by survey profile.");
  }
};
