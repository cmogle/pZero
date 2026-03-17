# Contributing to pZero

## Documentation and context

- **Architecture and evolution:** Start at [docs/README.md](docs/README.md). It indexes all ADRs and points to infrastructure and best-practice docs.
- **How we document:** [docs/best-practices.md](docs/best-practices.md) — when to add an ADR, format, and the rule that documentation is committed and pushed with the code.

Stakeholders and agents: read the docs index and relevant ADRs before changing behaviour; add or update ADRs when you make decisions that affect module boundaries or contracts.

## Development

- **Setup:** `pnpm install` (Node ≥20, pnpm 9).
- **Checks:** `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build` — see [README.md](README.md).
- **CI:** GitHub Actions run the same on push/PR to `main`.

Keep documentation in sync with your changes; commit and push docs in the same MR as the code.
