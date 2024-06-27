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
      const surveyId =
        import.meta.env.NODE_ENV === "production" ? params.surveyId : "test";
      const snapshot =
        import.meta.env.NODE_ENV === "production"
          ? query.snapshot
          : "59134cf4-5e82-47bf-bcfa-1422b58e15f6";
      const { area, profile } = query;
      const areaQuery = area ? `&area=${area}` : "";
      const profileQuery = profile ? `&profile=${profile}` : "";
      const url = `${import.meta.env.CLOUD_ENDPOINT_URL}/${surveyId}?snapshot=${snapshot}${profileQuery}${areaQuery}`;
      return redirect(url);
    },
    {
      params: t.Object({
        surveyId: t.String(),
      }),
      query: t.Object({
        snapshot: t.String(),
        area: t.Optional(t.String()),
        profile: t.Optional(t.String()),
      }),
    }
  );
