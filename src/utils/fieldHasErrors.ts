import type { ValidationError } from "elysia";

interface Props {
  fieldName: string;
  validationErrors?: ValidationError;
  type?: "input" | "textarea";
}

const defaultProps = {
  type: "input",
};

export const fieldHasError = (props: Props) => {
  const { fieldName, validationErrors, type } = { ...defaultProps, ...props };
  if (
    validationErrors?.all.find(
      (x: { path?: string }) => x.path === `/${fieldName}`
    ) ??
    false
  ) {
    return type === "input" ? "input-error" : "textarea-error";
  } else {
    return type === "input" ? "input-bordered" : "textarea-bordered";
  }
};
