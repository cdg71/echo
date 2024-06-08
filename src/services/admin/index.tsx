import jwt from "@elysiajs/jwt";
import { jwtSecret } from "@src/config/jwtSecret";
import { getHashById, getSurveyById } from "@src/entities/survey/dao";
import {
  createSurveyComponent,
  type Props as CreateSurveyComponentProps,
} from "@src/services/admin/components/create";
import {
  createCredential,
  validatePassword,
} from "@src/utils/credentialManagement";
import { getStaticType } from "@src/utils/getStaticType";
import { transpileForBrowsers } from "@src/utils/transpileForBrowsers";
import { Elysia } from "elysia";
import { gotoAdminComponent } from "../homepage/components/gotoAdmin";
import { homepageLayoutComponent } from "../homepage/components/layout";
import { surveyAdminComponent } from "./components/admin";
import { createSurvey } from "./dao/create";
import { AuthCookie, AuthJwtSchema, authSurveyModel } from "./dto/auth";
import { createSurveyModel } from "./dto/create";

export const adminService = new Elysia()
  .use(
    jwt({
      name: "authJwt",
      secret: jwtSecret,
      exp: "1d",
      schema: AuthJwtSchema,
    })
  )
  .use(createSurveyModel)
  .use(authSurveyModel)

  .get("/admin", () =>
    homepageLayoutComponent({
      content: gotoAdminComponent(),
    })
  )

  .get("/static/scripts/general.js", async ({ set }) => {
    set.headers["Content-Type"] = "text/javascript; charset=utf8";
    return await transpileForBrowsers(`${__dirname}/scripts/admin.ts`);
  })

  .get("/new", async () => await createSurveyComponent({}))

  .post(
    "/admin/create",
    async ({ body, cookie: { auth }, authJwt, set }) => {
      const { password, hash } = await createCredential();
      const survey = createSurvey({
        createSurveyDTO: body,
        hash,
      });
      const { id } = getStaticType(survey);
      auth.set({
        value: await authJwt.sign({ id }),
        httpOnly: true,
        maxAge: 86400, // 1 day
      });
      set.headers["HX-Push-Url"] = `/admin/${survey["id"]}`;
      set.headers["HX-Replace-Url"] = `/admin/${survey["id"]}`;
      return await surveyAdminComponent({ password, survey });
    },
    {
      body: "createSurveyDTO",
      cookie: AuthCookie,
      async error({ code, set, error, body }) {
        set.status = 200;
        set.headers["HX-Push-Url"] = "false";
        const props: CreateSurveyComponentProps = {
          formData: body,
          errorCode: code,
        };
        if (code === "VALIDATION") props.validationErrors = error;
        return await createSurveyComponent(props);
      },
    }
  )

  .post(
    "/admin/login",
    async ({ body, cookie: { auth }, authJwt, set }) => {
      const { id, password } = body;
      // Validate survey id and password from the form
      const hash = getHashById(id);
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
        const survey = getSurveyById(id);
        return await surveyAdminComponent({ survey });
      }
      throw new Error("Invalid credentials");
    },
    {
      body: "authSurveyDTO",
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

  .get(
    "/admin/:id",
    async ({ cookie: { auth }, authJwt, params }) => {
      // Validate the session JWT
      const claim = await authJwt.verify(auth.value);
      if (claim && claim.id === params.id) {
        //   // If authorized render surveyAdminComponent + HX-Replace-Url header (/admin/:id)
        //   // If not authorized, throw an error : redirect to / + HX-Replace-Url header (/)
        const survey = getSurveyById(params.id);
        return await surveyAdminComponent({ survey });
      } else {
        auth.remove();
        return homepageLayoutComponent({
          content: gotoAdminComponent({ id: params.id }),
        });
      }
    },
    {
      cookie: AuthCookie,
    }
  );
