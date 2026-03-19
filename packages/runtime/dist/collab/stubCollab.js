/**
 * Stub collaboration primitives: in-memory only; no persistence or real-time.
 * ADR-007: API exists so callers don't break when we add WebSockets/Supabase.
 */
export class StubCollabPrimitives {
    handlers = new Map();
    presenceData = new Map();
    presence(workflowRunId) {
        const out = new Map();
        for (const [k, v] of this.presenceData) {
            if (workflowRunId == null || v.runId === workflowRunId)
                out.set(k, v);
        }
        return out;
    }
    broadcast(room, event) {
        const set = this.handlers.get(room);
        if (set)
            for (const h of set)
                h(event);
    }
    subscribe(room, handler) {
        let set = this.handlers.get(room);
        if (!set) {
            set = new Set();
            this.handlers.set(room, set);
        }
        set.add(handler);
        return () => set.delete(handler);
    }
}
//# sourceMappingURL=stubCollab.js.map