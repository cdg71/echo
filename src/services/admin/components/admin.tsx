import { appShell } from "@src/components/appShell";
import { loadHeroIcons } from "@src/utils/loadHeroIcons";
import type { EditFormValidationError, EditSurvey } from "../dto/edit";
import { editFormComponent } from "./editForm";

type Props = EditSurvey & EditFormValidationError & { password?: string };

export const adminComponent = async (props: Props) => {
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
    className: "size-5 float-left",
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

  const getDialogComponent = (password: string) =>
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

  const form = editFormComponent(props);

  const content = (
    <div class="w-full max-w-lg space-y-4">
      <script
        src="/static/scripts/general.js"
        type="text/javascript"
        defer
      ></script>
      <main>{form}</main>
      {password ? getDialogComponent(password) : <></>}
    </div>
  );

  return await appShell({
    content,
    navbar: {
      end: logoutNavButton,
    },
  });
};
