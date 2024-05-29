# Todo

- categories: feat: feature, feat(backend): backend feature, feat(frontend): frontend feature, fix: bugfix, docs: documentation, dev: developer environment, refactor: refactoring, perf: performance, test: test

## sprintlog

- [x] feat(backend): appshell
- [x] feat(backend): heroicons loader
- [x] feat(frontend): navbar
- [-] feat: "administrer un sondage" (Fonctionnalité principale du sprint)
  - [-] "Nouveau sondage"
    - [x] Page
    - [x] Formulaire
    - [x] Validation serveur
    - [ ] Enregistrement en base et redirection vers page d'administration avec affichage du "code de sécurité"
  - [ ] "configurer un sondage"
  - [ ] "supprimer un sondage"
- [ ] backend: bun sqlite
- [ ] backend: survey model

## Backlog

- Frontend

  - [ ] Authentification : utiliser cookies / JWT signés pour identifier la session, l'utilisateur via son profil et gérer les ressources dynamiquement (streams, styles, etc.)
  - [ ] Mentions légales : politique de confidentialité
  - [ ] Page : personnaliser un sondage
  - [ ] Page : participer à un sondage - accueil : si absence de profil = page profil ; si profil mais pas de résultat = sondage et commentaires ; si profil et résultat = page résultat
  - [ ] Page : participer à un sondage - profil personnalisé
  - [ ] Page : participer à un sondage - sondage
  - [ ] Page : participer à un sondage - commentaire
  - [ ] Page : participer à un sondage - résultat

- Backend

  - [ ] Architecture applicative : Effect + grokking simplicity

- Environnement de développement

  - [ ] dev: Live Reload backend / frontend pour une meilleur expérience de développement (NODE_ENV = development + bun --watch + xh header + SSE Trigger Server Callbacks(script nonce + location.reload()))
  - [ ] CI/CD
    - [ ] Continuous Integration : Github actions : typecheck, lint, test, enforce conventional commit in the PR name and new changesets
    - [ ] Continuous delivery : Github release (changeset version and publish) + publish to ghcr.io
    - [ ] On-Demand Deployment : docker compose
  - [ ] Tests
    - [ ] Tests unitaires / intégration : bun test (jest ou vitest)
    - [ ] tests E2E (?) : playwright

- Environnement de production

  - [ ] Hôte : Docker compose
