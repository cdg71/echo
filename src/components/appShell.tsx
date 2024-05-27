import { heroIconsLoader } from "@src/libs/heroIconsLoader";
import { htmlTemplate } from "./htmlTemplate";

interface Props {
  title?: string;
  content?: JSX.Element;
}
const defaultProps: Props = {
  title: "Echo",
  content: <></>,
};

const arrowLeftIcon = heroIconsLoader({
  iconName: "arrow-left",
});

export const appShell = (props: Props) => {
  const { title, content } = { ...defaultProps, ...props };

  const shell = (
    <div class="min-h-screen flex justify-center bg-base-100">
      <div class="w-11/12 lg:w-10/12 xl:w-8/12 bg-base-100">
        <nav class="navbar border-b bg-base-100">
          <div class="navbar-start">
            <a
              class="btn btn-ghost btn-circle primary-content"
              hx-boost="true"
              href="/"
            >
              {arrowLeftIcon}
            </a>
          </div>
          <div class="navbar-center">
            <h1 class="text-2xl font-bold">&nbsp;{title}</h1>
          </div>
          <div class="navbar-end"></div>
        </nav>
        <div class="flex justify-center pt-6">{content}</div>
      </div>
    </div>
  );

  return htmlTemplate({
    content: shell,
  });
};
