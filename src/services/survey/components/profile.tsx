import type { Profile } from "@src/entities/profile/schema";
import type { ParsedSurvey } from "@src/entities/survey/dto/parsedSurvey";
import { loadHeroIcons } from "@src/utils/loadHeroIcons";

interface Props {
  parsedSurvey: ParsedSurvey;
  profile: Profile;
  status?: "success" | "error";
}

const createOptionsJsx = (props: { values?: string[]; selected?: string }) => {
  const defaultOption = [
    <option disabled selected={!props.selected} value="">
      Choisissez
    </option>,
  ];
  const { values } = props;
  const options = values
    ? values.map((value) => (
        <option selected={value === props.selected} value={value}>
          {value}
        </option>
      ))
    : [];
  return [...defaultOption, ...options];
};

export const profileComponent = async (props: Props) => {
  const { parsedSurvey: survey, profile, status } = props;

  const dismissIcon = await loadHeroIcons({
    iconName: "x-mark",
    className: "size-6",
  });

  return (
    <div class="space-y-4 w-full md:pt-6 max-w-lg">
      <div
        id="alert"
        role="alert"
        class={`flex flex-row alert ${status === "error" ? "alert-error" : "alert-success"} mb-4 ${!status ? "hidden" : ""}`}
        hx-get="/empty"
        hx-trigger="load delay:2s"
        hx-swap="outerHTML"
      >
        <div class={`flex-grow prose ${status === "error" ? "hidden" : ""}`}>
          <strong>Votre profil a été enregistré avec succès.</strong>
        </div>
        <div class={`flex-grow prose ${status === "success" ? "hidden" : ""}`}>
          <strong>L'enregistrement du profil a échoué.</strong>
        </div>
        <button
          class="text-gray-600 hover:text-gray-800"
          hx-get="/empty"
          hx-swap="delete"
          hx-target="#alert"
        >
          {dismissIcon}
        </button>
      </div>
      <form
        class="space-y-4"
        hx-post={`/${survey.id}/fragment/profile`}
        hx-target="#appshellContent"
      >
        <div class="prose text-center w-full">
          <h2>Mon profil</h2>
        </div>
        <label class="form-control">
          <span class="label-text">Service</span>
          <select
            id="position"
            name="position"
            class="select select-bordered w-full"
          >
            {createOptionsJsx({
              values: survey.positions,
              selected: profile.position,
            })}
          </select>
        </label>
        <label class="form-control">
          <span class="label-text">Secteur géographique</span>
          <select id="area" name="area" class="select select-bordered w-full">
            {createOptionsJsx({
              values: survey.areas,
              selected: profile.area,
            })}
          </select>
        </label>
        <div class="space-x-2">
          <button type="submit" class="btn btn-primary">
            Enregistrer
          </button>
        </div>
      </form>
    </div>
  );
};
