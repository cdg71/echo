import type { ValidationError } from "elysia";

interface Props {
  fieldName: string;
  validationErrors?: ValidationError;
}
export const fieldHasError = (props: Props) => {
  if (
    props.validationErrors?.all.find(
      (x: { path?: string }) => x.path === `/${props.fieldName}`
    ) ??
    false
  ) {
    return "input-error";
  } else {
    return "";
  }
};
