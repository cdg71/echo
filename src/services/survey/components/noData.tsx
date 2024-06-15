import type { Survey } from "@src/entities/survey/schema";

interface Props {
  survey: Survey;
}

export const noDataComponent = (props: Props) => (
  <div class="hero max-h-screen pt-10 md:pt-20">
    <div class="hero-content text-center flex flex-col">
      <a href={`/${props.survey.id}`} hx-boost="true" class="mx-auto w-1/3">
        <img src="/static/images/no_data.svg" alt="No data" />
      </a>
      <div class="mx-auto text-center">
        Il n'y a pas de données à afficher ...
      </div>
    </div>
  </div>
);
