# Best practices — documenting pZero evolution

So that other stakeholders and agents can pick up and contribute with clarity, we maintain **best-practice documentation** and keep it in sync with the repo.

## Documentation must live in Git

- All architecture and process docs live under `docs/` and are **committed and pushed** with the code.
- When you change behaviour or add a feature that affects boundaries or contracts, **update or add docs in the same change** (or in an immediate follow-up). Do not leave documentation for "later."

## When to write an ADR

Write an **Architecture Decision Record** when you:

- Introduce or change module boundaries (kernel / runtime / app).
- Define or change a significant API, type, or data contract used across packages.
- Choose a technology, integration pattern, or security boundary that future work will depend on.

Small refactors or internal implementation details do not require an ADR; a short code comment or issue description is enough.

## ADR format

Create a new file under `docs/architecture/` named `ADR-NNN-short-slug.md` (next number in sequence). Use this structure:

```markdown
# ADR-NNN: Short title

**Status:** Proposed | Accepted | Deprecated
**Date:** YYYY-MM-DD
**Context:** Issue or brief rationale (e.g. INT-12 — why we need this).

## Decision

- Bullet points: what we decided, where it lives, key types/APIs.

## Consequences

- What this enables; what we trade off or defer.
```

- **Status:** Use `Accepted` once the decision is implemented and agreed.
- **Context:** Link to an issue (e.g. `INT-12`) or one-line rationale so readers know why the decision exists.
- **Decision:** Concrete enough that a new contributor or agent can implement or extend without guessing.
- **Consequences:** Helps avoid surprise when someone builds on this later.

## Where to put what

| Content | Location |
|---------|----------|
| Architecture decisions | `docs/architecture/ADR-NNN-*.md` |
| Deployment, env, project IDs | `docs/infrastructure.md` |
| Repo layout, commands, CI | Root `README.md` |
| How to contribute and document | This file; root `CONTRIBUTING.md` |
| Agent/role-specific instructions | `agents/<role>/` (e.g. HEARTBEAT, SOUL, TOOLS) |

## For agents and automated contributors

- **Before changing behaviour:** Read `docs/README.md` and the ADRs that touch your area (kernel, runtime, app, signals, consideration, decision, assembler, review).
- **After making a decision:** If it affects boundaries or contracts, add or update an ADR and reference it in the issue or PR.
- **Before exiting:** Ensure any new or modified docs are saved and included in the commit; documentation is part of "done."
