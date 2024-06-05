import { loadHeroIcons } from "@src/utils/loadHeroIcons";
import type { RequiredNested } from "@src/utils/utilityTypes";
import { htmlTemplate } from "./htmlTemplate";

type Position = "start" | "center" | "end";
type Layout = "mobile" | "desktop";

interface Props {
  title?: {
    name?: string;
    mobilePosition?: Position;
    desktopPosition?: Position;
  };
  menu?: {
    mobile?: JSX.Element;
    desktop?: JSX.Element;
    mobilePosition?: Position;
    desktopPosition?: Position;
  };
  content: JSX.Element;
}

const mobileClass = "lg:hidden";
const desktopClass = "hidden lg:inline";

const getDefaultProps = async (): Promise<RequiredNested<Props>> => {
  const arrowLeftIcon = await loadHeroIcons({
    iconName: "arrow-left",
  });
  const defaultMenu = (layout: Layout) => (
    <div
      class={`btn btn-ghost btn-circle ${layout === "mobile" ? mobileClass : desktopClass}`}
    >
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
    title: {
      name: "Echo",
      mobilePosition: "center",
      desktopPosition: "center",
    },
    menu: {
      mobile: defaultMenu("mobile"),
      desktop: defaultMenu("desktop"),
      mobilePosition: "start",
      desktopPosition: "start",
    },
    content: <></>,
  };
};

export const appShell = async (props?: Props) => {
  const defaultProps = await getDefaultProps();
  const { title, menu, content } = {
    content: props?.content ? props.content : defaultProps.content,
    title: props?.title
      ? { ...defaultProps.title, ...props.title }
      : defaultProps.title,
    menu: props?.menu
      ? { ...defaultProps.menu, ...props.menu }
      : defaultProps.menu,
  };
  const getTitle = (layout: Layout) => (
    <h1
      class={`text-2xl font-bold ${layout === "mobile" ? mobileClass : desktopClass}`}
    >
      &nbsp;{title.name}
    </h1>
  );
  const shell = (
    <div class="min-h-screen flex justify-center bg-base-100">
      <div class="w-11/12 lg:w-10/12 xl:w-8/12 bg-base-100">
        <nav class="navbar fixed top-0 left-0 right-0 w-full lg:w-10/12 xl:w-8/12 mx-auto border-b bg-base-100 z-10">
          <div class="navbar-start">
            {menu.mobilePosition === "start" ? menu.mobile : null}
            {title.mobilePosition === "start" ? getTitle("mobile") : null}
            {menu.desktopPosition === "start" ? menu.desktop : null}
            {title.desktopPosition === "start" ? getTitle("desktop") : null}
          </div>
          <div class="navbar-center">
            {menu.mobilePosition === "center" ? menu.mobile : null}
            {title.mobilePosition === "center" ? getTitle("mobile") : null}
            {menu.desktopPosition === "center" ? menu.desktop : null}
            {title.desktopPosition === "center" ? getTitle("desktop") : null}
          </div>
          <div class="navbar-end">
            {menu.mobilePosition === "end" ? menu.mobile : null}
            {title.mobilePosition === "end" ? getTitle("mobile") : null}
            {menu.desktopPosition === "end" ? menu.desktop : null}
            {title.desktopPosition === "end" ? getTitle("desktop") : null}
          </div>
        </nav>
        <div class="flex justify-center pt-20">{content}</div>
      </div>
    </div>
  );

  return htmlTemplate({
    content: shell,
  });
};
