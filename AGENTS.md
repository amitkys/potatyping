# Repository Guidelines

## Project Structure & Module Organization
This repository is a Next.js 15 App Router app written in TypeScript. Pages and route segments live in `app/`, including the main page in `app/page.tsx`, the keyboard screen in `app/keyboard/page.tsx`, and a test area in `app/test/`. Shared UI components live in `components/`, with primitives under `components/ui/`. Reusable logic belongs in `lib/`, including layouts, Prisma access, and Zustand state. Static assets live in `public/`. Database schema and migrations are stored in `prisma/`.

## Build, Test, and Development Commands
Use Bun for package management and scripts.

- `bun install`: install dependencies from `bun.lock`.
- `bun run dev`: start the local dev server with Turbopack on `http://localhost:3000`.
- `bun run build`: generate the Prisma client and build the app for production.
- `bun run start`: run the production build locally.
- `bunx eslint .`: run lint checks; there is no dedicated `lint` script yet.
- `bunx prettier --check .`: verify formatting before opening a PR.

## Coding Style & Naming Conventions
Follow `eslint.config.mjs`. Use 2-space indentation, keep imports grouped, and remove unused imports. Prefer TypeScript for new code. Use `PascalCase` for React components, `camelCase` for functions and variables, and lowercase names for route folders in `app/`. Keep route-specific UI close to its route; move shared logic into `components/` or `lib/`.

## Testing Guidelines
There is no formal automated test suite yet. At minimum, run `bunx eslint .` and `bun run build` before submitting changes. If you add tests, place them near the feature they cover and use descriptive names such as `useTypingStore.test.ts`. Add the matching test command to `package.json` when introducing a test runner.

## Commit & Pull Request Guidelines
Recent commits use short summaries such as `keyboard building` and `image added for typing`. Keep commit messages brief and imperative, but clearer than the current history, for example `add inscript keyboard layout`. PRs should include a concise description, linked issues when applicable, setup or schema notes, and screenshots or recordings for UI changes.

## Configuration Notes
`prisma/schema.prisma` uses PostgreSQL through `DATABASE_URL`. Do not commit secrets. If you change Prisma models, include the migration and confirm `bun run build` still succeeds.
