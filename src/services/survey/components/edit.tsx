import { appShell } from "@src/components/appShell";
import { type ValidationError } from "elysia";

interface Props {
  surveyId?: string;
  adminToken?: string;
  formData?: {
    id?: string;
    name?: string;
    description?: string;
  };
  error?: Readonly<ValidationError>;
}

export const editSurveyComponent = (props: Props) => {
  const createNewSurvey = props.adminToken ? true : false;
  const title = createNewSurvey ? props.surveyId : "Nouveau sondage";
  const isError = (fieldName: string) =>
    props.error?.all.find((x) => x.path === `/${fieldName}`) ?? false
      ? "input-error"
      : "";
  const content = (
    <form
      class="w-full max-w-lg space-y-4"
      hx-post="/create"
      hx-boost="true"
      hx-target="body"
    >
      <label class="form-control">
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Nom du sondage *"
          class={`input input-bordered ${isError("name")}`}
          value={props.formData?.name}
        />
      </label>
      <label class="form-control">
        <input
          id="id"
          name="id"
          type="text"
          placeholder="Code du sondage *"
          class={`input input-bordered ${isError("id")}`}
          value={props.formData?.id}
        />
        <div class="label pt-0">
          <span class="label-text-alt">
            Uniquement des lettres en minuscule, des chiffres et des tirets "-"
          </span>
        </div>
      </label>
      <label class="form-control">
        <textarea
          id="description"
          name="description"
          class={`textarea textarea-bordered h-36 ${isError("name")}`}
          placeholder="Description du sondage"
        >
          {props.formData?.description}
        </textarea>
      </label>
      <button type="submit" class="btn btn-primary">
        Créer un sondage
      </button>
    </form>
  );
  return appShell({ title, content });
};
