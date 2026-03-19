# Security

Security practices and pre-launch checklist for Phoenix OS. **Validate at system boundaries; never introduce new trust boundaries without explicit review.**

## Environment and secrets

- **No secrets in repo.** No API keys, service role keys, or passwords in source or in committed config.
- **Server-only:** `SUPABASE_SERVICE_ROLE_KEY` must only be used in backend/server code. Never expose in client bundles or env exposed to the browser.
- **Client:** Use Supabase anon key and Row Level Security (RLS) for client-accessible data. All privileged operations go through backend APIs that use the service role.
- **Local:** `.env` is gitignored. Document required vars in [infrastructure.md](infrastructure.md) and [onboarding.md](onboarding.md); do not commit example values that look like real secrets.

## Supabase

- Enable RLS on all user-facing tables. Write policies that restrict access by tenant/user as required.
- Service role bypasses RLS; use only in trusted server-side code (API routes, cron, server actions). Audit any new usage.
- Prefer prepared statements / parameterized queries; avoid building SQL from user input.

## API and input

- Validate and sanitize at API boundaries. Type-check and bound-check all inputs from client or external systems.
- Use `@pzero/runtime` validation helpers at server boundaries: `validateString`, `validateRunId`, `validateRecord` (see `packages/runtime/src/validation.ts`). Return 400 with a clear message when validation fails.
- Do not trust client for authorization. Always resolve identity and permissions on the server.
- Rate limiting and abuse protection: configure at Vercel/edge or in API routes before production traffic.

## Dependencies

- Run `pnpm audit` periodically; fix high/critical findings before release.
- Prefer minimal dependencies; review new packages for known vulnerabilities and maintenance status.
- Lockfile is committed; CI uses `--frozen-lockfile` to avoid surprise upgrades.

## Pre-launch checklist

- [ ] No secrets in repo or in client bundles; env vars set only in Vercel and local `.env`.
- [ ] Supabase RLS enabled and tested for all relevant tables; service role used only server-side.
- [ ] Input validation and authorization enforced at all API boundaries.
- [ ] `pnpm audit` clean or only low-risk accepted with rationale.
- [ ] Dependency list reviewed; no unnecessary or unmaintained packages with known issues.
- [ ] Documentation updated (infrastructure, onboarding) with any new env or security-related steps.
