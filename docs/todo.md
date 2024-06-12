# Todo

- categories: feat(epic): , feat: feature, feat(backend): backend only feature, feat(frontend): frontend only feature, fix: bugfix, docs: documentation, dev: developer environment, refactor: refactoring, perf: performance, test: test

## sprintlog

- [-] feat: administrer un sondage (Fonctionnalité principale du sprint)
  - [x] /new: Créer un nouveau sondage
  - [-] /admin: gérer un sondage
    - [x] login
    - [x] logout
    - [x] Show settings
    - [x] Update settings
    - [x] Delete survey
    - [ ] Create snapshot
    - [ ] Show snapshots
    - [ ] Delete snapshot
- [x] feat(backend): enable auth jwt
- [x] feat(backend): appshell
- [x] feat(backend): heroicons loader
- [x] feat(frontend): navbar
- [x] feat(backend): bun sqlite setup
- [x] refactor: don't use sync (bun.password, heroicons)
- [x] dev: enable client side javascript
- [x] feat(backend): entité survey

## Backlog

- Fixes

  - [ ] Fix: currently, serving build in production causes an error (call stack exceeded). Restore serving build file after <https://github.com/elysiajs/elysia/issues/643> has been fixed.

- Frontend

  - /:survey
    - [ ] component : homepage
    - [ ] component : profile
    - [ ] component : quiz
    - [ ] component : results
  - /admin/:id
    - [ ] open / close quiz
  - [ ] Cloud
    - [ ] /webhook/result : updates a snapshot
    - [ ] On delete survey, cleanup the cloud resources
  - [ ] Autoriser markdown <https://github.com/micromark/micromark> (safe: text formatting, lists, blockquotes, horizontal rules) pour personnaliser les sondages (description du sondage, description des questions) et les résultats
  - [ ] Mentions légales : politique de confidentialité
  - [ ] Téléchargement des résultats en PDF

- Backend

  - [ ] entité profile
  - [ ] entité response
  - [ ] entité comment
  - [ ] entité result
  - [ ] génération et exploitation des résultats de l'IA
  - [ ] cron: backup (data folder : database dump + assets)
  - [ ] cron: purge des sondages expirés
  - [ ] cleaner error handling
  - [ ] logging
  - [ ] jwtSecret rotation

- Environnement de développement

  - [ ] Architecture applicative fonctionnelle : (grokking simplicity + Effect ?)
  - [ ] dev: Live Reload backend / frontend pour une meilleur expérience de développement (NODE_ENV = development + bun --watch + SSE + XH Header full page reload)
  - [ ] CI/CD
    - [ ] Continuous Integration : Github actions : typecheck, lint, test, enforce conventional commit in the PR name and new changesets
    - [ ] Continuous delivery : Github release (changeset version and publish) + publish to ghcr.io
    - [ ] On-Demand Deployment level 1 : git pull + systemd daemon <https://bun.sh/guides/ecosystem/systemd>
    - [ ] On-Demand Deployment level 2 : docker compose
  - [ ] Tests
    - [ ] Tests unitaires
    - [ ] Tests d'intégration
    - [ ] Snapshots
    - [ ] tests E2E

- Environnement de production

  - [x] CDG : vm hôte
