# pZero documentation

Single entry point for the **evolution of the Phoenix OS** codebase. Use this when onboarding, contributing, or reasoning about architecture.

## Quick links

| Document | Purpose |
|----------|---------|
| [Architecture (ADRs)](architecture/) | Design decisions, module boundaries, and contracts |
| [Best practices](best-practices.md) | How we document, when to add ADRs, commit policy |
| [Infrastructure](infrastructure.md) | Deployment, env vars, project IDs (no secrets in repo) |
| [Security](security.md) | Security practices and pre-launch checklist |
| [Onboarding](onboarding.md) | IDA team setup, env, commands, who to contact |
| [Rollout plan](rollout-plan.md) | Phased rollout (internal → pilot → production) |
| [Design system](../packages/design-system/README.md) | Color tokens, typography, spacing, elevation, component conventions |
| [Design docs](design/) | IX principles, accessibility (WCAG 2.1 AA), responsive breakpoints, component review checklist |
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
| [ADR-006](architecture/ADR-006-phase2-core-runtime.md) | Phase 2 core runtime — process, scheduler, IPC, memory |
| [ADR-007](architecture/ADR-007-phase3-design-intelligence.md) | Phase 3 design intelligence — workflow engine, AI adapters, Design API |
| [ADR-008](architecture/ADR-008-phase5-ida-integration-launch.md) | Phase 5 IDA integration & launch — deployment, security, config, rollout |

New decisions that affect module boundaries, APIs, or data flow should get a new ADR. See [best-practices.md](best-practices.md).

## Design

UX/IX and visual design decisions are documented in `docs/design/`.

| Document | Summary |
|----------|---------|
| [IX principles](design/ix-principles.md) | Minimal-clicks rule, key workflow specs, navigation and feedback patterns |
| [Accessibility](design/accessibility.md) | WCAG 2.1 AA checklist, keyboard nav, ARIA conventions, testing guide |
| [Responsive breakpoints](design/responsive.md) | Mobile-first layout system, 320px–1440px+ |
| [Component review checklist](design/component-review-checklist.md) | Required gate before any UI is submitted for review |
| [Developer docs UX](design/developer-docs-ux.md) | IA, layouts, code sample standards, and nav patterns for SDK/CLI docs (INT-25) |

The design system tokens (color, type, spacing) live in [`packages/design-system/README.md`](../packages/design-system/README.md).

## For stakeholders and agents

- **Pick up context:** Start with this README, then the ADRs relevant to your task.
- **Build UI:** Read the [design system](../packages/design-system/README.md) and run the [component review checklist](design/component-review-checklist.md) before submitting work.
- **Contribute:** Follow [best-practices.md](best-practices.md); document decisions in ADRs or code comments; commit and push documentation with the code.
