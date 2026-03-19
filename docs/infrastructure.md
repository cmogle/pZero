# Infrastructure

Deployment and backend are configured as follows. **Do not commit secrets;** env vars are set in Vercel (and locally in `.env` for dev).

## Projects

| Provider  | Purpose   | Project ID / reference |
|-----------|-----------|-------------------------|
| Vercel    | Hosting   | `prj_T96WUHbbbJqJ2FD3Yn5NKrTCiGoU` |
| Supabase  | Data/Auth | `zhljzwcjidtpshgkdiqr` |

## Environment variables

Set in **Vercel** (and in local `.env` for development):

| Variable                     | Purpose |
|-----------------------------|---------|
| `SUPABASE_URL`              | Supabase project URL |
| `SUPABASE_SERVICE_ROLE_KEY` | Server-side Supabase API key (never expose to client) |
| `PHOENIX_PROFILE`           | Optional. `development` \| `staging` \| `ida` \| `production`. Default when unset: `development`. IDA and production use stricter timeouts and validation. |

Secrets are managed in Vercel project settings and in local `.env` (gitignored).

## Profiles (PHOENIX_PROFILE)

| Profile       | Use case              | Timeouts / behaviour |
|---------------|------------------------|-----------------------|
| `development` | Local dev              | Relaxed (60s default), non-strict validation |
| `staging`     | Staging deploy         | 30s, strict validation, IDA features on |
| `ida`         | IDA pilot / integration| Same as staging       |
| `production`  | Production             | Same as staging       |

Runtime and app read profile via `getProfile()` from `@pzero/runtime`; use `getProfileConfig()` for timeouts and feature flags.

## Docker

For self-hosted runtime or CI parity:

```bash
docker build -t phoenix-os:latest .
docker run -e PHOENIX_PROFILE=production -p 8080:8080 phoenix-os:latest
```

Default container CMD runs the health server on port 8080. Override to run CLI or other entrypoints.

- **Dockerfile**: root of repo; multi-stage build, Node 20 Alpine, pnpm, builds all packages.
- **Health server**: `node scripts/health-server.mjs [port]` — serves `GET /health` and `GET /ready` (JSON, no auth; restrict by network in production).

## Health and readiness

- **GET /health** — Returns `{ status, version, profile, service }`. Use for liveness.
- **GET /ready** — Returns `{ ready, profile }`. Use for readiness (e.g. after dependencies are up).

When deploying a Next.js or other HTTP app on Vercel, implement the same contract on `/api/health` and `/api/ready` so load balancers and orchestrators can probe consistently.

## CI/CD

- **GitHub Actions** (`.github/workflows/ci.yml`): on push/PR to `main` — lint, typecheck, test, build. Optional `benchmark` job runs `pnpm run benchmark` (non-blocking).
- **Production deploy**: Vercel deploys on merge to `main` when a deployable app (e.g. Next.js) is present. Until then, CI is the gate.
- **Docker build**: Use `docker build -t phoenix-os .` from repo root. See [../scripts/docker-build.sh](../scripts/docker-build.sh) for a convenience script.
