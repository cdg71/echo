# Todo

## sprintlog

- [x] cleanup général
- [x] app shell
- [ ] changeset

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

- [ ] Environnement de production
  - [ ] Hôte : Docker compose
- [ ] Environnement de développement
  - [x] [Github cli](https://github.com/cli/cli/blob/trunk/docs/install_linux.md)
  - [x] Runtime : bun (nodejs via pnpm)
  - [x] package manager : bun (pnpm)
  - [x] Transpiler typescript : bun (swc)
  - [x] Bundler : bun build (vite)
  - [ ] Versionning :
    - [x] Github repo and settings
    - [x] [Semantic versionning](https://semver.org/)
    - [x] Changesets ([keep a changelog](https://keepachangelog.com/en/1.0.0/))
    - [x] Use [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) : feat:, fix:, build:, chore:, ci:, docs:, style:, refactor:, perf:, test:
  - [ ] CI/CD
    - [x] Github flow et règles de protection de la branche main
    - [ ] Continuous Integration : Github actions : typecheck, lint, test, enforce conventional commit in the PR name
    - [ ] Continuous delivery : Github release (changeset version and publish) + publish to ghcr.io
    - [ ] On-Demand Deployment : docker compose
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
