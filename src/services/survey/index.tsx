import { createProfile } from "@src/entities/profile/dao/create";
import { getProfileById } from "@src/entities/profile/dao/getById";
import { ProfilesCookie } from "@src/entities/profile/dto/profilesCookie";
import { getSurveyById } from "@src/entities/survey/dao/getById";
import { SurveyId } from "@src/entities/survey/dto/id";
import { Elysia, redirect } from "elysia";
import { gotoSurveyComponent } from "../homepage/components/gotoSurvey";
import { homepageLayoutComponent } from "../homepage/components/layout";
import { homeComponent } from "./components/home";
import { noDataComponent } from "./components/noData";
import { publicComponent } from "./components/public";

export const surveyService = new Elysia()
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
  .group("/:id", (app) =>
    app
      .guard({
        params: SurveyId,
        cookie: ProfilesCookie,
        beforeHandle: ({ params, cookie: { profiles } }) => {
          const { id: surveyId } = params;
          const profileId = profiles?.value?.[surveyId];

          let profile;

          if (profileId) {
            profile = getProfileById({ id: profileId });
          }

          if (!profile || profile.id !== profileId) {
            profile = createProfile({ surveyId });
            profiles.value = {
              ...profiles.value,
              [surveyId]: profile.id,
            };
          }
        },
        error: ({ set }) => {
          set.headers["Content-Type"] = "text/html; charset=utf8";
          set.headers["HX-Replace-Url"] = `/`;
          return redirect("/");
        },
      })
      .get("/", async ({ params }) => {
        const { id } = params;
        const survey = getSurveyById({ id });
        const content = await homeComponent({ survey });
        return await publicComponent({ survey, content });
      })
      .group("/fragment", (app) =>
        app
          .guard({
            beforeHandle: ({ request, set }) => {
              set.headers["Vary"] = "hx-request";
              if (!request.headers.get("hx-request")) {
                return redirect(`/`);
              }
            },
          })
          .get("/profile", async ({ params }) => {
            const { id } = params;
            const survey = getSurveyById({ id });
            return await noDataComponent({ survey });
          })
          .get("/quiz", async ({ params }) => {
            const { id } = params;
            const survey = getSurveyById({ id });
            return await noDataComponent({ survey });
          })
          .get("/result", async () => {
            const result = await fetch(import.meta.env.CLOUD_ENDPOINT_URL);
            return result;
          })
      )
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
  });
