import jwt from "@elysiajs/jwt";
import { Value } from "@sinclair/typebox/value";
import { jwtSecret } from "@src/config/jwtSecret";
import { allProfilesBySurveyId } from "@src/entities/profile/dao/allBySurveyId";
import { allResponsesBySurveyProfile } from "@src/entities/response/dao/allBySurveyProfile";
import { allSnapshotsBySurveyId } from "@src/entities/snapshot/dao/allBySurveyId";
import { createSnapshot } from "@src/entities/snapshot/dao/create";
import { deleteSnapshot } from "@src/entities/snapshot/dao/delete";
import { getSnapshotById } from "@src/entities/snapshot/dao/getById";
import { markSnapshotAsReady } from "@src/entities/snapshot/dao/update";
import { SnapshotId, SnapshotIdModel } from "@src/entities/snapshot/dto/id";
import {
  SnapshotSurveyId,
  SnapshotSurveyIdModel,
} from "@src/entities/snapshot/dto/surveyId";
import { getSurveyById } from "@src/entities/survey/dao/getById";
import { AuthCookie, AuthJwt, AuthModel } from "@src/entities/survey/dto/auth";
import { parseSurvey } from "@src/entities/survey/dto/parsedSurvey";
import { Elysia, redirect, t } from "elysia";
import { adminComponent } from "../admin/components/admin";
import { gotoAdminComponent } from "../homepage/components/gotoAdmin";
import { homepageLayoutComponent } from "../homepage/components/layout";
import { snapshotComponent } from "./components/list";

export const snapshotService = new Elysia()
  .use(
    jwt({
      name: "authJwt",
      secret: jwtSecret,
      exp: "1d",
      schema: AuthJwt,
    })
  )
  .use(SnapshotSurveyIdModel)
  .use(SnapshotIdModel)
  .use(AuthModel)
  .post(
    "/snapshot",
    async ({ body, cookie: { auth }, authJwt }) => {
      const { surveyId } = body;
      const claim = await authJwt.verify(auth.value);
      if (claim && claim.id === surveyId) {
        if (Value.Check(SnapshotSurveyId, body)) {
          const { id: snapshotId } = createSnapshot(body);
          // build the dataset
          const survey = getSurveyById({ id: surveyId });
          const { questions: quiz, ...parsedSurvey } = parseSurvey({ survey });
          const profiles = allProfilesBySurveyId({ surveyId });
          const users = profiles.map((profile) => {
            const storedResponses = allResponsesBySurveyProfile({
              surveyId,
              profileId: profile.id,
            });
            const responses = storedResponses.map((storedResponse) => {
              const values = Object.keys(storedResponse.answers).map(
                (questionId) => ({
                  questionId,
                  value: storedResponse.answers[questionId].value,
                  comment: storedResponse.answers[questionId].comment,
                })
              );
              return {
                createdAt: storedResponse.createdAt,
                values,
              };
            });
            return {
              ...profile,
              responses,
            };
          });
          const content = {
            ...parsedSurvey,
            quiz,
            snapshot: snapshotId,
            users,
          };
          // call the cloud
          const jsonContent = JSON.stringify(content);
          const url = `${import.meta.env.CLOUD_ENDPOINT_URL}/${surveyId}`;
          void fetch(url, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: jsonContent,
          });
          const snapshots = allSnapshotsBySurveyId({ surveyId });
          return await adminComponent({ survey, snapshots });
        }
        throw new Error("Invalid data");
      } else {
        auth.remove();
        return homepageLayoutComponent({
          content: gotoAdminComponent({ id: body.surveyId }),
        });
      }
    },
    {
      body: "SnapshotSurveyId",
      cookie: AuthCookie,
    }
  )
  .delete(
    "/snapshot/:id",
    async ({ params, cookie: { auth }, authJwt }) => {
      const { id } = params;
      const { surveyId } = getSnapshotById({ id });
      const claim = await authJwt.verify(auth.value);
      if (claim && claim.id === surveyId) {
        deleteSnapshot({ id });
        const survey = getSurveyById({ id: surveyId });
        const snapshots = allSnapshotsBySurveyId({ surveyId });
        return await adminComponent({ survey, snapshots });
      }
    },
    {
      params: "SnapshotId",
      cookie: AuthCookie,
    }
  )
  .get(
    "/webhook/complete/:snapshotId",
    ({ params }) => {
      const { snapshotId } = params;
      markSnapshotAsReady({ id: snapshotId });
      return { status: "OK" };
    },
    {
      params: t.Object({
        snapshotId: t.String(),
      }),
    }
  )
  .group("/admin/fragment", (app) =>
    app
      .guard({
        beforeHandle: ({ request, set }) => {
          set.headers["Vary"] = "hx-request";
          if (!request.headers.get("hx-request")) {
            return redirect(`/`);
          }
        },
      })
      .get(
        "/snapshot/:id",
        ({ params }) => {
          const { id } = params;
          const snapshot = getSnapshotById({ id });
          return snapshotComponent({ ...snapshot });
        },
        { params: SnapshotId }
      )
  );
