# Todo

- categories: feat(epic): , feat: feature, feat(backend): backend only feature, feat(frontend): frontend only feature, fix: bugfix, docs: documentation, dev: developer, refactor: refactoring, perf: performance, test: test, prod: production

## sprintlog

- [ ] Modifier le sondage de test pour qu'il devienne le sondage du 21/6
- [x] fix alerts glitch
- [ ] /admin/:id
  - [ ] A la création d'un snapshot, lancer la génération dans le cloud
- [ ] extraire les données d'un snapshot
- [ ]
- [ ] PUT /webhook/complete/:snapshotId : marquer le snapshot comme terminé
- [ ] feat(frontend) : page des quiz
  - [ ] Adapter l'UI pour 1 seul jeu de réponses
- [ ] feat(frontend) : page des résultats
  - [x] maquette
  - [ ] si aucun snapshot nodata sinon on sélectionne le dernier snapshot par défaut
  - [ ] Carousel
  - [ ] Graphique dynamique
  - [ ] Résumé

## Backlog

- Features

  - [ ] PUT /webhook/complete/:snapshotId : check key in bearer header
  - [ ] On ne peut pas demander la génération de plus d'un snapshot à la fois pour un sondage donné. Si un sondage est en cours d'analyse, le bouton de création de snapshot est désactivé.

- Frontend

  - /admin/:id
    - [ ] open / close quiz
    - [ ] poll snapshot status dynamically
    - [ ] confirm snapshot delete with a dialog
  - [ ] Mentions légales : politique de confidentialité
  - [ ] Téléchargement des résultats en PDF
  - Si mon profil est vide, les pages quiz et résultat ne sont pas accessibles

- Backend

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
  - [ ] On survey deletion, cleanup the cloud resources

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
