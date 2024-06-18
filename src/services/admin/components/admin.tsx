import { appShell } from "@src/components/appShell";
import type { Snapshot } from "@src/entities/snapshot/schema";
import type { EditSurvey } from "@src/entities/survey/dto/edit";
import { snapshotsComponent } from "@src/services/snapshot/components/list";
import { loadHeroIcons } from "@src/utils/loadHeroIcons";
import { editFormComponent, type EditFormValidationError } from "./editForm";

export type AdminProps = { survey: EditSurvey } & {
  snapshots?: Snapshot[];
} & EditFormValidationError & { password?: string };

export const adminComponent = async (props: AdminProps) => {
  const { password } = props;

  const powerIcon = loadHeroIcons({
    iconName: "power",
    family: "Outline",
    className: "size-6",
  });
  const clipboardIcon = loadHeroIcons({
    iconName: "clipboard",
    family: "Outline",
  });
  const clipboardDocumentIcon = loadHeroIcons({
    iconName: "clipboard-document",
    family: "Outline",
    className: "size-5",
  });
  const clipboardDocumentCheckIcon = loadHeroIcons({
    iconName: "clipboard-document-check",
    family: "Outline",
    className: "size-5",
  });
  const cameraIcon = loadHeroIcons({
    iconName: "camera",
    family: "Outline",
    className: "size-6 float-left",
  });
  const editIcon = loadHeroIcons({
    iconName: "pencil-square",
    family: "Outline",
    className: "size-6 float-left",
  });
  const deleteIcon = loadHeroIcons({
    iconName: "trash",
    family: "Outline",
    className: "size-6 float-left",
  });
  const warningIcon = loadHeroIcons({
    iconName: "exclamation-triangle",
    family: "Outline",
    className: "size-6 float-left",
  });

  const logoutNavButton = (
    <div class="btn btn-ghost btn-circle">
      <a
        class="btn btn-ghost btn-circle primary-content"
        hx-boost="true"
        hx-swap="outerHTML"
        hx-target="body"
        hx-push-url="true"
        href="/admin/logout"
      >
        {powerIcon}
      </a>
    </div>
  );

  const getPasswordDialogComponent = (password: string) =>
    password ? (
      <dialog id="passwordModal" class="modal modal-open">
        <div class="modal-box prose">
          <h3>{clipboardIcon} Copiez le code d'administration</h3>
          <p>
            Conservez précieusement le code de sécurité ci-dessous pour pouvoir
            gérer le sondage. Il ne vous sera affiché qu'une seule fois.
          </p>
          <div role="alert" class="alert alert-info">
            <label id="copyBtn" class="swap hover:text-gray-600">
              <div class="swap-on">{clipboardDocumentCheckIcon}</div>
              <div class="swap-off">{clipboardDocumentIcon}</div>
            </label>
            <div>
              <div id="passwordContainer" class="font-mono w-full">
                {password}
              </div>
            </div>
          </div>
          <div class="modal-action">
            <button
              class="btn"
              hx-get="/empty"
              hx-swap="delete"
              hx-push-url="false"
              hx-target="#passwordModal"
            >
              J'ai compris
            </button>
          </div>
        </div>
      </dialog>
    ) : (
      <></>
    );

  const snapshots = (
    <div>
      <form
        class="space-y-4"
        hx-post="/snapshot"
        hx-boost="true"
        hx-target="body"
      >
        <button class="btn btn-primary" type="submit">
          Capturer maintenant
        </button>
        <input
          id="surveyId"
          name="surveyId"
          type="hidden"
          class="hidden"
          value={`${props.survey.id}`}
        />
      </form>
      {snapshotsComponent(props.snapshots ?? [])}
    </div>
  );
  const form = editFormComponent({ ...props.survey, action: "update" });
  const deleteSurvey = (
    <div>
      <button class="btn btn-warning" id="deleteSurveyBtn">
        {warningIcon}&nbsp;Supprimer le sondage
      </button>
      <dialog id="deleteSurveyModal" class="modal">
        <div class="modal-box">
          <div class="prose">
            <h3>{deleteIcon}&nbsp;Supprimer le sondage</h3>
          </div>
          <form
            class="space-y-4"
            hx-post="/admin/delete"
            hx-boost="true"
            hx-target="body"
          >
            <label class="form-control space-y-1">
              <span class="label-text">
                Pour confirmer, veuillez saisir ci-dessous le code du sondage
              </span>
              <input
                id="id"
                name="id"
                type="text"
                placeholder={props.survey.id}
                class="input input-bordered"
                required
              />
              <span class="label-text">
                <strong>Cette action est irréversible.</strong> Une fois la
                ressource supprimée, vous ne pourrez pas la récupérer.
              </span>
            </label>
            <div class="space-x-2">
              <button type="submit" class="btn btn-outline btn-error">
                Supprimer définitivement
              </button>
              <button type="reset" class="btn btn-primary" id="cancelDeleteBtn">
                Annuler la suppression
              </button>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );

  const content = (
    <div class="w-full max-w-lg space-y-4">
      <script
        src="/static/scripts/admin.js"
        type="text/javascript"
        defer
      ></script>
      <div class="w-full space-y-4">
        <div class="collapse collapse-plus bg-slate-100">
          <input type="checkbox" checked={!props.errorCode} />
          <div class="collapse-title text-lg font-medium">
            {cameraIcon}&nbsp;Capturer les résultats
          </div>
          <div class="collapse-content">{snapshots}</div>
        </div>
        <div class="collapse collapse-plus bg-slate-100">
          <input type="checkbox" checked={!!props.errorCode} />
          <div class="collapse-title text-lg font-medium">
            {editIcon}&nbsp;Modifier
          </div>
          <div class="collapse-content">{form}</div>
        </div>
        <div class="collapse collapse-plus bg-slate-100">
          <input type="checkbox" />
          <div class="collapse-title text-lg font-medium">
            {deleteIcon}&nbsp;Supprimer
          </div>
          <div class="collapse-content">{deleteSurvey}</div>
        </div>
      </div>
      {getPasswordDialogComponent(password ?? "")}
    </div>
  );

  return await appShell({
    content,
    navbar: {
      end: logoutNavButton,
      center: <h1 class="text-2xl font-bold">{props.survey.id}</h1>,
    },
  });
};
