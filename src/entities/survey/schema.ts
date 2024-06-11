import { Type, type Static } from "@sinclair/typebox";
import { Value } from "@sinclair/typebox/value";
import { notEmptyString, surveyCodeString } from "@src/utils/schemaPatterns";

export const Settings = Type.Object(
  {
    description: Type.String(),
    context: Type.String(),
    positions: Type.Array(Type.String()),
    areas: Type.Array(Type.String()),
  },
  {
    default: {
      description: "",
      context: "",
      positions: [""],
      areas: [""],
    },
  }
);
export type Settings = Static<typeof Settings>;
export const defaultSettings = Value.Create(Settings);
export const defaultJsonSettings = JSON.stringify(defaultSettings);
export const JsonSettings = Type.Transform(Type.String())
  .Decode((value) => {
    const res: unknown = JSON.parse(value);
    return res as Settings;
  })
  .Encode((value) => {
    if (Value.Check(Settings, value)) return JSON.stringify(value);
    return defaultJsonSettings;
  });
type JsonSettings = Static<typeof JsonSettings>;

export const Survey = Type.Object({
  id: Type.String({ pattern: surveyCodeString, default: "" }),
  name: Type.String({ pattern: notEmptyString, default: "" }),
  settings: Type.String({
    default: defaultJsonSettings,
  }),
  hash: Type.Optional(Type.String()),
  createdAt: Type.Number(),
});
export type Survey = Static<typeof Survey>;
