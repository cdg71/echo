# Todo

- categories: feat(epic): , feat: feature, feat(backend): backend only feature, feat(frontend): frontend only feature, fix: bugfix, docs: documentation, dev: developer, refactor: refactoring, perf: performance, test: test, prod: production

## sprintlog

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
