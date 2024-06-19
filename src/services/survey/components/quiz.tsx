import type { Profile } from "@src/entities/profile/schema";
import type {
  AnswerKey,
  AnswerPropKey,
  Response,
} from "@src/entities/response/schema";
import type { ParsedSurvey } from "@src/entities/survey/dto/parsedSurvey";
import { loadHeroIcons } from "@src/utils/loadHeroIcons";

const questionComponent = (props: {
  question: string[];
  answers?: Record<AnswerPropKey, string>;
}) => {
  const { question, answers } = props;
  const valueId = `answer;${question[0]};value` as AnswerKey;
  const commentId = `answer;${question[0]};comment` as AnswerKey;
  return (
    <label class="form-control space-y-1 bg-slate-50 rounded-lg p-2">
      <span class="label-text text-base">{question[1]}</span>
      <select
        id={valueId}
        name={valueId}
        class="select select-bordered w-full"
        required
      >
        <option value="" disabled selected={!answers?.value}>
          Mon sentiment
        </option>
        <option
          value="Enthousiasme"
          selected={answers?.value === "Enthousiasme"}
        >
          Enthousiasme
        </option>
        <option value="Confiance" selected={answers?.value === "Confiance"}>
          Confiance
        </option>
        <option value="Prudence" selected={answers?.value === "Prudence"}>
          Prudence
        </option>
        <option value="Inquiétude" selected={answers?.value === "Inquiétude"}>
          Inquiétude
        </option>
      </select>
      <textarea
        id={commentId}
        name={commentId}
        class="textarea textarea-bordered"
        placeholder="Commentaire ..."
      >
        {answers?.comment ?? ""}
      </textarea>
    </label>
  );
};

interface ResponseFormProps {
  survey: ParsedSurvey;
  profile: Profile;
  response?: Response;
}
const responseForm = async (props: ResponseFormProps) => {
  const { survey, profile, response } = props;

  const formContent = (
    <>
      <input type="hidden" id="surveyId" name="surveyId" value={survey.id} />
      <input type="hidden" id="profileId" name="profileId" value={profile.id} />
      {survey.questions?.map((question) => {
        const questionId = question[0];
        return questionComponent({
          question,
          answers: response?.answers?.[questionId],
        });
      })}
      <div class="space-x-2">
        <button type="submit" class="btn btn-primary">
          Enregistrer
        </button>
      </div>
    </>
  );

  return (
    <div class="collapse collapse-open bg-slate-100">
      <div class="prose p-4">
        <p class="w-full text-justify">
          Pour chacune des affirmations ci-dessous, sélectionnez le sentiment
          qu'elle vous inspire, puis saisissez un commentaire qui illustre et/ou
          explique votre sentiment.
        </p>
      </div>
      <div class="collapse-content">
        {response ? (
          <form
            class="space-y-4"
            hx-put={`/${survey.id}/fragment/response/${response?.id}`}
            hx-target="#appshellContent"
          >
            {formContent}
          </form>
        ) : (
          <form
            class="space-y-4"
            hx-post={`/${survey.id}/fragment/response`}
            hx-target="#appshellContent"
          >
            {formContent}
          </form>
        )}
      </div>
    </div>
  );
};

const alertComponent = async (props: Pick<QuizComponentProps, "status">) => {
  const { status } = props;
  const dismissIcon = await loadHeroIcons({
    iconName: "x-mark",
    className: "size-6",
  });
  return (
    <div class={`${!status ? "hidden" : ""}`}>
      <div
        id="alert"
        role="alert"
        class={`flex flex-row alert ${status === "error" ? "alert-error" : "alert-success"} mb-4`}
        hx-get="/empty"
        hx-trigger="load delay:2s"
        hx-swap="outerHTML"
      >
        <div class={`flex-grow prose ${status === "error" ? "hidden" : ""}`}>
          <strong>Votre réponse a été enregistrée avec succès.</strong>
        </div>
        <div class={`flex-grow prose ${status === "success" ? "hidden" : ""}`}>
          <strong>L'enregistrement de votre réponse a échoué.</strong>
        </div>
        <button
          class="text-gray-600 hover:text-gray-800"
          hx-get="/empty"
          hx-swap="delete"
          hx-target="#alert"
        >
          {dismissIcon}
        </button>
      </div>
    </div>
  );
};

interface QuizComponentProps {
  survey: ParsedSurvey;
  profile: Profile;
  responses: Response[];
  status?: "success" | "error";
}
export const quizComponent = async (props: QuizComponentProps) => {
  const { survey, profile, status, responses } = props;

  return (
    <div class="w-full max-w-lg space-y-4 pt-5">
      <div class="prose">
        <h2 class="text-center">Quiz</h2>
      </div>
      {await alertComponent({ status })}
      <div class="w-full space-y-4">
        {responses?.length > 0
          ? responses.map(
              async (response) =>
                await responseForm({ survey, profile, response })
            )
          : await responseForm({ survey, profile })}
      </div>
    </div>
  );
};
