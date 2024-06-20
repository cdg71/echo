import { Elysia, t } from "elysia";

const PostBody = t.Object(
  {
    snapshot: t.String(),
  },
  { additionalProperties: true }
);

export const cloudMockService = new Elysia()
  .post(
    "/cloud/:surveyId",
    ({ body }) => {
      const { snapshot } = body;
      const fetchWebhook = () => {
        void fetch(
          `${import.meta.env.CLOUD_ENDPOINT_URL}/webhook/complete/${snapshot}`,
          {
            method: "GET",
          }
        );
      };
      setTimeout(fetchWebhook, 5000);
      return { status: "OK" };
    },
    {
      body: PostBody,
    }
  )
  .get("/cloud/:surveyId", ({ query }) => {
    console.log(query);
    return query;
  });
