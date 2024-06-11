import { Type, type Static } from "@sinclair/typebox";
import { Survey } from "@src/entities/survey/schema";
import { Elysia, ValidationError } from "elysia";

export const EditSurvey = Type.Optional(
  Type.Pick(Survey, ["id", "name", "settings"])
);
export type EditSurvey = Static<typeof EditSurvey>;
export const EditSurveyModel = new Elysia().model({
  EditSurvey,
});

export interface EditFormValidationError {
  errorCode?: string;
  validationErrors?: Readonly<ValidationError>;
}
export type EditFormProps = Partial<EditSurvey & EditFormValidationError>;
