# Todo

- categories: feat: feature, feat(backend): backend only feature, feat(frontend): frontend only feature, fix: bugfix, docs: documentation, dev: developer environment, refactor: refactoring, perf: performance, test: test

## sprintlog

- [-] feat: administrer un sondage (Fonctionnalité principale du sprint)
  - [x] Créer un nouveau sondage
    - [x] Route /new
    - [x] Formulaire
    - [x] Validation serveur
    - [x] Entité survey
    - [x] Enregistrement en base
    - [x] Affichage unique du code d'administration à la première visite
  - [-] gérer un sondage
    - [x] Accès sécurisé par un JWT à la page d'administration
    - [x] Déconnexion
    - [ ] Settings
    - [ ] Quiz
    - [ ] Snapshots
    - [ ] supprimer un sondage
- [x] feat(backend): appshell
- [x] feat(backend): heroicons loader
- [x] feat(frontend): create survey navbar
- [x] feat(backend): bun sqlite
- [x] perf: use async (bun.password, heroicons)
- [x] dev: enable client side javascript

## Backlog

- Fixes

  - [ ] Les types Typebox composants devraient être utilisés systématiquement lorsque c'est possible. la fonction getStaticType devrait être réservées aux functions d'origine tierce dont le type ne peut pas être personnalisé, par exemple dans les DAOs juste avant l'accès en base

- Frontend

  - [-] /admin
    - [ ] component : settings
    - [ ] component : quiz
    - [ ] component : snapshots
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

  - [-] entité survey
    - [x] DTO : createSurvey
    - [x] DTO : surveySettings
  - [ ] entité respondent
  - [ ] entité response
  - [ ] entité comment
  - [ ] entité result
  - [ ] génération et exploitation des résultats de l'IA
  - [ ] cron: backup (data folder : database dump + assets)
  - [ ] cron: purge des sondages expirés
  - [ ] error handling
  - [ ] logging

- IA

  - [ ] formats de données attendus en entrée et en sortie
    - [ ] Markdown accepté pour formater la réponse de l'IA
    - [ ] Définition du contexte du sondage pour augmenter la génération
    - [ ] Minimiser les coûts : bucket S3 24h
  - [ ] fournir un compte AWS à WhatsNext

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
