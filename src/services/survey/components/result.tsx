import type { Result } from "@src/entities/result/schema";
import type { Snapshot } from "@src/entities/snapshot/schema";
import type { ParsedSurvey } from "@src/entities/survey/dto/parsedSurvey";
import dayjs from "dayjs";
import { micromark } from "micromark";
import { noDataComponent } from "./noData";

interface Selected {
  question?: number;
  snapshot?: string;
  area?: string;
  profile?: string;
}

export const questionResult = (props: {
  surveyId: string;
  result: Result;
  selected: Selected;
}) => {
  const { surveyId, result, selected } = props;
  const currentQuestion = selected.question ?? 0;
  const links = result.map((_, index) => {
    return (
      <form
        id={`resultForm-${index}`}
        hx-post={`${surveyId}/fragment/get-result`}
        hx-target="#appshellContent"
      >
        <input
          id="snapshot"
          name="snapshot"
          type="hidden"
          value={selected.snapshot}
        />
        <input id="area" name="area" type="hidden" value={selected.area} />
        <input
          id="profile"
          name="profile"
          type="hidden"
          value={selected.profile}
        />
        <input id="question" name="question" type="hidden" value={`${index}`} />
        <button
          type="submit"
          class={`btn btn-xs md:btn-sm ${selected.question === index ? "btn-primary" : ""}`}
        >
          {index + 1}
        </button>
      </form>
    );
  });
  if (result[0].question === "Filters don't match any retrieved data") {
    return noDataComponent({});
  }

  const chartUrl = `/${surveyId}/result/chart.js?snapshot=${selected.snapshot}${selected.area ? `&area=${selected.area}` : ""}${selected.profile ? `&profile=${selected.profile}` : ""}${selected.question ? `&selectedQuestion=${selected.question}` : ""}`;
  return (
    <div class="questionResult">
      <div>
        <div class="flex justify-center w-full py-2 gap-2">{links}</div>

        <div class="collapse collapse-open bg-slate-100 mt-4">
          <div class="collapse-title">
            <div class="prose text-center text-base-content">
              <h3>{result[currentQuestion].question}</h3>
            </div>
          </div>
          <div class="collapse-content">
            <img
              src={result[currentQuestion].imageUrl}
              class="w-full h-auto rounded-xl"
            />
          </div>
        </div>
      </div>

      <div class="w-full rounded-xl bg-slate-100 mt-4">
        <canvas
          id="myQuadrantChart"
          width="400"
          height="400"
          style=" width: auto !important; height: 100% !important;"
        ></canvas>
      </div>

      <div class="collapse collapse-open bg-slate-100 mt-4">
        <div class="collapse-title">
          <div class="prose text-base-content text-center">
            <h3>Analyse</h3>
          </div>
        </div>
        <div class="collapse-content space-4">
          <div class="prose text-justify text-base-content">
            <p>{micromark(result[currentQuestion].analyse)}</p>
          </div>
        </div>
        <script src="/static/scripts/chart.js"></script>
        <script src={chartUrl}></script>
      </div>
    </div>
  );
};

export const resultComponent = (props: {
  survey: ParsedSurvey;
  snapshots: Snapshot[];
  result: Result;
  selected: Selected;
}) => {
  const { survey, snapshots, selected, result } = props;
  return (
    <div class="w-full max-w-lg space-y-4 sm:mt-5">
      <div class="prose text-center">
        <h2>Résultats du sondage</h2>
      </div>
      <form
        id="resultForm"
        class="join join-vertical sm:join-horizontal flex max-w-full"
        hx-post={`${survey.id}/fragment/get-result`}
        hx-trigger="change"
        hx-target="#appshellContent"
      >
        <select
          id="snapshot"
          name="snapshot"
          class="select select-secondary select-bordered join-item flex-grow"
        >
          {snapshots.map((snapshot) => (
            <option
              value={snapshot.id}
              selected={snapshot.id === selected.snapshot}
            >
              {dayjs.unix(snapshot.createdAt).format("DD/MM/YYYY (HH:mm)")}
            </option>
          ))}
        </select>
        <select
          id="area"
          name="area"
          class="select select-secondary select-bordered join-item flex-grow"
        >
          <option value="" selected>
            Tout territoire
          </option>
          {survey.areas?.map((area) => (
            <option value={area} selected={area === selected.area}>
              {area}
            </option>
          ))}
        </select>
        <select
          id="profile"
          name="profile"
          class="select select-secondary select-bordered join-item flex-grow"
        >
          <option value="" selected>
            Tout service
          </option>
          {survey.positions?.map((profile) => (
            <option value={profile} selected={profile === selected.profile}>
              {profile}
            </option>
          ))}
        </select>
      </form>
      {questionResult({
        surveyId: survey.id,
        result,
        selected,
      })}
    </div>
  );
};
