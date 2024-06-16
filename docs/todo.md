# Todo

- categories: feat(epic): , feat: feature, feat(backend): backend only feature, feat(frontend): frontend only feature, fix: bugfix, docs: documentation, dev: developer, refactor: refactoring, perf: performance, test: test, prod: production

## sprintlog

- feat(frontend) : survey public pages
  - [x] prod: setup de l'environnement de production on-prem ; déploiement par git pull + systemd daemon <https://bun.sh/guides/ecosystem/systemd>
  - [x] refactor : appshell
  - [x] feat(backend) : Autoriser markdown <https://github.com/micromark/micromark> (safe: text formatting, lists, blockquotes, horizontal rules) pour personnaliser les sondages (description du sondage, description des questions) et les résultats
  - [x] feat : 404 page
  - [x] feat(backend) : manual seed script
  - [x] feat : nodata component
  - [x] feat : survey public home page
  - [x] fix : remove cors & helmet plugin. they are nginx responsibilities
  - [x] feat: profile page
    - [x] feat(backend) : entité profile
    - [x] feat: cookie for profile tracking
    - [x] feat : profile read / update
    - [x] feat(backend) : profile test data
  - [ ] feat : survey public quiz page
    - [x] feat(backend): entité Response
    - [ ] feat : response read / update
    - [ ] feat(backend): Response test data
  - [ ] feat : survey public results page => sexy cloud result

## Backlog

- Frontend

  - /admin/:id
    - [ ] On snapshot creation, call the cloud inference
    - [ ] open / close quiz
    - [ ] poll snapshot status dynamically
    - [ ] confirm snapshot delete with a dialog
  - [ ] Mentions légales : politique de confidentialité
  - [ ] Téléchargement des résultats en PDF
  - Si mon profil est vide, les pages quiz et résultat ne sont pas accessibles

- Backend

  - [ ] entité response
  - [ ] génération et exploitation des résultats de l'IA
  - [ ] cron: backup (data folder : database dump + assets)
  - [ ] cron: purge des sondages expirés
  - [ ] cleaner error handling
  - [ ] logging
  - [ ] jwtSecret rotation

- Cloud

  - [ ] Cloud inference should be orchestrated in parallel
  - [ ] Cloud should have some kind of auth limiting its access to the on-prem server (API KEY ?)
  - [ ] Rationaliser les imports js du cloud : nom de la route, dépendances adaptées (bootstrap ? jquery ?)
  - [ ] poncer les angles à l'affichage : utiliser daisyUI, padding supérieur pour ménager la navbar
  - [ ] pas de footer ! cdg71
  - [ ] /webhook/result : updates a snapshot when it is ready
  - [ ] On delete survey, cleanup the cloud resources
  - [ ] IA - Les textes et images générés incluent la thématique mais ne reflètent pas beaucoup l'opinion de la question sélectionnée
  - [ ] Retravailler l'affichage des résultats

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

  - [ ] Proxy : rev proxy du cloud + le cloud ne répond qu'aux IP du CDG

- Fix / Refactor

  - [ ] Fix: currently, serving build in production causes an error (call stack exceeded). Restore serving build file after <https://github.com/elysiajs/elysia/issues/643> has been fixed.
  - [ ] Refactor the API to use proper HTTP ACTION VERBS for the entities CRUD actions : (GET POST PUT DELETE) => PUT /resource/:id = update, PUT /resource = POST /resource = create
  - [ ] auth with access and refresh token instead of just an access token
  - [ ] refactor API : separate /admin /survey /auth routes
  - [ ] better components cutting
  - [ ] setup process : system dependencies (unzip, gh, bun), create missing folders (data > assets), create .env file (port 80), seed if needed, service registration
  - fragments caching <https://htmx.org/docs/#caching> : redirect to parent page
