import { fieldHasError } from "@src/utils/fieldHasErrors";
import { loadHeroIcons } from "@src/utils/loadHeroIcons";
import type { ValidationError } from "elysia";
import type { EditSurvey } from "../dto/edit";

export interface EditFormValidationError {
  errorCode?: string;
  validationErrors?: Readonly<ValidationError>;
}
export type EditFormProps = Partial<EditSurvey & EditFormValidationError> & {
  action?: "create" | "update";
};

const defaultProps = {
  action: "create",
};

export const editFormComponent = async (props: EditFormProps) => {
  const {
    id,
    name,
    description,
    context,
    positions,
    areas,
    questions,
    errorCode,
    validationErrors,
    action,
  } = { ...defaultProps, ...props };
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
        hx-post={`/admin/${action}`}
        hx-boost="true"
        hx-target="body"
      >
        <label class="form-control">
          <span class="label-text">Code du sondage</span>
          <input
            id="id"
            name="id"
            type="text"
            class={`input ${fieldHasError({ fieldName: "id", validationErrors })}`}
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
          <span class="label-text">Nom du sondage</span>
          <input
            id="name"
            name="name"
            type="text"
            class={`input ${fieldHasError({ fieldName: "name", validationErrors })}`}
            value={name}
            required
          />
        </label>
        <label class="form-control">
          <span class="label-text">Description</span>
          <textarea
            id="description"
            name="description"
            class={`textarea ${fieldHasError({ fieldName: "description", validationErrors, type: "textarea" })}`}
          >
            {description}
          </textarea>
        </label>
        <label class="form-control">
          <span class="label-text">Contexte</span>
          <textarea
            id="context"
            name="context"
            class={`textarea ${fieldHasError({ fieldName: "context", validationErrors, type: "textarea" })}`}
          >
            {context}
          </textarea>
        </label>
        <label class="form-control">
          <span class="label-text">Rôles</span>
          <textarea
            id="positions"
            name="positions"
            class={`textarea ${fieldHasError({ fieldName: "positions", validationErrors, type: "textarea" })}`}
          >
            {positions}
          </textarea>
          <span class="label-text-alt">
            Liste séparée par des points-virgules ";"
          </span>
        </label>
        <label class="form-control">
          <span class="label-text">Localisations</span>
          <textarea
            id="areas"
            name="areas"
            class={`textarea ${fieldHasError({ fieldName: "areas", validationErrors, type: "textarea" })}`}
          >
            {areas}
          </textarea>
          <span class="label-text-alt">
            Liste séparée par des points-virgules ";"
          </span>
        </label>
        <label class="form-control">
          <span class="label-text">Questions</span>
          <textarea
            id="questions"
            name="questions"
            placeholder="code-1;libellé de question 1\ncode-2;libellé de question 2"
            class={`textarea ${fieldHasError({ fieldName: "questions", validationErrors, type: "textarea" })}`}
          >
            {questions}
          </textarea>
          <span class="label-text-alt">
            Une question par ligne. Code et libellé de question séparés par un
            point virgule";"
          </span>
        </label>
        <div class={`space-x-2 ${action === "update" ? "hidden" : ""}`}>
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
        <div class={`space-x-2 ${action === "create" ? "hidden" : ""}`}>
          <button type="submit" class="btn btn-primary">
            Modifier
          </button>
        </div>
      </form>
    </div>
  );
};
