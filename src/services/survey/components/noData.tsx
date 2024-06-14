import { htmlTemplate } from "@src/components/htmlTemplate";
import type { Survey } from "@src/entities/survey/schema";

interface Props {
  survey: Survey;
}

export const noDataComponent = (props: Props) =>
  htmlTemplate({
    content: (
      <div class="hero h-screen" style="height: calc(100vh - 8rem);">
        <div class="hero-content text-center">
          <a href={`/${props.survey.id}`}>
            <img
              class="mx-auto w-1/3"
              src="/static/images/no_data.svg"
              alt="Page not found"
            />
          </a>
        </div>
      </div>
    ),
  });
