import { Elysia } from "elysia";
import { streamsStore } from "../store";

export const pubRoute = new Elysia()
  .use(streamsStore)
  .get("/pub", ({ store }) => {
    const texts = [
      "Bonjour!",
      "Bienvenue sur notre site web!",
      "Merci de nous rendre visite.",
      `Nous espérons que vous<br />trouverez ce que vous cherchez.`,
      "Passez une excellente journée!",
    ];
    const randomIndex = Math.floor(Math.random() * texts.length);
    for (const stream of store.streams) {
      stream.instance.send(
        <div class="card card-compact w-100 m-4 bg-base-100 drop-shadow-md align-middle text-left">
          <div class="card-body">{texts[randomIndex]}</div>
        </div>
      );
    }
  });
