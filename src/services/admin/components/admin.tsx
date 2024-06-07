import { appShell } from "@src/components/appShell";
import type { Survey } from "@src/entities/survey/schema";
import { loadHeroIcons } from "@src/utils/loadHeroIcons";

interface Props {
  survey: Survey;
  password?: string;
}

export const surveyAdminComponent = async (props: Props) => {
  const { password, survey } = props;
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
  const content = (
    <div hx-history="false">
      <script
        src="/static/scripts/general.js"
        type="text/javascript"
        defer
      ></script>
      <main>
        <pre>
          <code>{JSON.stringify(survey, null, 2)}</code>
        </pre>
        <button
          class="btn"
          hx-get="/admin/logout"
          hx-boost="true"
          hx-target="body"
        >
          Logout
        </button>
      </main>
      {password ? getDialogComponent(password) : <></>}
    </div>
  );
  return await appShell({
    content,
  });
};
