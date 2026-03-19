/**
 * Task scheduler — deterministic priority queue; AI-workload-aware.
 * ADR-006: single-threaded cooperative; yields next runnable process.
 */
import type { ProcessId } from "../process/types.js";
import type { ProcessManager } from "../process/index.js";
export declare class Scheduler {
    private processManager;
    private readyQueue;
    private orderCounter;
    constructor(processManager: ProcessManager);
    /**
     * Enqueue a process as ready. Call when a process becomes runnable (start or unblock).
     */
    enqueue(pid: ProcessId): void;
    /**
     * Dequeue the next runnable process and mark it running. Returns pid or undefined if none.
     */
    next(): ProcessId | undefined;
    /**
     * Yield current process: mark it ready and enqueue; return next runnable pid.
     */
    yield(currentPid: ProcessId): ProcessId | undefined;
    /** Number of processes in the ready queue. */
    get readyCount(): number;
}
//# sourceMappingURL=Scheduler.d.ts.map