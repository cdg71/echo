import jwt from "@elysiajs/jwt";
import { jwtSecret } from "@src/config/jwtSecret";
import { getSurveyById } from "@src/entities/survey/dao/getById";
import { AuthJwt, AuthModel } from "@src/entities/survey/dto/auth";
import { SurveyId } from "@src/entities/survey/dto/id";
import { Elysia } from "elysia";
import { gotoSurveyComponent } from "../homepage/components/gotoSurvey";
import { homepageLayoutComponent } from "../homepage/components/layout";
import { homeComponent } from "./components/home";
import { noDataComponent } from "./components/noData";
import { publicComponent } from "./components/public";

export const surveyService = new Elysia()
  .use(
    jwt({
      name: "authJwt",
      secret: jwtSecret,
      exp: "1d",
      schema: AuthJwt,
    })
  )
  .use(AuthModel)
  .get(
    "/survey",
    ({ set, query }) => {
      set.headers["HX-Push-Url"] = `/${query.id}`;
      set.headers["HX-Redirect"] = `/${query.id}`;
    },
    {
      query: SurveyId,
      error: ({ set }) => {
        set.headers["Content-Type"] = "text/html; charset=utf8";
        set.headers["HX-Replace-Url"] = `/`;
        return homepageLayoutComponent({
          content: gotoSurveyComponent(),
        });
      },
    }
  )
  .get(
    "/:id",
    ({ params, set }) => {
      try {
        const { id } = params;
        const survey = getSurveyById({ id });

        const content = homeComponent({ survey });
        return publicComponent({ survey, content });
      } catch (error) {
        set.headers["HX-Replace-Url"] = `/`;
        return homepageLayoutComponent({
          content: gotoSurveyComponent({ id: params.id }),
        });
      }
    },
    {
      params: SurveyId,
      error: ({ set }) => {
        set.headers["Content-Type"] = "text/html; charset=utf8";
        set.headers["HX-Replace-Url"] = `/`;
        return homepageLayoutComponent({
          content: gotoSurveyComponent(),
        });
      },
    }
  )
  .get(
    "/:id/profile",
    ({ params, set }) => {
      try {
        const { id } = params;
        const survey = getSurveyById({ id });

        return publicComponent({
          survey,
          content: noDataComponent({ survey }),
        });
      } catch (error) {
        set.headers["HX-Replace-Url"] = `/`;
        return homepageLayoutComponent({
          content: gotoSurveyComponent({ id: params.id }),
        });
      }
    },
    {
      params: SurveyId,
      error: ({ set }) => {
        set.headers["Content-Type"] = "text/html; charset=utf8";
        set.headers["HX-Replace-Url"] = `/`;
        return homepageLayoutComponent({
          content: gotoSurveyComponent(),
        });
      },
    }
  )
  .get(
    "/:id/quiz",
    ({ params, set }) => {
      try {
        const { id } = params;
        const survey = getSurveyById({ id });

        return publicComponent({
          survey,
          content: noDataComponent({ survey }),
        });
      } catch (error) {
        set.headers["Content-Type"] = "text/html; charset=utf8";
        set.headers["HX-Replace-Url"] = `/`;
        return homepageLayoutComponent({
          content: gotoSurveyComponent({ id: params.id }),
        });
      }
    },
    {
      params: SurveyId,
      error: ({ set }) => {
        set.headers["Content-Type"] = "text/html; charset=utf8";
        set.headers["HX-Replace-Url"] = `/`;
        return homepageLayoutComponent({
          content: gotoSurveyComponent(),
        });
      },
    }
  )
  .get("/js/*", async ({ params }) => {
    const result = await fetch(
      `${import.meta.env.CLOUD_ENDPOINT_URL}/js/${params["*"]}`
    );
    return result;
  })
  .get("/output/*", async ({ params }) => {
    const result = await fetch(
      `${import.meta.env.CLOUD_ENDPOINT_URL}/output/${params["*"]}`
    );
    return result;
  })
  .get(
    "/:id/result",
    async ({ params, set }) => {
      try {
        // const { id } = params;
        // const survey = getSurveyById({ id });

        // return publicComponent({
        //   survey,
        //   content: noDataComponent({ survey }),
        // });
        const result = await fetch(import.meta.env.CLOUD_ENDPOINT_URL);
        return result;
      } catch (error) {
        set.headers["Content-Type"] = "text/html; charset=utf8";
        set.headers["HX-Replace-Url"] = `/`;
        return homepageLayoutComponent({
          content: gotoSurveyComponent({ id: params.id }),
        });
      }
    },
    {
      params: SurveyId,
      error: ({ set }) => {
        set.headers["Content-Type"] = "text/html; charset=utf8";
        set.headers["HX-Replace-Url"] = `/`;
        return homepageLayoutComponent({
          content: gotoSurveyComponent(),
        });
      },
    }
  );
