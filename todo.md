# Todo

## sprintlog

## Backlog

- Frontend

  - [ ] Authentification : utiliser cookies / JWT signés pour identifier la session, l'utilisateur via son profil et gérer les ressources dynamiquement (streams, styles, etc.)
  - [ ] Mentions légales : politique de confidentialité
  - [ ] Page : créer un sondage
  - [ ] Page : personnaliser un sondage
  - [ ] Page : participer à un sondage - accueil : si absence de profil = page profil ; si profil mais pas de résultat = sondage et commentaires ; si profil et résultat = page résultat
  - [ ] Page : participer à un sondage - profil personnalisé
  - [ ] Page : participer à un sondage - sondage
  - [ ] Page : participer à un sondage - commentaire
  - [ ] Page : participer à un sondage - résultat

- Backend

  - [ ] Base de données : bun sqlite
  - [ ] Base de données => accessible par le store Elysia ?
  - [ ] Architecture applicative : Effect + grokking simplicity

- Environnement de développement

  - [ ] CI/CD
    - [ ] Continuous Integration : Github actions : typecheck, lint, test, enforce conventional commit in the PR name and new changesets
    - [ ] Continuous delivery : Github release (changeset version and publish) + publish to ghcr.io
    - [ ] On-Demand Deployment : docker compose
  - [ ] Tests
    - [ ] Tests unitaires / intégration : bun test (jest ou vitest)
    - [ ] tests E2E (?) : playwright

- Environnement de production

  - [ ] Hôte : Docker compose
