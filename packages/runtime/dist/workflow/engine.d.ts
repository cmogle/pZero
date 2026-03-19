/**
 * Workflow orchestration engine for design tasks.
 * ADR-007: runs workflow steps, invokes AI/asset hooks; state in-memory.
 */
import type { WorkflowDef, WorkflowRunId, WorkflowRunState, WorkflowInput } from "./types.js";
/** Hook for AI step execution. Injected by Design API / runtime. */
export type AIStepHandler = (stepId: string, config: Record<string, unknown>, payload: Record<string, unknown>) => Promise<{
    success: boolean;
    output?: unknown;
}>;
/** Hook for asset step execution. */
export type AssetStepHandler = (stepId: string, config: Record<string, unknown>, payload: Record<string, unknown>) => Promise<{
    success: boolean;
    output?: unknown;
}>;
export interface EngineOptions {
    onAIStep?: AIStepHandler;
    onAssetStep?: AssetStepHandler;
    stepTimeoutMs?: number;
}
export declare class WorkflowEngine {
    /** Registry of workflow definitions by id. Populated when starting a run. */
    private defs;
    private runs;
    private onAI;
    private onAsset;
    private stepTimeoutMs;
    constructor(options?: EngineOptions);
    /**
     * Start a new workflow run. Returns runId and initial state.
     */
    start(def: WorkflowDef, input: WorkflowInput): {
        runId: WorkflowRunId;
        state: WorkflowRunState;
    };
    /**
     * Get current state of a run.
     */
    getState(runId: WorkflowRunId): WorkflowRunState | undefined;
    /**
     * Advance the workflow by one step. Returns updated state or undefined if run not found / not running.
     */
    advance(runId: WorkflowRunId): Promise<WorkflowRunState | undefined>;
    /**
     * Run until completion or failure. For sync-style usage; each step is one advance.
     */
    runToCompletion(def: WorkflowDef, input: WorkflowInput): Promise<{
        runId: WorkflowRunId;
        state: WorkflowRunState;
    }>;
    registerDef(def: WorkflowDef): void;
    private getWorkflowDef;
    /** Execute a single step. Enforces stepTimeoutMs for AI/asset steps. */
    private executeStep;
}
//# sourceMappingURL=engine.d.ts.map