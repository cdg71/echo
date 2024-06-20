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
          `${import.meta.env.LOCAL_ENDPOINT_URL}/webhook/complete/${snapshot}`,
          {
            method: "GET",
          }
        );
      };
      setTimeout(fetchWebhook, import.meta.env.LOAD_POLLING_SEC * 1500);
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
