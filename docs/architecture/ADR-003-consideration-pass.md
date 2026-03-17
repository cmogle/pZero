# ADR-003: Consideration pass — map signal summary to codified playbooks

**Status:** Accepted  
**Date:** 2026-03-17  
**Context:** INT-12 — Map the signal summary against codified playbooks and account context so the Decision step can select the right playbook and content blocks.

## Decision

- **Ownership:** Consideration pass lives in `@pzero/runtime` alongside signals. New module `packages/runtime/src/consideration/`.
- **Input:** Structured `SignalSummary` (from ADR-002). **Context:** `AccountContext` — accountId, playbooks, content library (Map or Record of id → ContentBlockRef).
- **Types:** `Playbook` (id, name, triggerTags, contentBlockIds), `ContentBlockRef` (id, label, kind?), `ConsiderationResult` (summary, playbookCandidates, contentBlockCandidates).
- **Resolver:** `mapSummaryToConsideration(summary, context)` → ConsiderationResult. Matching is tag-based: any playbook whose `triggerTags` intersect the summary’s `tags` is a candidate; content block candidates are the union of blocks from those playbooks, resolved from context’s content library. AccountId must match context or result is empty.
- **Output:** Representation suitable for the Decision engine: same summary plus arrays of playbook and content-block candidates (deduplicated by block id).

## Consequences

- Pipeline can run signals → summaries → consideration in sequence; Decision consumes ConsiderationResult.
- Playbooks and content library are supplied by the caller (in-memory for MVP; can be replaced by DB or config service without changing the resolver API).
- No persistence in this ADR; Consideration is pure resolution from summary + context.
