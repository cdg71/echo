import { appShell } from "@src/components/appShell";
import { Survey } from "@src/entities/survey/schema";
import { loadHeroIcons } from "@src/utils/loadHeroIcons";

interface Props {
  survey: Survey;
  content?: JSX.Element;
}

const defaultProps = {
  content: <></>,
};

export const publicComponent = (props: Props) => {
  const homeIcon = loadHeroIcons({
    iconName: "home",
    className: "size-4 sm:size-6 md:size-8",
  });
  const profileIcon = loadHeroIcons({
    iconName: "user-circle",
    className: "size-4 sm:size-6 md:size-8",
  });
  const quizIcon = loadHeroIcons({
    iconName: "queue-list",
    className: "size-4 sm:size-6 md:size-8",
  });
  const resultIcon = loadHeroIcons({
    iconName: "chart-pie",
    className: "size-4 sm:size-6 md:size-8",
  });
  const { survey, content } = { ...defaultProps, ...props };
  return appShell({
    navbar: {
      start: (
        <>
          <ul class="menu menu-sm md:menu-md lg:menu-lg menu-horizontal rounded-box">
            <li>
              <a href={`/${survey.id}`} hx-boost="true">
                {homeIcon}
              </a>
            </li>
          </ul>
          <h1 class="text-xs sm:text-base md:text-2xl font-bold">
            {survey.name}
          </h1>
        </>
      ),
      center: <></>,
      end: (
        <ul class="menu menu-sm md:menu-md lg:menu-lg menu-horizontal rounded-box">
          <li>
            <a
              href={`/${survey.id}/profile`}
              hx-boost="true"
              hx-push-url="false"
            >
              {profileIcon}
            </a>
          </li>
          <li>
            <a href={`/${survey.id}/quiz`} hx-boost="true" hx-push-url="false">
              {quizIcon}
            </a>
          </li>
          <li>
            <a
              hx-get={`/${survey.id}/result`}
              hx-boost="false"
              hx-target="#appshellContent"
              hx-push-url="false"
              hx-swap="innerHTML"
            >
              {resultIcon}
            </a>
          </li>
        </ul>
      ),
    },
    content,
  });
};
