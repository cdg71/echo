import { htmlTemplate } from "@src/components/htmlTemplate";

interface Props {
  content: JSX.Element;
}

const defaultProps = {
  content: <></>,
};

export const homepageLayoutComponent = (props?: Props) => {
  const { content } = { ...defaultProps, ...props };
  const layout = (
    <div class="hero min-h-screen bg-base-100 flex flex-col justify-center items-center">
      <div class="hero-content w-full max-w-xl text-center flex flex-col sm:flex-row items-center">
        <div class="flex flex-col items-center space-y-2 space-x-3">
          <img src="/static/images/cdg-logo.svg" alt="Logo" class="w-4/5" />
          <h1 class="text-5xl font-bold tracking-wider w-full">écho</h1>
          <p class="text-base">
            Outil d'analyse du sentiment <br class="md:hidden" />
            assisté par l'intelligence artificielle.
          </p>
        </div>
        <div class="card w-full shadow-2xl bg-base-200">{content}</div>
      </div>
    </div>
  );
  return htmlTemplate({
    content: layout,
  });
};
