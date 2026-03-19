/**
 * Workflow orchestration engine for design tasks.
 * ADR-007: runs workflow steps, invokes AI/asset hooks; state in-memory.
 */
let nextRunId = 0;
function generateRunId() {
    nextRunId += 1;
    return `wr-${nextRunId}`;
}
export class WorkflowEngine {
    /** Registry of workflow definitions by id. Populated when starting a run. */
    defs = new Map();
    runs = new Map();
    onAI;
    onAsset;
    stepTimeoutMs;
    constructor(options = {}) {
        this.onAI = options.onAIStep;
        this.onAsset = options.onAssetStep;
        this.stepTimeoutMs = options.stepTimeoutMs ?? 30_000;
    }
    /**
     * Start a new workflow run. Returns runId and initial state.
     */
    start(def, input) {
        this.defs.set(def.id, def);
        const runId = generateRunId();
        const now = Date.now();
        const state = {
            runId,
            workflowId: def.id,
            status: "running",
            currentStepId: def.entry,
            payload: { ...input },
            startedAt: now,
            updatedAt: now,
        };
        this.runs.set(runId, state);
        return { runId, state };
    }
    /**
     * Get current state of a run.
     */
    getState(runId) {
        return this.runs.get(runId);
    }
    /**
     * Advance the workflow by one step. Returns updated state or undefined if run not found / not running.
     */
    async advance(runId) {
        const state = this.runs.get(runId);
        if (!state || state.status !== "running" || !state.currentStepId)
            return undefined;
        const def = this.getWorkflowDef(state.workflowId);
        if (!def) {
            state.status = "failed";
            state.error = "Unknown workflow def";
            state.updatedAt = Date.now();
            return state;
        }
        const step = def.steps.find((s) => s.id === state.currentStepId);
        if (!step) {
            state.status = "failed";
            state.error = `Step not found: ${state.currentStepId}`;
            state.updatedAt = Date.now();
            return state;
        }
        const result = await this.executeStep(step, state);
        state.updatedAt = Date.now();
        if (result.success) {
            if (result.output !== undefined) {
                state.payload = { ...state.payload, [step.id]: result.output };
            }
            const nextId = step.onSuccess ?? null;
            if (!nextId) {
                state.status = "completed";
                state.currentStepId = null;
                state.result = state.payload;
            }
            else {
                state.currentStepId = nextId;
            }
        }
        else {
            const nextId = step.onFail ?? null;
            if (!nextId) {
                state.status = "failed";
                state.currentStepId = null;
                state.error = result.error ?? "Step failed";
            }
            else {
                state.currentStepId = nextId;
            }
        }
        return state;
    }
    /**
     * Run until completion or failure. For sync-style usage; each step is one advance.
     */
    async runToCompletion(def, input) {
        const { runId, state: initial } = this.start(def, input);
        let state = initial;
        while (state.status === "running" && state.currentStepId) {
            const next = await this.advance(runId);
            state = next ?? state;
        }
        return { runId, state };
    }
    registerDef(def) {
        this.defs.set(def.id, def);
    }
    getWorkflowDef(workflowId) {
        return this.defs.get(workflowId);
    }
    /** Execute a single step. Enforces stepTimeoutMs for AI/asset steps. */
    async executeStep(step, state) {
        switch (step.type) {
            case "task":
                return { success: true, output: state.payload };
            case "ai_call":
                if (!this.onAI)
                    return { success: false, error: "No AI adapter configured" };
                try {
                    const stepPromise = this.onAI(step.id, step.config ?? {}, state.payload);
                    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error(`Step ${step.id} timed out after ${this.stepTimeoutMs}ms`)), this.stepTimeoutMs));
                    return await Promise.race([stepPromise, timeoutPromise]);
                }
                catch (e) {
                    return {
                        success: false,
                        error: e instanceof Error ? e.message : String(e),
                    };
                }
            case "asset":
                if (!this.onAsset)
                    return { success: false, error: "No asset pipeline configured" };
                try {
                    const stepPromise = this.onAsset(step.id, step.config ?? {}, state.payload);
                    const timeoutPromise = new Promise((_, reject) => setTimeout(() => reject(new Error(`Step ${step.id} timed out after ${this.stepTimeoutMs}ms`)), this.stepTimeoutMs));
                    return await Promise.race([stepPromise, timeoutPromise]);
                }
                catch (e) {
                    return {
                        success: false,
                        error: e instanceof Error ? e.message : String(e),
                    };
                }
            case "gate":
                return { success: true, output: state.payload };
            default:
                return { success: false, error: `Unknown step type: ${step.type}` };
        }
    }
}
//# sourceMappingURL=engine.js.map