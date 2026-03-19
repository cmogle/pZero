# Onboarding — Phoenix OS (IDA)

Quick path for Intellect Design Arena teams to run and contribute to Phoenix OS.

## Prerequisites

- Node.js ≥ 20
- pnpm 9 (`npm install -g pnpm@9`)

## Repo setup

```bash
git clone <repo-url>
cd pZero
pnpm install
```

## Environment

Copy required env for local development (values from your lead or infra doc; do not commit):

- `SUPABASE_URL` — Supabase project URL  
- `SUPABASE_SERVICE_ROLE_KEY` — Server-side only; never expose to client  

Create a `.env` in the repo root (or per deploy target). See [infrastructure.md](infrastructure.md) for project IDs and where to set vars in production (Vercel).

Optional:

- `PHOENIX_PROFILE` — `development` | `staging` | `ida` | `production`. Defaults to `development` when unset. Use `ida` for IDA-specific behaviour.

## Commands

| Command        | Purpose                          |
|----------------|----------------------------------|
| `pnpm install` | Install dependencies             |
| `pnpm lint`    | ESLint                           |
| `pnpm typecheck` | TypeScript check (all packages) |
| `pnpm test`    | Run tests (Vitest)               |
| `pnpm build`   | Build all packages               |
| `pnpm clean`   | Remove build outputs             |
| `pnpm run benchmark` | Run kernel/runtime benchmarks (optional) |

## Where to look

- **Architecture and decisions:** [docs/architecture/](architecture/) — ADR-001 (foundation), ADR-006 (core runtime), ADR-007 (design intelligence), ADR-008 (IDA integration).
- **Design system:** [packages/design-system/README.md](../packages/design-system/README.md) — tokens, typography, components.
- **UX and accessibility:** [docs/design/](design/) — IX principles, WCAG 2.1 AA, responsive breakpoints, component review checklist.
- **Infrastructure and security:** [docs/infrastructure.md](infrastructure.md), [docs/security.md](security.md).
- **Rollout:** [docs/rollout-plan.md](rollout-plan.md).

## Package layout

- `@pzero/kernel` — Core orchestration, process lifecycle, scheduler, IPC. No UI.
- `@pzero/runtime` — Execution environment, workflow engine, AI adapters, Phoenix Design API.
- `@pzero/app` — User-facing components and APIs.

Dependency direction: **app → runtime → kernel.**

## Who to contact

- **Product / scope:** CEO  
- **Technical / implementation:** Founding Engineer  
- **UX / design system:** UX Lead  

Blockers: raise in the appropriate channel or issue; escalate to CEO if blocked on product or architecture decisions.
