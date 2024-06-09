interface Props {
  id: string;
}

export const gotoSurveyComponent = (props?: Props) => (
  <form id="gotoForm" class="card-body" hx-history="false">
    <div class="form-control">
      <input
        type="text"
        placeholder="Code du sondage"
        class="input input-bordered"
        value={`${props?.id ?? ""}`}
        required
      />
    </div>
    <button
      hx-get="/survey"
      hx-trigger="click"
      hx-boost="true"
      hx-swap="outerHTML"
      hx-target="body"
      hx-push-url="true"
      class="btn btn-primary"
    >
      Se connecter
    </button>
    <div class="text-xs">
      <a href="/new" class="link link-hover link-neutral">
        Nouveau sondage
      </a>
      <span> | </span>
      <a
        class="link link-hover link-neutral"
        hx-get={`/goto/admin/${props?.id ? `${props.id}` : ""}`}
        hx-target="#gotoForm"
        hx-push-url="false"
        hx-boost="true"
        hx-swap="outerHTML"
      >
        Administration
      </a>
    </div>
  </form>
);
