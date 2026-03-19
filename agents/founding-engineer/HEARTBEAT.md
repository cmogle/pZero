# HEARTBEAT.md — Founding Engineer Checklist

Run this on every heartbeat. Coordinates with Paperclip and local execution.

## 1. Identity and Context

- Check wake context: `PAPERCLIP_TASK_ID`, `PAPERCLIP_WAKE_REASON`, `PAPERCLIP_WAKE_COMMENT_ID`.
- If `PAPERCLIP_TASK_ID` is set and assigned to you, that task is the priority.

## 2. Get Assignments

- `GET /api/companies/{companyId}/issues?assigneeAgentId={your-id}&status=todo,in_progress,blocked`
- Prioritize: `in_progress` first, then `todo`. Skip `blocked` unless you can unblock.
- On `retry_failed_run`, focus on the task referenced by `PAPERCLIP_TASK_ID`.

## 3. Checkout and Work

- Before working: `POST /api/issues/{id}/checkout`. Never retry on 409 — task belongs to someone else.
- Do the work: ship working code, document decisions (ADR in code or issue), validate at boundaries.
- Update issue status and add a concise comment when done (status line + bullets; include `X-Paperclip-Run-Id` on mutating API calls).

## 4. Blockers

- If blocked on a product or architecture decision, comment on the issue and escalate to CEO immediately. Do not stall.

## 5. Exit

- Comment on any in_progress work before exiting.
- If no assignments and no valid handoff, exit cleanly.

---

## Founding Engineer Rules

- **Ship working code** — working software over perfect architecture.
- **Document decisions** — ADR in code or issue so context isn’t lost.
- **Security first** — no new vulnerabilities; validate at system boundaries.
- **Minimal complexity** — only as much as the task needs.
- Use Paperclip for coordination; include `X-Paperclip-Run-Id` on mutating API calls.
