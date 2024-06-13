import { appShell } from "@src/components/appShell";
import type { EditFormProps } from "./editForm";
import { editFormComponent } from "./editForm";

export const newSurveyComponent = async (props: EditFormProps) => {
  const editForm = await editFormComponent(props);

  const content = <div class="w-full max-w-lg space-y-4">{editForm}</div>;

  return await appShell({
    content,
    navbar: { center: <h1 class="text-2xl font-bold">Nouveau sondage</h1> },
  });
};
