# pZero — Phoenix OS

Phoenix operating system for **Intellect Design Arena (IDA)**: a next-generation AI-native platform for intelligent design workflows.

## Repo structure

Monorepo (pnpm workspaces):

| Package        | Role |
|----------------|------|
| `@pzero/kernel` | Core orchestration, process lifecycle, module boundaries |
| `@pzero/runtime` | Runtime services, execution environment, integrations |
| `@pzero/app`     | User-facing workflows, APIs, entrypoints |

Dependency direction: **app → runtime → kernel**. See [docs/architecture/ADR-001-phase1-foundation.md](docs/architecture/ADR-001-phase1-foundation.md).

## Prerequisites

- Node.js ≥ 20
- pnpm 9

## Commands

```bash
pnpm install   # install dependencies
pnpm lint      # ESLint over packages
pnpm typecheck # TypeScript check (all packages)
pnpm test      # Vitest (all packages)
pnpm build     # Build all packages
pnpm clean     # Remove dist in all packages
```

## CI

GitHub Actions: on push/PR to `main`, runs install → lint → typecheck → test → build.

## Documentation

- **[docs/README.md](docs/README.md)** — Index of architecture (ADRs), best practices, and infrastructure. Start here to understand how pZero evolves.
- **[CONTRIBUTING.md](CONTRIBUTING.md)** — How to contribute and how we document decisions.

## Infrastructure

Vercel (hosting) and Supabase (data/auth) are configured for the project. Project IDs and required env vars (`SUPABASE_URL`, `SUPABASE_SERVICE_ROLE_KEY`) are documented in [docs/infrastructure.md](docs/infrastructure.md). Do not commit secrets; set them in Vercel and in local `.env` for dev.
