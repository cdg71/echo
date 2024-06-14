# Todo

- categories: feat(epic): , feat: feature, feat(backend): backend only feature, feat(frontend): frontend only feature, fix: bugfix, docs: documentation, dev: developer, refactor: refactoring, perf: performance, test: test, prod: production

## sprintlog

- feat(frontend) : survey public pages
  - [x] feat : appshell
  - [x] feat(backend) : Autoriser markdown <https://github.com/micromark/micromark> (safe: text formatting, lists, blockquotes, horizontal rules) pour personnaliser les sondages (description du sondage, description des questions) et les résultats
  - [x] feat(backend) : manual seed script
  - [x] feat : pages placeholders
  - [x] feat : survey public home page
  - [x] feat : 404 page
  - [ ] feat : survey public profile page
  - [ ] feat : survey public quiz page
  - [ ] feat : survey public results page
- [ ] prod: deployment via git pull + systemd daemon <https://bun.sh/guides/ecosystem/systemd>

## Backlog

- Frontend

  - /admin/:id
    - [ ] open / close quiz
    - [ ] poll snapshot status dynamically
    - [ ] confirm snapshot delete with a dialog
  - [ ] Cloud
    - [ ] /webhook/result : updates a snapshot
    - [ ] On delete survey, cleanup the cloud resources
  - [ ] Mentions légales : politique de confidentialité
  - [ ] Téléchargement des résultats en PDF

- Backend

  - [ ] entité profile
  - [ ] entité response
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
    - [ ] On-Demand Deployment level 2 : docker compose
  - [ ] Tests
    - [ ] Tests unitaires
    - [ ] Tests d'intégration
    - [ ] Snapshots
    - [ ] tests E2E

- Environnement de production

  - [ ] CDG : setup de production

- Fixes / Refactor

  - [ ] Fix: currently, serving build in production causes an error (call stack exceeded). Restore serving build file after <https://github.com/elysiajs/elysia/issues/643> has been fixed.
  - [ ] Refactor the API to use proper HTTP ACTION VERBS for the entities CRUD actions : (GET POST PUT DELETE) => PUT /resource/:id = update, PUT /resource = POST /resource = create
  - [ ] auth with access and refresh token instead of just an access token
  - [ ] refactor API : separate /admin /survey /auth routes
  - [ ] better components cutting
  - [ ] setup process : system dependencies (unzip, gh, bun), create missing folders (data > assets), create .env file (port 80), seed if needed, service registration
