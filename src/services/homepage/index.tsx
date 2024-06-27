import { Elysia } from "elysia";
import { gotoAdminComponent } from "./components/gotoAdmin";
import { gotoSurveyComponent } from "./components/gotoSurvey";
import { homepageLayoutComponent } from "./components/layout";

export const homepageService = new Elysia()
  .get("/", ({ set }) => {
    set.headers["HX-Retarget"] = "body";
    set.headers["HX-Replace-Url"] = "/";
    return homepageLayoutComponent({ content: gotoSurveyComponent() });
  })
  .get("/goto/admin", gotoAdminComponent)
  .get("/goto/admin/:id", ({ params }) => gotoAdminComponent({ id: params.id }))
  .get("/goto/survey", gotoSurveyComponent)
  .get("/goto/survey/:id", ({ params }) =>
    gotoSurveyComponent({ id: params.id })
  );
