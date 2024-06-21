import { createProfile } from "@src/entities/profile/dao/create";
import { getProfileById } from "@src/entities/profile/dao/getById";
import { updateProfile } from "@src/entities/profile/dao/update";
import { EditProfile } from "@src/entities/profile/dto/editProfile";
import { ProfilesCookie } from "@src/entities/profile/dto/profilesCookie";
import { allResponsesBySurveyProfile } from "@src/entities/response/dao/allBySurveyProfile";
import { createResponse } from "@src/entities/response/dao/create";
import { updateResponse } from "@src/entities/response/dao/update";
import { CreateResponse } from "@src/entities/response/dto/create";
import {
  convertFormToResponse,
  responseForm,
  validateResponseForm,
} from "@src/entities/response/dto/responseForm";
import type { Result } from "@src/entities/result/schema";
import { allSnapshotsBySurveyId } from "@src/entities/snapshot/dao/allBySurveyId";
import { getSurveyById } from "@src/entities/survey/dao/getById";
import { SurveyId } from "@src/entities/survey/dto/id";
import { parseSurvey } from "@src/entities/survey/dto/parsedSurvey";
import { Elysia, redirect, t } from "elysia";
import { gotoSurveyComponent } from "../homepage/components/gotoSurvey";
import { homepageLayoutComponent } from "../homepage/components/layout";
import { homeComponent } from "./components/home";
import { noDataComponent } from "./components/noData";
import { profileComponent } from "./components/profile";
import { publicComponent } from "./components/public";
import { quizComponent } from "./components/quiz";
import { resultComponent } from "./components/result";
import { ChartDataset, resultChartScript } from "./scripts/resultChart";

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
                const responses = allResponsesBySurveyProfile({
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
                const responses = allResponsesBySurveyProfile({
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
                const responses = allResponsesBySurveyProfile({
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
                const responses = allResponsesBySurveyProfile({
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
            const responses = allResponsesBySurveyProfile({
              surveyId: survey.id,
              profileId: profile.id,
            });
            return await quizComponent({
              survey: parsedSurvey,
              profile,
              responses,
            });
          })
          .post(
            "/get-result",
            async ({ params, body }) => {
              const { id } = params;
              const storedSurvey = getSurveyById({ id });
              const survey = parseSurvey({ survey: storedSurvey });
              const snapshots = allSnapshotsBySurveyId({ surveyId: id });
              let snapshot = "";
              if (!body.snapshot) {
                if (snapshots.length === 0) {
                  return noDataComponent({ survey: storedSurvey });
                }
                if (!snapshots[0].readyAt) {
                  return noDataComponent({ survey: storedSurvey });
                }
                snapshot = snapshots[0].id;
              } else {
                snapshot = body.snapshot;
              }
              const { area, profile, question } = body;
              const areaQuery = area ? `&area=${area}` : "";
              const profileQuery = profile ? `&profile=${profile}` : "";
              const url = `${import.meta.env.REMOTE_ENDPOINT_URL}/${id}?snapshot=${snapshot}${profileQuery}${areaQuery}`;
              const res = await fetch(url, { method: "GET" });
              const { result } = (await res.json()) as { result: Result };
              return resultComponent({
                survey,
                snapshots,
                result,
                selected: {
                  snapshot,
                  area,
                  profile,
                  question: parseInt(question ?? "0"),
                },
              });
            },
            {
              body: t.Object({
                snapshot: t.Optional(t.String()),
                area: t.Optional(t.String()),
                profile: t.Optional(t.String()),
                question: t.Optional(t.String()),
              }),
            }
          )
      )
      .get(
        "/result/chart.js",
        async ({ set, params, query }) => {
          const { id } = params;
          const { area, profile, selectedQuestion, snapshot } = query;
          const areaQuery = area ? `&area=${area}` : "";
          const profileQuery = profile ? `&profile=${profile}` : "";
          const url = `${import.meta.env.REMOTE_ENDPOINT_URL}/${id}?snapshot=${snapshot}${profileQuery}${areaQuery}`;
          const res = await fetch(url, { method: "GET" });
          const { result } = (await res.json()) as { result: Result };
          const selectedDataset = result.reduce((acc, item, index) => {
            if (parseInt(selectedQuestion ?? "0") === index) {
              acc.push({
                label: item.question_id,
                x: parseInt(item.label_x),
                y: parseInt(item.label_y),
              });
            }
            return acc;
          }, [] as ChartDataset);
          const otherDataset = result.reduce((acc, item, index) => {
            if (parseInt(selectedQuestion ?? "0") !== index) {
              acc.push({
                label: item.question_id,
                x: parseInt(item.label_x),
                y: parseInt(item.label_y),
              });
            }
            return acc;
          }, [] as ChartDataset);
          set.headers["Content-Type"] = "text/javascript; charset=utf8";
          const script = resultChartScript({
            otherDataset: otherDataset,
            selectedDataset: selectedDataset,
          });
          return script;
        },
        {
          query: t.Object({
            snapshot: t.String(),
            area: t.Optional(t.String()),
            profile: t.Optional(t.String()),
            selectedQuestion: t.Optional(t.String()),
          }),
        }
      )
  );
