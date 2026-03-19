/**
 * ProcessManager — create, start, pause, resume, terminate processes.
 * ADR-006: process lifecycle; single-threaded cooperative model.
 */
let nextId = 0;
function generateId() {
    nextId += 1;
    return `p${nextId}`;
}
export class ProcessManager {
    processes = new Map();
    /**
     * Create a process in state "created". Call start() to make it "ready".
     */
    create(options = {}) {
        const id = generateId();
        const process = {
            id,
            state: "created",
            priority: options.priority ?? 0,
            meta: {
                ...options.meta,
                createdAt: options.meta?.createdAt ?? Date.now(),
            },
        };
        this.processes.set(id, process);
        return process;
    }
    /** Transition created → ready, or blocked → ready. */
    start(pid) {
        const p = this.processes.get(pid);
        if (!p)
            return undefined;
        if (p.state !== "created" && p.state !== "blocked")
            return undefined;
        p.state = "ready";
        return p;
    }
    /** Transition running → ready (yield). */
    pause(pid) {
        const p = this.processes.get(pid);
        if (!p)
            return undefined;
        if (p.state !== "running")
            return undefined;
        p.state = "ready";
        return p;
    }
    /** Transition ready → running. Caller (scheduler) is responsible for only one running at a time. */
    resume(pid) {
        const p = this.processes.get(pid);
        if (!p)
            return undefined;
        if (p.state !== "ready")
            return undefined;
        p.state = "running";
        return p;
    }
    /** Transition any → blocked. */
    block(pid) {
        const p = this.processes.get(pid);
        if (!p)
            return undefined;
        if (p.state === "terminated")
            return undefined;
        p.state = "blocked";
        return p;
    }
    /** Transition any → terminated. */
    terminate(pid) {
        const p = this.processes.get(pid);
        if (!p)
            return undefined;
        p.state = "terminated";
        return p;
    }
    get(pid) {
        return this.processes.get(pid);
    }
    listByState(state) {
        return [...this.processes.values()].filter((p) => p.state === state);
    }
    listAll() {
        return [...this.processes.values()];
    }
    /** For tests: reset internal id counter and clear processes. */
    reset() {
        nextId = 0;
        this.processes.clear();
    }
}
//# sourceMappingURL=ProcessManager.js.map