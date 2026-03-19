# TOOLS.md — Founding Engineer

## Cursor / Workspace

- **Codebase**: Read, search, edit under `/Users/conorogle/Development/pZero`. Use semantic search for "how does X work?"; use grep for exact symbols.
- **Terminal**: Run commands in project `cwd`; use for installs, tests, scripts. Check `terminals/` for existing sessions.
- **Linting**: Use ReadLints on edited files before considering work done.

## Paperclip (coordination)

- **API base**: `$PAPERCLIP_API_URL` (e.g. `http://127.0.0.1:3100`).
- **Auth**: `Authorization: Bearer $PAPERCLIP_API_KEY`; mutating calls must include `X-Paperclip-Run-Id: $PAPERCLIP_RUN_ID`.
- **Key endpoints**: `GET /api/issues/{id}` (task details), `POST /api/issues/{id}/checkout` (lock before work), PATCH or comment to update status.
- **Context**: `PAPERCLIP_TASK_ID`, `PAPERCLIP_WAKE_REASON`, `PAPERCLIP_WORKSPACE_CWD`, `PAPERCLIP_COMPANY_ID`, `PAPERCLIP_AGENT_ID`.

## Repo and scripts

- **Monorepo**: pnpm workspaces; packages under `packages/kernel`, `packages/runtime`, `packages/app`.
- **Scripts**: `pnpm install`, `pnpm lint`, `pnpm typecheck`, `pnpm test`, `pnpm build`, `pnpm clean`.
- **CI**: `.github/workflows/ci.yml` — lint, typecheck, test, build on push/PR to `main`.
- **Architecture**: `docs/architecture/ADR-001-phase1-foundation.md` — module boundaries and tech stack.
