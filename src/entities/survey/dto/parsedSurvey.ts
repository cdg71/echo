import { type Static } from "@sinclair/typebox";
import { parseCsv } from "@src/utils/parseCsv";
import { surveyCodeString } from "@src/utils/schemaPatterns";
import { t } from "elysia";
import type { Survey } from "../schema";

export const ParsedSurvey = t.Object({
  id: t.String({ pattern: surveyCodeString, default: "" }),
  name: t.String(),
  description: t.String(),
  context: t.String(),
  positions: t.Optional(t.Array(t.String())),
  areas: t.Optional(t.Array(t.String())),
  questions: t.Optional(t.Array(t.Array(t.String()))),
  createdAt: t.Number(),
});
export type ParsedSurvey = Static<typeof ParsedSurvey>;

export const parseSurvey = (props: { survey: Survey }): ParsedSurvey => {
  const {
    positions: positionsCsv,
    areas: areasCsv,
    questions: questionsCsv,
  } = props.survey;
  const positions = parseCsv(positionsCsv)[0];
  const areas = parseCsv(areasCsv)[0];
  const questions = parseCsv(questionsCsv);
  return { ...props.survey, positions, areas, questions };
};
