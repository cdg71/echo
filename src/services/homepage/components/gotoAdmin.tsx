interface Props {
  id: string;
}
export const gotoAdminComponent = (props?: Props) => (
  <form id="gotoForm" class="card-body" hx-post="/admin/login" hx-target="body">
    <div class="form-control">
      <input
        id="id"
        name="id"
        type="text"
        placeholder="Code du sondage"
        class="input input-bordered"
        required
        value={`${props?.id ?? ""}`}
      />
    </div>
    <div class="form-control">
      <input
        id="securityCode"
        name="securityCode"
        type="password"
        placeholder="Code d'administration"
        class="input input-bordered"
        required
      />
    </div>
    <button class="btn btn-primary" type="submit">
      Se connecter
    </button>
    <div class="text-xs">
      <a href="/new" class="link link-hover link-neutral">
        Nouveau sondage
      </a>
      <span> | </span>
      <a
        class="link link-hover link-neutral"
        hx-get={`/goto/survey/${props?.id ? `${props.id}` : ""}`}
        hx-target="#gotoForm"
        hx-push-url="false"
        hx-boost="true"
        hx-swap="outerHTML"
      >
        Participer
      </a>
    </div>
  </form>
);
