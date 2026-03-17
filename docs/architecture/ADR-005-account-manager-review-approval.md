# ADR-005: Account Manager review and approval flow

**Status:** Accepted  
**Date:** 2026-03-17  
**Context:** INT-15 — Account Manager must review Decision logic, verify assembled content, and approve with zero-to-minimal editing. No autonomous send without approval.

## Decision

- **Review payload:** Runtime exposes `ReviewPayload`: `{ decision: DecisionResult, artifact: ActionArtifact }`. Decision carries reasoning (e.g. "Because [Signal], we are triggering Playbook X"); artifact is the drafted body and sourceBlockIds. App layer builds this via `buildReviewPayload(decision, artifact)` for presentation to the user.
- **Verdicts:** `ReviewVerdict` = `approved` (optional `editedBody`) | `rejected` (optional `reason`) | `edit` (required `body`). `submitReview(payload, verdict)` returns `ReviewResult` with `handoffBody` only when approved or edit; rejected yields no handoff.
- **Handoff boundary:** Execution (send, queue job, etc.) is **not** invoked by runtime. App layer calls `submitReviewAndHandoff(payload, verdict, handoff)`; the provided `ExecutionHandoff` is invoked only when the verdict is approved or edit, with `{ body, kind, sourceBlockIds }`. No autonomous send without human approval.
- **Ownership:** Review types and `submitReview` live in `@pzero/runtime` (`packages/runtime/src/review/`). App layer provides `buildReviewPayload`, `submitReviewAndHandoff`, and any UI/API that presents the payload and collects the verdict.

## Consequences

- Account Manager sees decision logic and drafted content; can approve, reject, or edit with minimal friction.
- Approved/edited actions flow to execution only via explicit handoff; runtime never sends.
- Future UI or API routes can render `ReviewPayload` and call `submitReview` / `submitReviewAndHandoff` with a chosen handoff implementation.
