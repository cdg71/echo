# Todo

- categories: feat: feature, feat(backend): backend only feature, feat(frontend): frontend only feature, fix: bugfix, docs: documentation, dev: developer environment, refactor: refactoring, perf: performance, test: test

## sprintlog

- [-] feat: administrer un sondage (Fonctionnalité principale du sprint)
  - [-] Nouveau sondage
    - [x] Page
    - [x] Formulaire
    - [x] Validation serveur
    - [x] backend: survey model
    - [ ] Enregistrement en base et redirection vers page d'administration avec affichage du "code de sécurité"
  - [ ] configurer un sondage
  - [ ] supprimer un sondage
- [x] feat(backend): appshell
- [x] feat(backend): heroicons loader
- [x] feat(frontend): create survey navbar
- [ ] backend: bun sqlite

## Backlog

- Frontend

  - [ ] Identification : utiliser cookies signés pour identifier la session, l'utilisateur via son profil et gérer les ressources dynamiquement (streams, styles, etc.)
  - [ ] Mentions légales : politique de confidentialité
  - [ ] Page : personnaliser un sondage
  - [ ] Page : participer à un sondage - accueil : si absence de profil = page profil ; si profil mais pas de résultat = sondage et commentaires ; si profil et résultat = page résultat
  - [ ] Page : participer à un sondage - profil personnalisé
  - [ ] Page : participer à un sondage - sondage
  - [ ] Page : participer à un sondage - commentaire
  - [ ] Page : participer à un sondage - résultat

- Backend

  - [ ] génération et exploitation des résultats de l'IA
  - [ ] cron: backup
  - [ ] cron: purge des sondages expirés

- IA

  - [ ] formats de données attendus en entrée et en sortie
  - [ ] fournir un compte AWS à WhatsNext

- Environnement de développement

  - [ ] Architecture applicative : Effect + grokking simplicity
  - [ ] dev: Live Reload backend / frontend pour une meilleur expérience de développement (NODE_ENV = development + bun --watch + xh header + SSE Trigger Server Callbacks(script nonce + location.reload()))
  - [ ] CI/CD
    - [ ] Continuous Integration : Github actions : typecheck, lint, test, enforce conventional commit in the PR name and new changesets
    - [ ] Continuous delivery : Github release (changeset version and publish) + publish to ghcr.io
    - [ ] On-Demand Deployment : docker compose
  - [ ] Tests
    - [ ] Tests unitaires / intégration : bun test (jest ou vitest)
    - [ ] tests E2E : playwright

- Environnement de production

  - [ ] CDG : vm hôte
