import { editSurveyComponent } from "@src/services/survey/components/edit";
import { Elysia } from "elysia";
import { createSurveyDTO } from "./models/survey";

export const editSurveyService = new Elysia()
  .use(createSurveyDTO)
  .get("/new", () => {
    return editSurveyComponent({});
  })
  .post("/create", ({ body }) => body, {
    body: "createSurveyDTO",
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
