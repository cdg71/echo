import { db } from "@src/config/database";
import { convertFromStoredResponse, type StoredResponse } from "../dto/stored";
import type { ResponseSurveyProfile } from "../dto/surveyProfile";
import type { Response } from "../schema";

export const allBySurveyProfile = (
  props: ResponseSurveyProfile
): Response[] => {
  try {
    const { surveyId, profileId } = props;
    const query = db.prepare(
      "SELECT * FROM Response WHERE surveyId = $surveyId AND profileId = $profileId ORDER BY createdAt ASC"
    );
    const storedResponses = query.all({
      $surveyId: surveyId,
      $profileId: profileId,
    }) as StoredResponse[];
    query.finalize();
    const responses = storedResponses.map((storedResponse) =>
      convertFromStoredResponse({ storedResponse })
    );
    return responses;
  } catch (error) {
    throw new Error("Cannot get all responses by survey profile.");
  }
};
