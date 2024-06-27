import { parseCsv } from "@src/utils/parseCsv";
import Elysia, { getSchemaValidator, t, type Static } from "elysia";
import { AnswerPropKey, Response } from "../schema";
import type { Answers } from "./answers";
import type { CreateResponse } from "./create";

const AnswerKey = t.TemplateLiteral("answer;${string};${value|comment}");
type AnswerKey = typeof AnswerKey.static;

export const responseForm = t.Intersect([
  t.Pick(Response, ["surveyId", "profileId"]),
  t.Record(AnswerKey, t.String()),
]);
export type responseForm = Static<typeof responseForm>;
export const CreateResponseFormModel = new Elysia().model({
  CreateResponseForm: responseForm,
});
export const validateResponseForm = getSchemaValidator(responseForm);

export const convertFormToResponse = (props: {
  responseForm: responseForm;
}): CreateResponse => {
  const { surveyId, profileId, ...responseFields } = props.responseForm;
  const answers: Partial<Answers> = {};

  // Iterate over the keys in the original object
  for (const key in responseFields) {
    if (
      key !== "surveyId" &&
      key !== "profileId" &&
      Object.prototype.hasOwnProperty.call(responseFields, key)
    ) {
      const [parsedKey] = parseCsv(key);
      const questionId = parsedKey[1] as AnswerKey;
      const propName = parsedKey[2] as AnswerPropKey;
      answers[questionId] = answers[questionId] ?? { value: "", comment: "" };
      answers[questionId]![propName] = responseFields[key as AnswerKey];
    }
  }
  return {
    surveyId,
    profileId,
    answers: answers as Answers,
  };
};
