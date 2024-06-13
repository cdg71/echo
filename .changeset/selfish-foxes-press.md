---
"echo.cdg71.fr": minor
---

This release includes the initial setup and configuration for the frontend, backend, and development environment, ensuring a solid foundation for the project.

- Frontend:

  - Established app shell structure.
  - Replaced React with HTMX.
  - Integrated Tailwind CSS with DaisyUI components and Heroicons.

- Backend:

  - Selected Elysia as the web server.
  - Added essential plugins: CORS, Helmet, Tailwind, HTMX, Stream.
  - Implemented Server-Sent Events for real-time data push.

- Development Environment:

  - Configured GitHub CLI.
  - Set up runtime with Bun.
  - Using Bun as the package manager.
  - Transpiling TypeScript with Bun.
  - Bundling with Bun.
  - Initialized GitHub repository and settings.
  - Implemented Semantic Versioning.
  - Configured Changesets for maintaining changelogs.
  - Adopted Conventional Commits for consistent commit messages.
  - Enabled GitHub Flow with main branch protection rules.
  - Configured static tests with typescript, ESLint and Prettier.
