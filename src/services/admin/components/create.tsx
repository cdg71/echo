import { appShell } from "@src/components/appShell";
import { fieldHasError } from "@src/utils/fieldHasErrors";
import { loadHeroIcons } from "@src/utils/loadHeroIcons";
import type { ValidationError } from "elysia";

export interface Props {
  formData?: {
    id?: string;
    name?: string;
    description?: string;
  };
  errorCode?: string;
  validationErrors?: Readonly<ValidationError>;
}

export const createSurveyComponent = async (props: Props) => {
  const { formData, errorCode, validationErrors } = props;
  const isError = !!errorCode;

  const errorIcon = await loadHeroIcons({
    iconName: "exclamation-triangle",
  });

  const dismissIcon = await loadHeroIcons({
    iconName: "x-mark",
    className: "size-6",
  });
  const content = (
    <div class="w-full max-w-lg space-y-4">
      <div
        id="dismiss"
        role="alert"
        class={`relative alert alert-error ${!isError ? "hidden" : ""}`}
      >
        <button
          class="absolute top-0 right-0 p-2 text-gray-600 hover:text-gray-800"
          hx-get="/empty"
          hx-swap="delete"
          hx-target="#dismiss"
        >
          {dismissIcon}
        </button>
        <span class="prose">
          <strong>{errorIcon} Échec de la création du sondage.</strong>
          <br />
          <em>Astuce : le code du sondage doit être unique.</em>
        </span>
      </div>
      <form
        class="space-y-4"
        hx-post="/admin/create"
        hx-boost="true"
        hx-target="body"
        hx-push-url="true"
      >
        <label class="form-control">
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Nom du sondage *"
            class={`input input-bordered ${fieldHasError({ fieldName: "name", validationErrors })}`}
            value={formData?.name}
            required
          />
        </label>
        <label class="form-control">
          <input
            id="id"
            name="id"
            type="text"
            placeholder="Code du sondage *"
            class={`input input-bordered ${fieldHasError({ fieldName: "id", validationErrors })}`}
            value={formData?.id}
            required
          />
          <div class="label pt-0">
            <span class="label-text-alt">
              Uniquement des lettres en minuscule, des chiffres et des tirets
              "-"
            </span>
          </div>
        </label>
        <div class=" space-x-2">
          <button type="submit" class="btn btn-primary">
            Créer un sondage
          </button>
          <button
            type="reset"
            class="btn btn-outline btn-neutral"
            hx-get="/new"
            hx-boost="true"
            hx-push-url="false"
          >
            Effacer
          </button>
        </div>
      </form>
    </div>
  );
  return await appShell({
    content,
    navbar: { center: <h1 class="text-2xl font-bold">Nouveau sondage</h1> },
  });
};
