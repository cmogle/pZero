/**
 * ProcessManager — create, start, pause, resume, terminate processes.
 * ADR-006: process lifecycle; single-threaded cooperative model.
 */
import type { Process, ProcessId, ProcessState, Priority } from "./types.js";
import type { ProcessMeta } from "./types.js";
export declare class ProcessManager {
    private processes;
    /**
     * Create a process in state "created". Call start() to make it "ready".
     */
    create(options?: {
        priority?: Priority;
        meta?: ProcessMeta;
    }): Process;
    /** Transition created → ready, or blocked → ready. */
    start(pid: ProcessId): Process | undefined;
    /** Transition running → ready (yield). */
    pause(pid: ProcessId): Process | undefined;
    /** Transition ready → running. Caller (scheduler) is responsible for only one running at a time. */
    resume(pid: ProcessId): Process | undefined;
    /** Transition any → blocked. */
    block(pid: ProcessId): Process | undefined;
    /** Transition any → terminated. */
    terminate(pid: ProcessId): Process | undefined;
    get(pid: ProcessId): Process | undefined;
    listByState(state: ProcessState): Process[];
    listAll(): Process[];
    /** For tests: reset internal id counter and clear processes. */
    reset(): void;
}
//# sourceMappingURL=ProcessManager.d.ts.map