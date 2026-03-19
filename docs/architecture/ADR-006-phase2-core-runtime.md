# ADR-006: Phase 2 core runtime — process management, scheduling, IPC, memory

**Status:** Accepted  
**Date:** 2026-03-18  
**Context:** INT-3 — Core Runtime: process lifecycle, task scheduler, IPC primitives, memory management.

## Decision

Implement the Phoenix OS core runtime layer in **@pzero/kernel**:

1. **Process lifecycle**
   - Process = unit of work with identity, state, and optional metadata (e.g. AI workload hint).
   - States: `created` → `ready` → `running` → `blocked` | `terminated`.
   - `ProcessManager`: create, start, pause, resume, terminate; list by state.

2. **Task scheduler**
   - In-memory priority queue; deterministic ordering (priority, then creation order).
   - AI-workload-aware: optional `priority` and `kind` (e.g. `"ai_inference"`) for future preemption or batching.
   - Single-threaded cooperative model: scheduler yields next runnable process; no OS threads.

3. **IPC primitives**
   - **Channels**: unidirectional, typed message passing between process IDs. Send/receive with optional timeout.
   - **Mailbox** per process: bounded buffer of messages; FIFO. Processes receive from their mailbox.
   - No shared memory in this phase; all cross-process communication via channels.

4. **Memory management abstractions**
   - **Allocator** interface: `allocate(size)`, `free(handle)`, `reclaim()`. No raw pointers.
   - In-memory implementation: simple pool or array-backed allocator for kernel-managed buffers (e.g. message payloads). Actual "memory" is JavaScript objects; the abstraction allows future replacement with shared buffers or limits.

5. **Module boundary**
   - All of the above live in `@pzero/kernel`. Runtime (`@pzero/runtime`) may depend on kernel for process IDs and IPC when invoking kernel services. Kernel does not depend on runtime.

## Consequences

- Phoenix has a clear, testable core: processes, scheduler, IPC, and allocator can be unit-tested without I/O.
- AI-workload hints set the table for later scheduler policies (e.g. batch inference, priority boost).
- Minimal complexity: no real multi-threading or shared memory; enough structure to build runtime services on top.
