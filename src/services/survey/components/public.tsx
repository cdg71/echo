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
              hx-get={`/${survey.id}/fragment/profile`}
              hx-target="#appshellContent"
            >
              {profileIcon}
            </a>
          </li>
          <li>
            <a
              hx-get={`/${survey.id}/fragment/quiz`}
              hx-target="#appshellContent"
            >
              {quizIcon}
            </a>
          </li>
          <li>
            <a
              hx-get={`/${survey.id}/fragment/result`}
              hx-target="#appshellContent"
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
