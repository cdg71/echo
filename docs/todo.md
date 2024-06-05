# Todo

- categories: feat(epic): , feat: feature, feat(backend): backend only feature, feat(frontend): frontend only feature, fix: bugfix, docs: documentation, dev: developer environment, refactor: refactoring, perf: performance, test: test

## sprintlog

- [-] feat: administrer un sondage (Fonctionnalité principale du sprint)
  - [x] /new: Créer un nouveau sondage
  - [-] /admin: gérer un sondage
    - [x] login
    - [x] logout
    - [ ] JSON Settings
    - [ ] Snapshots
    - [ ] Delete survey
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

  - [ ] Les types Typebox composants devraient être utilisés systématiquement lorsque c'est possible. la fonction getStaticType devrait être réservées aux functions d'origine tierce dont le type ne peut pas être personnalisé, par exemple dans les DAOs juste avant l'accès en base

- Frontend

  - [ ] /admin/:id

    - [ ] Form to handle settings

  - [ ] /:survey
    - [ ] component : homepage
    - [ ] component : profile
    - [ ] component : comments
    - [ ] component : results
  - [ ] /result-webhook
  - [ ] Autoriser markdown <https://github.com/micromark/micromark> (safe: text formatting, lists, blockquotes, horizontal rules) pour personnaliser les sondages (description du sondage, description des questions) et les résultats
  - [ ] Mentions légales : politique de confidentialité
  - [ ] Téléchargement des résultats en PDF

- Backend

  - [ ] entité respondent
  - [ ] entité response
  - [ ] entité comment
  - [ ] entité result
  - [ ] génération et exploitation des résultats de l'IA
  - [ ] cron: backup (data folder : database dump + assets)
  - [ ] cron: purge des sondages expirés
  - [ ] error handling
  - [ ] logging
  - [ ] jwtSecret rotation

- Environnement de développement

  - [ ] Architecture applicative : Effect + grokking simplicity
  - [ ] dev: Live Reload backend / frontend pour une meilleur expérience de développement (NODE_ENV = development + bun --watch + xh header + SSE Trigger Server Callbacks(script nonce + location.reload()))
  - [ ] CI/CD
    - [ ] Continuous Integration : Github actions : typecheck, lint, test, enforce conventional commit in the PR name and new changesets
    - [ ] Continuous delivery : Github release (changeset version and publish) + publish to ghcr.io
    - [ ] On-Demand Deployment : docker compose
  - [ ] Tests
    - [ ] Tests unitaires
    - [ ] Tests d'intégration
    - [ ] Snapshots
    - [ ] tests E2E

- Environnement de production

  - [ ] CDG : vm hôte
