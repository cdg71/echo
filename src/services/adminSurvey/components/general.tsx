import { appShell } from "@src/components/appShell";
import type { Survey } from "@src/entities/survey/schema";
import { loadHeroIcons } from "@src/utils/loadHeroIcons";

export const surveyAdminComponent = async (props: Survey) => {
  const { securityCode, ...survey } = props;
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
  const content = (
    <>
      <script
        src="/static/scripts/general.js"
        type="text/javascript"
        defer
      ></script>
      <pre>
        <code>{JSON.stringify(survey, null, 2)}</code>
      </pre>
      <dialog id="securityCodeModal" class="modal modal-open">
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
              <div id="securityCodeContainer" class="font-mono w-full">
                {securityCode}
              </div>
            </div>
          </div>
          <div class="modal-action">
            <button
              class="btn"
              hx-get="/empty"
              hx-swap="delete"
              hx-push-url="false"
              hx-target="#securityCodeModal"
            >
              J'ai compris
            </button>
          </div>
        </div>
      </dialog>
    </>
  );
  return await appShell({ title: "Gérer un sondage", content });
};
