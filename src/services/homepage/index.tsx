import { htmlTemplate } from "@src/components/htmlTemplate";
import { randomUUID } from "crypto";
import { Elysia } from "elysia";
import { chatComponent } from "../streams/components/chat";

const homepageComponent = (streamid: string) => (
  <div class="hero min-h-screen bg-base-100 flex flex-col justify-center items-center">
    <div class="hero-content w-full max-w-xl text-center flex flex-col sm:flex-row items-center">
      <div class="flex flex-col items-center space-y-2 space-x-3">
        <img src="/static/images/cdg-logo.svg" alt="Logo" class="w-4/5" />
        <h1 class="text-5xl font-bold tracking-wider w-full">écho</h1>
        <p class="text-base">
          Outil d'analyse du sentiment <br class="md:hidden" />
          assisté par l'intelligence artificielle.
        </p>
      </div>
      <div class="card w-full shadow-2xl bg-base-200">
        <form class="card-body">
          <div class="form-control">
            <input
              type="text"
              placeholder="Code du sondage"
              class="input input-bordered"
              required
            />
          </div>
          <button
            hx-get="/pub"
            hx-trigger="click"
            hx-swap="none"
            class="btn btn-primary"
          >
            Se connecter
          </button>
          <div class="text-xs">
            <a href="/new" class="link link-hover link-neutral">
              Nouveau sondage
            </a>
            <span> | </span>
            <a href="/admin" class="link link-hover link-neutral">
              Administration
            </a>
          </div>
        </form>
      </div>
    </div>
    {chatComponent(streamid)}
  </div>
);

export const homepageService = new Elysia().get("/", () => {
  const streamid = randomUUID();
  return htmlTemplate({
    content: homepageComponent(streamid),
  });
});
