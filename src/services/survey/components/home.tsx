import { Survey } from "@src/entities/survey/schema";
import { loadHeroIcons } from "@src/utils/loadHeroIcons";
import { micromark } from "micromark";

interface Props {
  survey: Survey;
}

export const homeComponent = async (props: Props) => {
  const profileIcon = await loadHeroIcons({
    iconName: "user-circle",
    className: "size-6 md:size-8",
  });
  const quizIcon = await loadHeroIcons({
    iconName: "queue-list",
    className: "size-6 md:size-8",
  });
  const resultIcon = await loadHeroIcons({
    iconName: "chart-pie",
    className: "size-6 md:size-8",
  });
  const { survey } = props;
  return (
    <div class="hero max-h-screen">
      <div class="hero-content text-center">
        <div class="min-w-md prose prose-sm md:prose-base prose-img:mx-auto prose-img:w-3/5 prose-img:md:w-3/12 prose-img:lg:w-3/4">
          {micromark(survey.description)}
          <button
            class="btn btn-primary w-3/4 my-2"
            hx-get={`/${props.survey.id}/fragment/profile`}
            hx-target="#appshellContent"
          >
            {profileIcon}&nbsp;Mon profil
          </button>
          <br />
          <button
            class="btn btn-secondary w-3/4 my-2"
            hx-get={`/${props.survey.id}/fragment/quiz`}
            hx-target="#appshellContent"
          >
            {quizIcon}&nbsp;Répondre au sondage
          </button>
          <br />
          <button
            class="btn btn-accent w-3/4 my-2"
            hx-get={`/${props.survey.id}/fragment/result`}
            hx-target="#appshellContent"
          >
            {resultIcon}&nbsp;Résultats
          </button>
        </div>
      </div>
    </div>
  );
};
