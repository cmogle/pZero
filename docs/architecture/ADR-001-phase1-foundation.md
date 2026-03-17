# ADR-001: Phase 1 foundation — monorepo and module boundaries

**Status:** Accepted  
**Date:** 2026-03-17  
**Context:** INT-2 — Bootstrap Phoenix OS repo, tech stack, and core architecture.

## Decision

- **Monorepo**: pnpm workspaces with three packages: `@pzero/kernel`, `@pzero/runtime`, `@pzero/app`.
- **Tech stack**: TypeScript (ES2022, NodeNext), Vitest, ESLint, Prettier. Node ≥20.
- **CI/CD**: GitHub Actions — install, lint, typecheck, test, build on push/PR to `main`.
- **Module boundaries**:
  - **Kernel**: Core orchestration, process lifecycle, and platform primitives. No UI; minimal external deps.
  - **Runtime**: Execution environment, service APIs, and integrations (e.g. AI/ML, external systems). Depends on kernel where needed.
  - **App**: User-facing workflows, APIs, and entrypoints. May depend on runtime and kernel.

Dependencies flow one way: app → runtime → kernel. Kernel does not depend on runtime or app.

- **Deployment**: Vercel for hosting. Supabase for data and auth. Env vars (e.g. `SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`) are set in Vercel and in local `.env`; see [../infrastructure.md](../infrastructure.md).

## Consequences

- Clear ownership and import boundaries; kernel stays lean for future Rust/Go hot paths if needed.
- Single lockfile and shared tooling; CI runs across all packages.
- Further ADRs will detail kernel APIs, runtime service contracts, and app surface.
