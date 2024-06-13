import jwt from "@elysiajs/jwt";
import { Value } from "@sinclair/typebox/value";
import { jwtSecret } from "@src/config/jwtSecret";
import { listSnapshotsBySurveyId } from "@src/entities/snapshot/dao/listBySurveyId";
import { createSurvey } from "@src/entities/survey/dao/create";
import { deleteSurvey } from "@src/entities/survey/dao/delete";
import { getSurveyById } from "@src/entities/survey/dao/getById";
import { getHashById } from "@src/entities/survey/dao/getHashById";
import { updateSurvey } from "@src/entities/survey/dao/update";
import { AuthCookie, AuthJwt, AuthModel } from "@src/entities/survey/dto/auth";
import { EditSurvey, EditSurveyModel } from "@src/entities/survey/dto/edit";
import {
  createCredential,
  validatePassword,
} from "@src/utils/credentialManagement";
import { transpileForBrowsers } from "@src/utils/transpileForBrowsers";
import { Elysia, t } from "elysia";
import { gotoAdminComponent } from "../homepage/components/gotoAdmin";
import { gotoSurveyComponent } from "../homepage/components/gotoSurvey";
import { homepageLayoutComponent } from "../homepage/components/layout";
import { adminComponent, type AdminProps } from "./components/admin";
import type { EditFormProps } from "./components/editForm";
import { newSurveyComponent } from "./components/new";

export const adminService = new Elysia()
  .use(
    jwt({
      name: "authJwt",
      secret: jwtSecret,
      exp: "1d",
      schema: AuthJwt,
    })
  )
  .use(EditSurveyModel)
  .use(AuthModel)

  .get("/admin", () =>
    homepageLayoutComponent({
      content: gotoAdminComponent(),
    })
  )

  .get("/static/scripts/admin.js", async ({ set }) => {
    set.headers["Content-Type"] = "text/javascript; charset=utf8";
    return await transpileForBrowsers(`${__dirname}/scripts/admin.ts`);
  })

  .get("/new", async () => await newSurveyComponent({}))

  .post(
    "/admin/create",
    async ({ body, cookie: { auth }, authJwt, set }) => {
      if (Value.Check(EditSurvey, body)) {
        const { id, name, description, context, positions, areas, questions } =
          body;
        const { password, hash } = await createCredential();
        const survey = createSurvey({
          data: {
            id,
            name,
            description,
            context,
            positions,
            areas,
            questions,
          },
          hash,
        });
        auth.set({
          value: await authJwt.sign({ id: survey.id }),
          httpOnly: true,
          maxAge: 86400, // 1 day
        });
        set.headers["HX-Push-Url"] = `/admin/${survey.id}`;
        set.headers["HX-Replace-Url"] = `/admin/${survey.id}`;
        return await adminComponent({ survey, password });
      }
      throw new Error("Invalid data");
    },
    {
      body: "EditSurvey",
      cookie: AuthCookie,
      async error({ code, set, error, body }) {
        set.status = 200;
        set.headers["HX-Push-Url"] = "false";
        const props: EditFormProps = {
          ...body,
          errorCode: code,
        };
        if (code === "VALIDATION") props.validationErrors = error;
        return await newSurveyComponent(props);
      },
    }
  )

  .post(
    "/admin/update",
    async ({ body, cookie: { auth }, authJwt }) => {
      const claim = await authJwt.verify(auth.value);
      if (claim && claim.id === body.id) {
        if (Value.Check(EditSurvey, body)) {
          const survey = updateSurvey(body);
          return await adminComponent({ survey });
        }
        throw new Error("Invalid data");
      } else {
        auth.remove();
        return homepageLayoutComponent({
          content: gotoAdminComponent({ id: body.id }),
        });
      }
    },
    {
      body: "EditSurvey",
      cookie: AuthCookie,
      async error({ code, set, error, body }) {
        set.status = 200;
        set.headers["HX-Push-Url"] = "false";
        const props = {
          survey: body,
          errorCode: code,
        } as AdminProps;
        if (code === "VALIDATION") props.validationErrors = error;
        return await adminComponent(props);
      },
    }
  )

  .post(
    "/admin/login",
    async ({ body, cookie: { auth }, authJwt, set }) => {
      const { id, password } = body;
      const hash = getHashById({ id }) ?? "";
      const isValidCredentials = await validatePassword({
        password,
        hash,
      });
      if (isValidCredentials) {
        auth.set({
          value: await authJwt.sign({ id }),
          httpOnly: true,
          maxAge: 86400, // 1 day
        });
        set.headers["HX-Push-Url"] = `/admin/${id}`;
        const survey = getSurveyById({ id });
        const snapshots = listSnapshotsBySurveyId({ surveyId: id });
        return await adminComponent({ survey, snapshots });
      }
      throw new Error("Invalid credentials");
    },
    {
      body: "Auth",
      cookie: AuthCookie,
      error({ body, set, cookie: { auth } }) {
        const { id } = body;
        auth.remove();
        set.status = 200;
        set.headers["HX-Push-Url"] = `/admin/${id}`;
        return homepageLayoutComponent({
          content: gotoAdminComponent({ id }),
        });
      },
    }
  )

  .get(
    "/admin/logout",
    async ({ set, cookie: { auth }, authJwt }) => {
      const claim = await authJwt.verify(auth.value);
      const id = claim ? claim.id : "";
      auth.remove();
      set.status = 200;
      set.headers["HX-Push-Url"] = `/admin/${id}`;
      return homepageLayoutComponent({
        content: gotoAdminComponent({ id: id }),
      });
    },
    {
      cookie: AuthCookie,
    }
  )

  .post(
    "/admin/delete",
    async ({ body, set, cookie: { auth }, authJwt }) => {
      const { id } = body;
      const claim = await authJwt.verify(auth.value);
      if (claim && claim.id === id) {
        deleteSurvey({ id });
        auth.remove();
        set.status = 200;
        set.headers["HX-Push-Url"] = "/admin";
        return homepageLayoutComponent({
          content: gotoSurveyComponent(),
        });
      }
      throw new Error("Cannot delete survey.");
    },
    {
      body: t.Object({
        id: t.String(),
      }),
      cookie: AuthCookie,
      error: ({ set }) => {
        set.status = 200;
        set.headers["HX-Reswap"] = "none";
      },
    }
  )

  .get(
    "/admin/:id",
    async ({ cookie: { auth }, authJwt, params }) => {
      const { id } = params;
      const claim = await authJwt.verify(auth.value);
      if (claim && claim.id === id) {
        const survey = getSurveyById({ id });
        const snapshots = listSnapshotsBySurveyId({ surveyId: id });
        return await adminComponent({ survey, snapshots });
      } else {
        auth.remove();
        return homepageLayoutComponent({
          content: gotoAdminComponent({ id }),
        });
      }
    },
    {
      cookie: AuthCookie,
    }
  );
