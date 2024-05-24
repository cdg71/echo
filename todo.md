# Todo

## sprintlog

- [x] cleanup général
- [x] app shell

## Backlog

- [ ] Authentification : utiliser cookies / JWT signés pour identifier la session, l'utilisateur via son profil et gérer les ressources dynamiquement (streams, styles, etc.)
- [ ] Mentions légales : politique de confidentialité
- [ ] Page : créer un sondage
- [ ] Page : personnaliser un sondage
- [ ] Page : participer à un sondage - accueil : si absence de profil = page profil ; si profil mais pas de résultat = sondage et commentaires ; si profil et résultat = page résultat
- [ ] Page : participer à un sondage - profil personnalisé
- [ ] Page : participer à un sondage - sondage
- [ ] Page : participer à un sondage - commentaire
- [ ] Page : participer à un sondage - résultat
- [ ] Base de données => accessible par le store Elysia ?

## Stack

- [ ] System
  - [x] [Github cli](https://github.com/cli/cli/blob/trunk/docs/install_linux.md)
  - [ ] Hôte : Docker compose
  - [x] Runtime : bun (nodejs via pnpm)
  - [x] package manager : bun (pnpm)
  - [x] Transpiler typescript : bun (swc)
  - [x] Bundler : bun build (vite)
- [ ] Environnement de développement
  - [ ] Versionning :
    - [x] Github repo and settings
    - [ ] Changesets (Semantic versionning + keep a changelog)
    - [ ] Use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) : feat:, fix:, build:, chore:, ci:, docs:, style:, refactor:, perf:, test:
  - [ ] CI/CD
    - [x] Forcer Github flow et règles de protection des déploiements
    - [ ] Github actions
    - [ ] Github release + ghcr.io
  - [ ] Tests
    - [x] Tests statiques : Eslint + prettier
    - [x] Tests unitaires / intégration : bun test (jest ou vitest)
    - [ ] tests E2E (?) : playwright
- [x] Base de données : bun sqlite (Libsql + client (replica) vs leveldb)
- [ ] Architecture
  - [ ] Architecture applicative : Effect + grokking simplicity
  - [ ] Server sent events pour la communication "temps réel"
- [ ] Frontend
  - [ ] UI : HTMX remplace React
  - [ ] UI : Tailwind + daisyui + heroicons
- [ ] Backend
  - [x] Web server : Elysia (vs express, bun router ou µWebsocket) avec ses plugins : cors, helmet, tailwind, htmx, stream
