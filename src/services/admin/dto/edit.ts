import { type Static } from "@sinclair/typebox";
import { Survey } from "@src/entities/survey/schema";
import { Elysia, ValidationError, t } from "elysia";

export const EditSurvey = t.Optional(t.Omit(Survey, ["hash", "createdAt"]));
export type EditSurvey = Static<typeof EditSurvey>;
export const EditSurveyModel = new Elysia().model({
  EditSurvey,
});

export interface EditFormValidationError {
  errorCode?: string;
  validationErrors?: Readonly<ValidationError>;
}
export type EditFormProps = Partial<EditSurvey & EditFormValidationError>;
