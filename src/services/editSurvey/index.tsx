import { Elysia } from "elysia";
import { appShell } from "@src/components/appShell";

interface Props {
  surveyId?: string;
  adminToken?: string;
}

const editSurveyComponent = (props: Props) => {
  const createNewSurvey = props.adminToken ? true : false;
  const title = createNewSurvey ? props.surveyId : "Nouveau sondage";
  const content = (
    <form class="w-full max-w-lg space-y-4">
      <label class="form-control">
        <input
          type="text"
          placeholder="Nom du sondage"
          class="input input-bordered"
        />
      </label>
      <label class="form-control">
        <input
          type="text"
          placeholder="Code du sondage"
          class="input input-bordered"
        />
        <div class="label pt-0">
          <span class="label-text-alt">
            Uniquement des lettres, des chiffres et des tirets "-"
          </span>
        </div>
      </label>
      <label class="form-control">
        <textarea
          class="textarea textarea-bordered h-36"
          placeholder="Description du sondage"
        ></textarea>
      </label>
      <button
        hx-get="/create"
        hx-trigger="click"
        hx-swap="none"
        class="btn btn-primary"
      >
        Créer un sondage
      </button>
    </form>
  );
  return appShell({ title, content });
};

export const editSurveyService = new Elysia().get("/new", () => {
  return editSurveyComponent({});
  // .get("/:surveyId/:adminToken", ({ params: {surveyId, adminToken} }) => {
  //   return htmlTemplate({
  //     content: editSurveyComponent({ surveyId, adminToken }),
  //   });
});
