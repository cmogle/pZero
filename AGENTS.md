# Repository Guidelines

## Project Structure & Module Organization

`pZero` is a `pnpm` workspace monorepo. Core libraries live in `packages/`: `kernel` for orchestration primitives, `runtime` for execution services, `app` for user-facing workflows, `sdk` for typed integrations, and `cli` for the `phoenix` command. The demo app lives in `apps/demo` (Next.js). Architecture and ADRs live in `docs/`; agent-specific reference material lives under `agents/`. Source files are in each package's `src/` directory, and generated build output goes to `dist/` and should not be edited manually.

## Build, Test, and Development Commands

Use Node 20+ with `pnpm@9`.

- `pnpm install`: install workspace dependencies.
- `pnpm lint`: run root ESLint checks for `packages/**/*.ts`.
- `pnpm typecheck`: run `tsc --noEmit` across all workspaces.
- `pnpm test`: run Vitest suites across packages.
- `pnpm build`: compile all packages to `dist/`.
- `pnpm benchmark`: build and benchmark `@pzero/kernel`.
- `pnpm --filter @pzero/demo dev`: start the demo at `http://localhost:3000`.
- `pnpm --filter @pzero/demo lint`: lint the Next.js app specifically.

## Coding Style & Naming Conventions

TypeScript is strict and uses ESM with `NodeNext`; keep local imports in source as `./file.js`. Follow the existing 2-space indentation and prefer small, typed modules. Use `PascalCase` for classes and React components, `camelCase` for functions and variables, and `kebab-case` for docs such as `docs/architecture/ADR-001-phase1-foundation.md`. Keep package boundaries aligned with the dependency rule `app -> runtime -> kernel`.

## Testing Guidelines

Vitest is the test runner. Place tests next to implementation in `src/` using `*.test.ts` naming, for example `packages/runtime/src/signals/signals.test.ts`. Cover new behavior at the package level you changed, and run `pnpm test` plus any focused package command before opening a PR.

## Commit & Pull Request Guidelines

Recent history uses short conventional subjects such as `docs: ...` and `chore: ...`; keep that format and include issue IDs when relevant, e.g. `docs: update runtime ADR (INT-18)`. PRs should describe the behavioral change, list affected packages, link the issue, and include screenshots for `apps/demo` UI changes. If you change architecture, contracts, or workflows, update the relevant docs or ADRs in the same PR.

## Security & Configuration Tips

Do not commit secrets. Keep local configuration in `.env`, and treat Supabase and Vercel credentials as external configuration documented in `docs/infrastructure.md`.
