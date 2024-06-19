import jwt from "@elysiajs/jwt";
import { Value } from "@sinclair/typebox/value";
import { jwtSecret } from "@src/config/jwtSecret";
import { allSnapshotsBySurveyId } from "@src/entities/snapshot/dao/allBySurveyId";
import { createSnapshot } from "@src/entities/snapshot/dao/create";
import { deleteSnapshot } from "@src/entities/snapshot/dao/delete";
import { getSnapshotById } from "@src/entities/snapshot/dao/getById";
import { SnapshotIdModel } from "@src/entities/snapshot/dto/id";
import {
  SnapshotSurveyId,
  SnapshotSurveyIdModel,
} from "@src/entities/snapshot/dto/surveyId";
import { getSurveyById } from "@src/entities/survey/dao/getById";
import { AuthCookie, AuthJwt, AuthModel } from "@src/entities/survey/dto/auth";
import { Elysia } from "elysia";
import { adminComponent } from "../admin/components/admin";
import { gotoAdminComponent } from "../homepage/components/gotoAdmin";
import { homepageLayoutComponent } from "../homepage/components/layout";

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
          createSnapshot(body);
          const survey = getSurveyById({ id: surveyId });
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
  );
