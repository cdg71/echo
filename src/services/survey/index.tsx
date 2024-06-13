import jwt from "@elysiajs/jwt";
import { jwtSecret } from "@src/config/jwtSecret";
import { AuthJwt, AuthModel } from "@src/entities/survey/dto/auth";
import { SurveyId } from "@src/entities/survey/dto/id";
import { Elysia } from "elysia";

export const surveyService = new Elysia()
  .use(
    jwt({
      name: "authJwt",
      secret: jwtSecret,
      exp: "1d",
      schema: AuthJwt,
    })
  )
  .use(AuthModel)
  .get(
    "/survey",
    ({ set, query }) => {
      set.headers["HX-Push-Url"] = `/${query.id}`;
      set.headers["HX-Redirect"] = `/${query.id}`;
    },
    {
      query: SurveyId,
    }
  )
  .get(
    "/:id",
    ({ params }) => {
      return `Hello ${params.id}`;
    },
    {
      params: SurveyId,
    }
  );
