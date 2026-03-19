/**
 * Design workflow types for Phoenix OS runtime.
 * ADR-007: workflow = directed graph of steps; runs are in-memory.
 */
export type WorkflowRunId = string;
export type StepType = "task" | "ai_call" | "gate" | "asset";
export interface WorkflowStepDef {
    id: string;
    type: StepType;
    /** Optional config for the step (e.g. prompt template for ai_call). */
    config?: Record<string, unknown>;
    /** Next step ids by outcome: success, fail. */
    onSuccess?: string;
    onFail?: string;
}
export interface WorkflowDef {
    id: string;
    name: string;
    steps: WorkflowStepDef[];
    /** Entry step id. */
    entry: string;
}
export type RunStatus = "running" | "completed" | "failed" | "cancelled";
export interface WorkflowRunState {
    runId: WorkflowRunId;
    workflowId: string;
    status: RunStatus;
    currentStepId: string | null;
    /** Payload passed through the run; steps can read/write. */
    payload: Record<string, unknown>;
    /** Set when status is completed or failed. */
    result?: unknown;
    error?: string;
    startedAt: number;
    updatedAt: number;
}
export interface WorkflowInput {
    [key: string]: unknown;
}
//# sourceMappingURL=types.d.ts.map