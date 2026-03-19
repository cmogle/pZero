# ADR-008: Phase 5 — IDA Integration & Launch

**Status:** Accepted  
**Date:** 2026-03-18  
**Context:** INT-6 — Production deployment and handoff of Phoenix OS to Intellect Design Arena.

## Decision

1. **Deployment infrastructure**
   - Production hosting: Vercel (per ADR-001). Supabase for data and auth. No secrets in repo; env vars in Vercel and local `.env`.
   - CI (GitHub Actions) runs lint, typecheck, test, build on push/PR to `main`. Production deploy is triggered by Vercel on merge to `main` when a deployable app (e.g. Next.js) is present; until then, CI is the gate and docs/infrastructure.md is the deployment reference.
   - Add optional `pnpm run benchmark` for performance regression visibility; results are local/CI-only in this phase.

2. **Security hardening**
   - Document security practices in `docs/security.md`: env handling, Supabase RLS/service role usage, no client-side secrets, dependency hygiene, and a pre-launch checklist.
   - All server-side Supabase access uses service role only in backend; client uses anon key and RLS. Validate at API boundaries; no new trust boundaries without explicit review.

3. **IDA-specific configuration profiles**
   - Support profile via env: `PHOENIX_PROFILE=ida` (or `development` | `staging` | `production`). Runtime and app read profile to toggle features (e.g. stricter timeouts, IDA branding, feature flags). Default: `development` when unset.
   - Config lives in code (no secret config in repo); IDA-specific overrides (e.g. API endpoints) via env vars documented in onboarding.

4. **Performance benchmarking**
   - Add `packages/kernel` and optionally `packages/runtime` benchmark scripts (Vitest or small Node script) that run critical paths (e.g. process create/start, scheduler tick, channel send/receive) and log timings. Run in CI as a non-blocking job or via `pnpm run benchmark` for local/periodic checks.
   - Goal: establish baseline and catch regressions; no SLA numbers in this phase.

5. **Onboarding and rollout**
   - **Onboarding**: `docs/onboarding.md` — repo setup, env vars, running locally, where to find design system and ADRs, who to contact (CEO/Founding Engineer).
   - **Rollout**: `docs/rollout-plan.md` — phased plan: Phase A (internal dogfood), Phase B (IDA pilot team), Phase C (broader IDA production). Criteria and rollback per phase.

## Consequences

- Single source of truth for deployment, security, config, and rollout. IDA team can onboard and operate Phoenix with minimal ambiguity.
- Profile-based config keeps IDA vs generic behaviour explicit without branching. Benchmark script gives a baseline for future performance work.
- Security doc and checklist reduce risk at handoff; rollout plan sets expectations for phased go-live.
