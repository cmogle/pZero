# ADR-002: Signal ingestion and summarization for tracked accounts

**Status:** Accepted  
**Date:** 2026-03-17  
**Context:** INT-11 — Ingest raw market signals for tracked accounts and generate a concise summary for the Consideration pass.

## Decision

- **Ownership:** Signal ingestion and summarization live in `@pzero/runtime` (execution environment and integrations). No kernel or app changes required for MVP.
- **Types:** `TrackedAccount`, `RawSignal`, `SignalSummary` in `packages/runtime/src/signals/types.ts`. Sources implement `SignalSource` (fetch by accounts + optional since/limit).
- **Net-new detection:** In-memory seen set keyed by `dedupeKey ?? id`. Production can replace with DB or cache.
- **One concrete source for MVP:** `mock-feed` — in-memory mock that returns one signal per account per fetch. Swap for a real feed/API when integrating.
- **Summarization:** Synchronous extractor from payload (title, body, type → headline, bullets, tags). Can be replaced by LLM later without changing the pipeline API.
- **Entry point:** `runSignalPipeline(source, accounts, options)` → `{ signals, summaries }`.

## Consequences

- App or cron can call `runSignalPipeline(createMockFeedSource(), accounts)` to get net-new signals and summaries.
- Adding a new source = implement `SignalSource`, pass to same pipeline.
- Persistence (e.g. Supabase) and playbook mapping are out of scope for this ADR; summaries are returned in memory.
