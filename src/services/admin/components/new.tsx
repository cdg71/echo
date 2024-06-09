import { appShell } from "@src/components/appShell";
import type { ValidationError } from "elysia";
import { editFormComponent } from "./editForm";

export interface Props {
  formData?: {
    id?: string;
    name?: string;
  };
  errorCode?: string;
  validationErrors?: Readonly<ValidationError>;
}

export const newSurveyComponent = async (props: Props) => {
  const editForm = editFormComponent(props);

  const content = <div class="w-full max-w-lg space-y-4">{editForm}</div>;

  return await appShell({
    content,
    navbar: { center: <h1 class="text-2xl font-bold">Nouveau sondage</h1> },
  });
};
