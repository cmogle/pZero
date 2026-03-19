# Phoenix OS — Phased rollout plan

Plan for bringing Phoenix OS to production at Intellect Design Arena. Each phase has clear criteria and rollback.

## Phase A — Internal dogfood

**Goal:** pZero team and IDA liaison use Phoenix daily; core workflows are stable.

**Scope:**

- Deploy to staging (Vercel + Supabase). Access limited to internal team.
- Run design workflows end-to-end: start workflow, AI step, review, artifact.
- Use IDA config profile (`PHOENIX_PROFILE=ida`) and document any IDA-specific env or endpoints.

**Entry criteria:**

- CI green (lint, typecheck, test, build). Security checklist ([docs/security.md](security.md)) signed off.
- Onboarding doc and infrastructure doc up to date. Staging env vars set.

**Exit criteria:**

- No P0/P1 bugs open for 1 week. At least 2 people have run full workflow on staging.
- Rollback: revert deploy; no data migration required in this phase.

---

## Phase B — IDA pilot team

**Goal:** Selected IDA users run real design jobs on Phoenix; feedback and metrics collected.

**Scope:**

- Production deployment (or pilot subdomain) with RLS and auth. Pilot user list maintained by IDA.
- Onboarding doc and support channel (e.g. Slack/Teams) active. Performance baseline from `pnpm run benchmark` recorded.

**Entry criteria:**

- Phase A exit criteria met. Pilot user list and support process agreed with IDA.
- Rate limiting and abuse protection in place. Monitoring/alerting defined (e.g. Vercel + Supabase dashboards).

**Exit criteria:**

- Pilot users have completed design workflows without critical issues for 2 weeks. Feedback incorporated or logged for next phase.
- Rollback: disable pilot access; preserve data for post-mortem if needed.

---

## Phase C — Broader IDA production

**Goal:** Phoenix OS is the default (or option) for IDA design workloads; handoff complete.

**Scope:**

- Full production rollout per IDA rollout schedule. Documentation and runbooks updated. pZero provides support per agreed SLA; knowledge transfer to IDA ops where applicable.

**Entry criteria:**

- Phase B exit criteria met. IDA sign-off on launch. Rollback and incident process documented.

**Exit criteria:**

- Stable production traffic. Ownership and support model agreed. Phase 5 (IDA Integration & Launch) closed.

---

## Rollback (any phase)

- **Deploy rollback:** Revert to previous Vercel deployment; switch env or feature flag if needed.
- **Data:** Phase A/B use staging or pilot DB; no destructive migration. Phase C: define backup/restore and data ownership before go-live.
- **Comms:** Notify pilot/production users and IDA stakeholders per incident process.
