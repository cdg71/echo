import jwt from "@elysiajs/jwt";
import { Value } from "@sinclair/typebox/value";
import { jwtSecret } from "@src/config/jwtSecret";
import { getHashById, getSurveyById } from "@src/entities/survey/dao";
import {
  JsonSettings,
  Settings,
  defaultJsonSettings,
} from "@src/entities/survey/schema";
import {
  createCredential,
  validatePassword,
} from "@src/utils/credentialManagement";
import { transpileForBrowsers } from "@src/utils/transpileForBrowsers";
import { Elysia } from "elysia";
import { gotoAdminComponent } from "../homepage/components/gotoAdmin";
import { homepageLayoutComponent } from "../homepage/components/layout";
import { adminComponent } from "./components/admin";
import { newSurveyComponent } from "./components/new";
import { createSurvey } from "./dao/create";
import { AuthCookie, AuthJwt, AuthModel } from "./dto/auth";
import { EditSurvey, EditSurveyModel, type EditFormProps } from "./dto/edit";

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
        const { id, name, settings: formSettings } = body;
        console.log(JSON.parse(formSettings));
        const { password, hash } = await createCredential();
        // convert settings to survey fields
        const isSettings = Value.Check(
          Settings,
          Value.Decode(JsonSettings, formSettings || "{}")
        );
        const settings = isSettings ? formSettings : defaultJsonSettings;
        const survey = createSurvey({
          data: {
            id,
            name,
            settings,
            createdAt: Date.now(),
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
        return await adminComponent({ ...survey, password, settings });
      }
      throw new Error("Invalid data");
    },
    {
      body: "EditSurvey",
      cookie: AuthCookie,
      async error({ code, set, error, body }) {
        console.log({ code, error });
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
        const { name, settings } = getSurveyById(id);
        return await adminComponent({
          id,
          name,
          settings,
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

  .get(
    "/admin/:id",
    async ({ cookie: { auth }, authJwt, params }) => {
      // Validate the session JWT
      const { id } = params;
      const claim = await authJwt.verify(auth.value);
      if (claim && claim.id === id) {
        //   // If authorized render surveyAdminComponent + HX-Replace-Url header (/admin/:id)
        //   // If not authorized, throw an error : redirect to / + HX-Replace-Url header (/)
        const { name, settings } = getSurveyById(id);
        return await adminComponent({
          id,
          name,
          settings,
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
