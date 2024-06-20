import { Elysia, redirect, t } from "elysia";

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
  .get(
    "/cloud/:surveyId",
    ({ params, query }) => {
      const { surveyId } = params;
      const { snapshot, area, position } = query;
      const areaQuery = area ? `&area=${area}` : "";
      const positionQuery = position ? `&position=${position}` : "";
      const url = `${import.meta.env.CLOUD_ENDPOINT_URL}/${surveyId}?snapshot=${snapshot}${positionQuery}${areaQuery}`;
      console.log(url);
      return redirect(url);
    },
    {
      params: t.Object({
        surveyId: t.String(),
      }),
      query: t.Object({
        snapshot: t.String(),
        area: t.Optional(t.String()),
        position: t.Optional(t.String()),
      }),
    }
  );
