interface Props {
  id: string;
}

export const gotoSurveyComponent = (props?: Props) => (
  <form
    id="gotoForm"
    hx-get="/survey"
    class="card-body"
    hx-boost="true"
    hx-target="body"
  >
    <div class="form-control">
      <input
        id="id"
        name="id"
        type="text"
        placeholder="Code du sondage"
        class="input input-bordered"
        value={`${props?.id ?? ""}`}
        required
      />
    </div>
    <button type="submit" class="btn btn-primary">
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
