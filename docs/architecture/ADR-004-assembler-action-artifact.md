# ADR-004: Assembler — stitch blocks into Action artifact

**Status:** Accepted  
**Date:** 2026-03-17  
**Context:** INT-14 — Atomic content assembly (Assembler model): stitch blocks into Action artifact.

## Decision

- **Ownership:** Assembler lives in `@pzero/runtime`, new module `packages/runtime/src/assembler/`.
- **Input:** `AssemblerInput` — `DecisionResult` (with `selectedBlockIds`) plus `ContentLibrary` (id → `ContentBlock`). `ContentBlock` extends `ContentBlockRef` with `body: string` (pre-approved IP).
- **Output:** `ActionArtifact | null` — when `shouldRespond` is true and blocks are resolved: `{ kind, body, sourceBlockIds }`. `body` is blocks stitched in selection order (double-newline separated). Null when no response or no blocks.
- **Behaviour:** Retrieve selected blocks from library (Record or Map), concatenate bodies in order. No bulk LLM generation; optional connective tissue left for a future pass. Missing blocks are skipped; only resolved blocks appear in `sourceBlockIds` and `body`.
- **Traceability:** `sourceBlockIds` lists blocks that were assembled for HITL and audit.

## Consequences

- Pipeline can run: signals → consideration → decision → **assembler** → Action artifact ready for human review.
- Content library for assembly must expose full blocks (ref + body); Consideration/Decision continue to use refs-only where sufficient.
- Connective tissue (e.g. personalized opening) can be added in a later ADR without changing the core stitch contract.
