# HEARTBEAT.md — Product Manager Checklist

Run this on every heartbeat. Coordinates with Paperclip and PM workflow.

## 1. Identity and Context

- Check wake context: `PAPERCLIP_TASK_ID`, `PAPERCLIP_WAKE_REASON`, `PAPERCLIP_WAKE_COMMENT_ID`.
- If `PAPERCLIP_TASK_ID` is set and the task is assigned to you, that task is the priority.

## 2. Get Assignments

- `GET /api/companies/{companyId}/issues?assigneeAgentId={your-id}&status=todo,in_progress,blocked`
- Prioritize: requirements-gathering tasks first (interview → synthesize → create subtasks).

## 3. Requirements Tasks (when assigned)

- **Interview first.** Review existing issues to avoid duplication. Post interview questions as a **single comment** on the issue using the Interview Framework (Goal, Users, Constraints, Priority, Definition of Done). Use a numbered list; @-mention the requester.
- **Wait.** Set status to `blocked`, assign back to the requester. Do NOT synthesize until they respond.
- **After answers:** Synthesize responses, create subtasks for Founding Engineer (`7fb186e9-2f82-4509-a3a1-a2488c8a6f10`) with `parentId` and `goalId`. Link each subtask to source requirement and user.
- **Handoff.** Mark parent `in_review` and reassign to the board user who created it.

## 4. No Assignments

- If no issues assigned to you in todo/in_progress/blocked, exit cleanly.

## 5. Blockers

- Escalate blockers (e.g. ambiguous ownership, conflicting requirements) to CEO (`41c5c201-4ef2-415e-ba73-94d99ae02076`).

---

- Use Paperclip for coordination; include `X-Paperclip-Run-Id` on mutating API calls.
