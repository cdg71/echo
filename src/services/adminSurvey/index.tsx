import type { Survey } from "@src/entities/survey/schema";
import type { Props as createSurveyComponentProps } from "@src/services/adminSurvey/components/create";
import { createSurveyComponent } from "@src/services/adminSurvey/components/create";
import { surveyAdminComponent } from "@src/services/adminSurvey/components/general";
import { createSurvey } from "@src/services/adminSurvey/dao/create";
import { transpileForBrowsers } from "@src/utils/transpileForBrowsers";
import { Elysia } from "elysia";
import { createSurveyModel } from "./dto/create";

export const editSurveyService = new Elysia()
  .use(createSurveyModel)
  .get("/new", async () => await createSurveyComponent({}))
  .get("/static/scripts/general.js", async ({ set }) => {
    set.headers["Content-Type"] = "text/javascript; charset=utf8";
    return await transpileForBrowsers(`${__dirname}/scripts/general.ts`);
  })
  .get("/admin", async () => {
    const survey = {
      id: "Mon sondage",
      name: "sondage",
      description: "Le plus réussi !",
      securityCode: "AWA9Q-PMNSJ-LA4F3-QY78L",
      created: 1717165982427,
      updated: 1717165982427,
    };
    return await surveyAdminComponent(survey as unknown as Survey);
  })
  .post(
    "/admin",
    async ({ body }) => {
      const survey = await createSurvey(body);
      return await surveyAdminComponent(survey);
    },
    {
      body: "createSurveyDTO",
      async error({ code, set, error, body }) {
        set.status = 200;
        set.headers["HX-Push-Url"] = "false";
        const props: createSurveyComponentProps = {
          formData: body,
          errorCode: code,
        };
        if (code === "VALIDATION") props.validationErrors = error;
        return await createSurveyComponent(props);
      },
    }
  );
