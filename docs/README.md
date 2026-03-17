# pZero documentation

Single entry point for the **evolution of the Phoenix OS** codebase. Use this when onboarding, contributing, or reasoning about architecture.

## Quick links

| Document | Purpose |
|----------|---------|
| [Architecture (ADRs)](architecture/) | Design decisions, module boundaries, and contracts |
| [Best practices](best-practices.md) | How we document, when to add ADRs, commit policy |
| [Infrastructure](infrastructure.md) | Deployment, env vars, project IDs (no secrets in repo) |
| [../README.md](../README.md) | Repo structure, commands, CI |

## Architecture (ADRs)

Decisions are recorded as **Architecture Decision Records** in `docs/architecture/`. Dependencies flow **app → runtime → kernel**.

| ADR | Summary |
|-----|---------|
| [ADR-001](architecture/ADR-001-phase1-foundation.md) | Phase 1 foundation — monorepo, packages, tech stack, CI |
| [ADR-002](architecture/ADR-002-signal-ingestion.md) | Signal ingestion and summarization for tracked accounts |
| [ADR-003](architecture/ADR-003-consideration-pass.md) | Consideration pass — map signal summary to playbooks |
| [ADR-004](architecture/ADR-004-assembler-action-artifact.md) | Assembler — stitch content blocks into Action artifact |
| [ADR-005](architecture/ADR-005-account-manager-review-approval.md) | Account Manager review and approval before handoff |

New decisions that affect module boundaries, APIs, or data flow should get a new ADR. See [best-practices.md](best-practices.md).

## For stakeholders and agents

- **Pick up context:** Start with this README, then the ADRs relevant to your task.
- **Contribute:** Follow [best-practices.md](best-practices.md); document decisions in ADRs or code comments; commit and push documentation with the code.
