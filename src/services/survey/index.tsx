import { createProfile } from "@src/entities/profile/dao/create";
import { getProfileById } from "@src/entities/profile/dao/getById";
import { updateProfile } from "@src/entities/profile/dao/update";
import { EditProfile } from "@src/entities/profile/dto/editProfile";
import { ProfilesCookie } from "@src/entities/profile/dto/profilesCookie";
import { allBySurveyProfile } from "@src/entities/response/dao/allBySurveyProfile";
import { createResponse } from "@src/entities/response/dao/create";
import { updateResponse } from "@src/entities/response/dao/update";
import { CreateResponse } from "@src/entities/response/dto/create";
import {
  convertFormToResponse,
  responseForm,
  validateResponseForm,
} from "@src/entities/response/dto/responseForm";
import { getSurveyById } from "@src/entities/survey/dao/getById";
import { SurveyId } from "@src/entities/survey/dto/id";
import { parseSurvey } from "@src/entities/survey/dto/parsedSurvey";
import { Elysia, redirect, t } from "elysia";
import { gotoSurveyComponent } from "../homepage/components/gotoSurvey";
import { homepageLayoutComponent } from "../homepage/components/layout";
import { homeComponent } from "./components/home";
import { profileComponent } from "./components/profile";
import { publicComponent } from "./components/public";
import { quizComponent } from "./components/quiz";
import { resultComponent } from "./components/result";
import { resultChartScript } from "./scripts/resultChart";

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
        error: ({ set, error }) => {
          console.log(error);
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
          .derive((props) => {
            const { body } = props;
            if (validateResponseForm.Check(body)) {
              const responseForm = body as responseForm;
              const responseBody = convertFormToResponse({
                responseForm,
              });
              return { ...props, body: responseBody };
            }
            return props;
          })
          .get("/profile", async ({ params, cookie: { profiles } }) => {
            const { id } = params;
            const profile = getProfileById({ id: profiles.value[id] });
            const survey = getSurveyById({ id });
            const parsedSurvey = parseSurvey({ survey });
            return await profileComponent({ parsedSurvey, profile });
          })
          .post(
            "/profile",
            async ({ body, params, cookie: { profiles } }) => {
              try {
                const { id } = params;
                const survey = getSurveyById({ id });
                const profile = updateProfile({
                  id: profiles.value[id],
                  ...body,
                });
                const parsedSurvey = parseSurvey({ survey });
                return await profileComponent({
                  parsedSurvey,
                  profile,
                  status: "success",
                });
              } catch (error) {
                const { id } = params;
                const survey = getSurveyById({ id });
                const profile = getProfileById({ id: profiles.value[id] });
                const parsedSurvey = parseSurvey({ survey });
                return await profileComponent({
                  parsedSurvey,
                  profile,
                  status: "error",
                });
              }
            },
            {
              body: EditProfile,
            }
          )
          .post(
            "/response",
            async ({ body, params, cookie: { profiles } }) => {
              try {
                const { id } = params;
                const survey = getSurveyById({ id });
                const parsedSurvey = parseSurvey({ survey });
                const profile = getProfileById({ id: profiles.value[id] });
                createResponse({
                  surveyId: id,
                  profileId: profile.id,
                  answers: body.answers,
                });
                const responses = allBySurveyProfile({
                  surveyId: survey.id,
                  profileId: profile.id,
                });
                return await quizComponent({
                  survey: parsedSurvey,
                  profile,
                  responses,
                  status: "success",
                });
              } catch (error) {
                const { id } = params;
                const survey = getSurveyById({ id });
                const parsedSurvey = parseSurvey({ survey });
                const profile = getProfileById({ id: profiles.value[id] });
                const responses = allBySurveyProfile({
                  surveyId: survey.id,
                  profileId: profile.id,
                });
                return await quizComponent({
                  survey: parsedSurvey,
                  profile,
                  responses,
                  status: "error",
                });
              }
            },
            {
              body: CreateResponse,
            }
          )
          .put(
            "/response/:responseId",
            async ({ body, params, cookie: { profiles } }) => {
              try {
                const { id, responseId } = params;
                updateResponse({
                  id: responseId,
                  answers: body.answers,
                });
                const survey = getSurveyById({ id });
                const parsedSurvey = parseSurvey({ survey });
                const profile = getProfileById({ id: profiles.value[id] });
                const responses = allBySurveyProfile({
                  surveyId: survey.id,
                  profileId: profile.id,
                });
                return await quizComponent({
                  survey: parsedSurvey,
                  profile,
                  responses,
                  status: "success",
                });
              } catch (error) {
                const { id } = params;
                const survey = getSurveyById({ id });
                const parsedSurvey = parseSurvey({ survey });
                const profile = getProfileById({ id: profiles.value[id] });
                const responses = allBySurveyProfile({
                  surveyId: survey.id,
                  profileId: profile.id,
                });
                return await quizComponent({
                  survey: parsedSurvey,
                  profile,
                  responses,
                  status: "error",
                });
              }
            },
            {
              body: CreateResponse,
              params: t.Object({
                id: t.String(),
                responseId: t.String(),
              }),
            }
          )
          .get("/quiz", async ({ params, cookie: { profiles } }) => {
            const { id } = params;
            const profile = getProfileById({
              id: profiles.value[id],
            });
            const survey = getSurveyById({ id });
            const parsedSurvey = parseSurvey({ survey });
            const responses = allBySurveyProfile({
              surveyId: survey.id,
              profileId: profile.id,
            });
            return await quizComponent({
              survey: parsedSurvey,
              profile,
              responses,
            });
          })
          .get("/result", ({ params }) => {
            const { id } = params;
            return resultComponent({ id });
          })
      )
      .get("/result/my-chart.js", ({ set }) => {
        set.headers["Content-Type"] = "text/javascript; charset=utf8";
        return resultChartScript();
      })
  );
