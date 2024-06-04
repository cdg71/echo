import jwt from "@elysiajs/jwt";
import { jwtSecret } from "@src/config/jwtSecret";
import { getSurveyById } from "@src/entities/survey/dao";
import {
  createSurveyComponent,
  type Props as CreateSurveyComponentProps,
} from "@src/services/admin/components/create";
import { getStaticType } from "@src/utils/getStaticType";
import { validateSecurityCode } from "@src/utils/securityCodeManagement";
import { transpileForBrowsers } from "@src/utils/transpileForBrowsers";
import { Elysia, t } from "elysia";
import { gotoAdminComponent } from "../homepage/components/gotoAdmin";
import { homepageLayoutComponent } from "../homepage/components/layout";
import { surveyAdminComponent } from "./components/admin";
import { createSurvey } from "./dao/create";
import { authSurveyModel } from "./dto/auth";
import { createSurveyModel } from "./dto/create";

const AuthJwtSchema = t.Cookie({
  id: t.String(),
});
const AuthCookie = t.Cookie({ auth: t.String() });

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
    return await transpileForBrowsers(`${__dirname}/scripts/general.ts`);
  })

  .get("/new", async () => await createSurveyComponent({}))

  .post(
    "/create-survey",
    async ({ body, set }) => {
      const survey = await createSurvey(body);
      const { id } = getStaticType(survey);
      set.headers["HX-Replace-Url"] = `/admin/${id}`;
      return await surveyAdminComponent(survey);
    },
    {
      body: "createSurveyDTO",
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
      const { id, securityCode: code } = body;
      // Validate survey id and security code from the form
      const survey = getSurveyById(id);
      const { securityCode: hash } = getStaticType(survey);
      const isValidCredentials = await validateSecurityCode({
        code,
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
        return await surveyAdminComponent({ ...survey, securityCode: "" });
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
        return await surveyAdminComponent({ ...survey, securityCode: "" });
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
