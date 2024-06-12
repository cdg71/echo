import jwt from "@elysiajs/jwt";
import { Value } from "@sinclair/typebox/value";
import { jwtSecret } from "@src/config/jwtSecret";
import { getHashById, getSurveyById } from "@src/entities/survey/dao";
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
import { createSurvey } from "./dao/createSurvey";
import { deleteSurvey } from "./dao/deleteSurvey";
import { updateSurvey } from "./dao/updateSurvey";
import { AuthCookie, AuthJwt, AuthModel } from "./dto/auth";
import { EditSurvey, EditSurveyModel } from "./dto/edit";

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

  .get("/static/scripts/general.js", async ({ set }) => {
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
        // convert settings to survey fields
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
        return await adminComponent({ ...survey, password });
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
          const {
            id,
            name,
            description,
            context,
            positions,
            areas,
            questions,
          } = body;
          const survey = updateSurvey({
            id,
            name,
            description,
            context,
            positions,
            areas,
            questions,
          });
          return await adminComponent({ ...survey });
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
        console.log(error);

        set.status = 200;
        set.headers["HX-Push-Url"] = "false";
        const props = {
          ...body,
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
      // Validate survey id and password from the form
      const hash = getHashById(id) ?? "";
      const isValidCredentials = await validatePassword({
        password,
        hash,
      });
      if (isValidCredentials) {
        // If authorized, create the session JWT and redirect to /admin/:id
        auth.set({
          value: await authJwt.sign({ id }),
          httpOnly: true,
          maxAge: 86400, // 1 day
        });
        set.headers["HX-Push-Url"] = `/admin/${id}`;
        const { name, description, context, positions, areas, questions } =
          getSurveyById(id);
        return await adminComponent({
          id,
          name,
          description,
          context,
          positions,
          areas,
          questions,
        });
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
      // Validate the session JWT
      const { id } = params;
      const claim = await authJwt.verify(auth.value);
      if (claim && claim.id === id) {
        //   // If authorized render surveyAdminComponent + HX-Replace-Url header (/admin/:id)
        //   // If not authorized, throw an error : redirect to / + HX-Replace-Url header (/)
        const { name, description, context, positions, areas, questions } =
          getSurveyById(id);
        return await adminComponent({
          id,
          name,
          description,
          context,
          positions,
          areas,
          questions,
        });
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
