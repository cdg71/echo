import jwt from "@elysiajs/jwt";
import { htmlTemplate } from "@src/components/htmlTemplate";
import { jwtSecret } from "@src/config/jwtSecret";
import { getSurveyById } from "@src/entities/survey/dao";
import {
  createSurveyComponent,
  type Props as CreateSurveyComponentProps,
} from "@src/services/admin/components/create";
import { getStaticType } from "@src/utils/getStaticType";
import { validateSecurityCode } from "@src/utils/securityCodeManagement";
import { transpileForBrowsers } from "@src/utils/transpileForBrowsers";
import { Elysia } from "elysia";
import { gotoAdminComponent } from "../homepage/components/gotoAdmin";
import { gotoSurveyComponent } from "../homepage/components/gotoSurvey";
import { homepageLayoutComponent } from "../homepage/components/layout";
import { surveyAdminComponent } from "./components/general";
import { createSurvey } from "./dao/create";
import { authSurveyModel } from "./dto/auth";
import { createSurveyModel } from "./dto/create";

export const adminService = new Elysia()
  .use(
    jwt({
      name: "jwt",
      secret: jwtSecret,
      exp: "1d",
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
    async ({ body, cookie: { auth }, jwt, set }) => {
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
          value: await jwt.sign({ id }),
          httpOnly: true,
          maxAge: 86400, // 1 day
        });
        set.headers["HX-Push-Url"] = `/admin/${id}`;
        return htmlTemplate({
          content: (
            <div>
              <pre>
                <code hx-history="false">
                  {JSON.stringify(survey, null, 2)}
                </code>
              </pre>
              <button
                class="btn"
                hx-get="/admin/logout"
                hx-boost="true"
                hx-target="body"
              >
                Logout
              </button>
            </div>
          ),
        });
      }
      throw new Error("Invalid credentials");
    },
    {
      body: "authSurveyDTO",
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

  .get("/admin/logout", ({ set, cookie: { auth } }) => {
    auth.remove();
    set.status = 200;
    set.headers["HX-Push-Url"] = `/`;
    return homepageLayoutComponent({
      content: gotoSurveyComponent(),
    });
  })

  .get("/admin/:id", async ({ cookie: { auth }, jwt, params }) => {
    // Validate the session JWT
    const claim = await jwt.verify(auth.value as string);
    if (claim && claim["id"] === params.id) {
      return htmlTemplate({
        content: (
          <div>
            <pre>
              <code hx-history="false">
                {JSON.stringify({ claim }, null, 2)}
              </code>
            </pre>
            <button
              class="btn"
              hx-get="/admin/logout"
              hx-boost="true"
              hx-target="body"
            >
              Logout
            </button>
          </div>
        ),
      });
    } else {
      return homepageLayoutComponent({
        content: gotoAdminComponent({ id: params.id }),
      });
    }
    //   // If authorized render surveyAdminComponent + HX-Replace-Url header (/admin/:id)
    //   // If not authorized, throw an error : redirect to / + HX-Replace-Url header (/)
    //   return await surveyAdminComponent(survey as unknown as Survey);
  });
