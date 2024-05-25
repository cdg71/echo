import { Elysia } from "elysia";
import { htmlTemplate } from "@src/components/htmlTemplate";

interface Props {
  surveyId?: string;
  adminToken?: string;
}

// const { surveyId, adminToken } = props;
const editSurveyComponent = (props: Props) => {
  const createNewSurvey = props.adminToken ? true : false;
  const title = createNewSurvey ? "Modifier le sondage" : "Nouveau sondage";
  return (
    <div class="prose">
      <h1>{title}</h1>
    </div>
  );
};

export const editSurveyService = new Elysia().get("/create", () => {
  return htmlTemplate({
    children: editSurveyComponent({}),
  });
  // .get("/:surveyId/:adminToken", ({ params: {surveyId, adminToken} }) => {
  //   return htmlTemplate({
  //     children: editSurveyComponent({ surveyId, adminToken }),
  //   });
});
