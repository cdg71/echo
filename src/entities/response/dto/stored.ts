import Elysia, { t } from "elysia";
import { Response } from "../schema";
import type { Answers } from "./answers";

export const StoredResponse = t.Object({
  id: t.String(),
  surveyId: t.String(),
  profileId: t.String(),
  answersJson: t.String(),
  createdAt: t.Number(),
});
export type StoredResponse = typeof StoredResponse.static;
export const StoredResponseModel = new Elysia().model({ StoredResponse });

export const convertFromStoredResponse = (props: {
  storedResponse: StoredResponse;
}): Response => {
  const { storedResponse } = props;
  return {
    id: storedResponse.id,
    surveyId: storedResponse.surveyId,
    profileId: storedResponse.profileId,
    answers: JSON.parse(storedResponse.answersJson) as Answers,
    createdAt: storedResponse.createdAt,
  };
};

export const convertToStoredResponse = (props: {
  response: Response;
}): StoredResponse => {
  const { response } = props;
  return {
    id: response.id,
    surveyId: response.surveyId,
    profileId: response.profileId,
    answersJson: JSON.stringify(response.answers),
    createdAt: response.createdAt,
  };
};
