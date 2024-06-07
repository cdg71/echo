import { loadHeroIcons } from "@src/utils/loadHeroIcons";
import type { RequiredNested } from "@src/utils/utilityTypes";
import { htmlTemplate } from "./htmlTemplate";

interface Props {
  navbar?: {
    start?: JSX.Element;
    center?: JSX.Element;
    end?: JSX.Element;
  };
  content: JSX.Element;
}

const getDefaultProps = async (): Promise<RequiredNested<Props>> => {
  const arrowLeftIcon = await loadHeroIcons({
    iconName: "arrow-left",
  });
  const defaultStart = () => (
    <div class="btn btn-ghost btn-circle">
      <a
        class="btn btn-ghost btn-circle primary-content"
        hx-boost="true"
        hx-swap="outerHTML"
        hx-target="body"
        hx-push-url="true"
        href="/"
      >
        {arrowLeftIcon}
      </a>
    </div>
  );
  return {
    navbar: {
      start: defaultStart(),
      center: <h1 class="text-2xl font-bold">Echo</h1>,
      end: <></>,
    },
    content: <></>,
  };
};

export const appShell = async (props?: Props) => {
  const defaultProps = await getDefaultProps();
  const { navbar, content } = {
    content: props?.content ? props.content : defaultProps.content,
    navbar: props?.navbar
      ? { ...defaultProps.navbar, ...props.navbar }
      : defaultProps.navbar,
  };
  const shell = (
    <div class="min-h-screen flex justify-center bg-base-100">
      <div class="w-11/12 lg:w-10/12 xl:w-8/12 bg-base-100">
        <nav class="navbar fixed top-0 left-0 right-0 w-full lg:w-10/12 xl:w-8/12 mx-auto border-b bg-base-100 z-10">
          <div class="navbar-start">{navbar.start}</div>
          <div class="navbar-center">{navbar.center}</div>
          <div class="navbar-end">{navbar.end}</div>
        </nav>
        <div class="flex justify-center pt-20">{content}</div>
      </div>
    </div>
  );

  return htmlTemplate({
    content: shell,
  });
};
