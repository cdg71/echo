import { Survey } from "@src/entities/survey/schema";
import { loadHeroIcons } from "@src/utils/loadHeroIcons";
import { micromark } from "micromark";

interface Props {
  survey: Survey;
}

export const homeComponent = (props: Props) => {
  const profileIcon = loadHeroIcons({
    iconName: "user-circle",
    className: "size-6 md:size-8",
  });
  const quizIcon = loadHeroIcons({
    iconName: "queue-list",
    className: "size-6 md:size-8",
  });
  const resultIcon = loadHeroIcons({
    iconName: "chart-pie",
    className: "size-6 md:size-8",
  });
  const { survey } = props;
  return (
    <div class="hero max-h-screen">
      <div class="hero-content text-center w-">
        <div class="max-w-md prose prose-sm md:prose-base prose-img:mx-auto prose-img:w-3/5 prose-img:md:w-1/2 prose-img:lg:w-3/4">
          {micromark(survey.description)}
          <button class="btn btn-primary w-3/4 my-2">
            {profileIcon}&nbsp;Mon profil
          </button>
          <br />
          <button class="btn btn-secondary w-3/4 my-2">
            {quizIcon}&nbsp;Répondre au quiz
          </button>
          <br />
          <button class="btn btn-accent w-3/4 my-2">
            {resultIcon}&nbsp;Résultats
          </button>
        </div>
      </div>
    </div>
  );
};
