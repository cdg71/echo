import { editSurveyComponent } from "@src/services/survey/components/edit";
import { Elysia } from "elysia";
import { surveyModel } from "./models/survey";

export const editSurveyService = new Elysia()
  .use(surveyModel)
  .get("/new", () => {
    return editSurveyComponent({});
  })
  .post("/create", ({ body }) => body, {
    body: "survey",
    error({ code, set, error, body }) {
      if (code === "VALIDATION") {
        set.status = 200;
        return editSurveyComponent({
          formData: body,
          error,
        });
      }
    },
  });
