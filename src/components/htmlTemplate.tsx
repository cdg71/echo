interface Props {
  content?: JSX.Element;
}
const defaultProps: Props = {
  content: <></>,
};

export const htmlTemplate = (props: Props) => {
  const { content } = { ...defaultProps, ...props };
  return (
    <html data-theme="winter" lang="fr">
      <head>
        <title>écho</title>
        <meta charset="UTF-8" />
        <meta
          name="description"
          content="Outil d'analyse du sentiment assisté par l'intelligence artificielle."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/public/images/apple-touch-icon.png"
        />
        <meta name="apple-mobile-web-app-title" content="Echo" />
        <meta name="application-name" content="Echo" />
        <meta name="msapplication-TileColor" content="#da532c" />
        <meta name="theme-color" content="#ffffff" />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/public/images/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/public/images/favicon-16x16.png"
        />
        <link rel="manifest" href="/public/site.webmanifest" />
        <link rel="mask-icon" href="/public/images/safari-pinned-tab.svg" />
        <link
          href="/public/styles/globals.css"
          rel="stylesheet"
          type="text/css"
        />
      </head>
      <body>{content}</body>
      <script src="/public/scripts/htmx.js"></script>
      <script src="/public/scripts/sse.js"></script>
    </html>
  );
};
