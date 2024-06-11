import { fieldHasError } from "@src/utils/fieldHasErrors";
import { loadHeroIcons } from "@src/utils/loadHeroIcons";
import type { EditFormProps } from "../dto/edit";

export const editFormComponent = async (props: EditFormProps) => {
  const { id, name, settings, errorCode, validationErrors } = props;
  const isError = !!errorCode;

  const errorIcon = await loadHeroIcons({
    iconName: "exclamation-triangle",
  });
  const dismissIcon = await loadHeroIcons({
    iconName: "x-mark",
    className: "size-6",
  });

  return (
    <div hx-history="false">
      <div
        id="dismiss"
        role="alert"
        class={`relative alert alert-error mb-4 ${!isError ? "hidden" : ""}`}
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
            id="id"
            name="id"
            type="text"
            placeholder="code-du-sondage *"
            class={`input input-bordered ${fieldHasError({ fieldName: "id", validationErrors })}`}
            value={id}
            required
          />
          <div class="label pt-0">
            <span class="label-text-alt">
              Uniquement des lettres en minuscule, des chiffres et des tirets
              "-"
            </span>
          </div>
        </label>
        <label class="form-control">
          <input
            id="name"
            name="name"
            type="text"
            placeholder="Nom du sondage *"
            class={`input input-bordered ${fieldHasError({ fieldName: "name", validationErrors })}`}
            value={name}
            required
          />
        </label>
        <label class="form-control">
          <textarea
            id="settings"
            name="settings"
            placeholder={`{\n  "description": "...",\n  "context": "...",\n  "positions": ["..."],\n  "areas": ["..."]\n}`}
            class="textarea textarea-bordered h-48"
          >
            {settings}
          </textarea>
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
};
