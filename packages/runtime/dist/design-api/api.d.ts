/**
 * Phoenix Design API — public surface for IDA products.
 * ADR-007: workflow start/status, review bridge; single entry for runtime design features.
 */
import type { WorkflowDef, WorkflowInput } from "../workflow/types.js";
import type { IDesignAIAdapter } from "../ai/types.js";
import type { IAssetPipeline } from "../asset/types.js";
import type { ReviewPayload, ReviewVerdict, ReviewResult } from "../review/types.js";
import type { StartDesignWorkflowResult, DesignWorkflowStatus } from "./types.js";
export interface PhoenixDesignAPIOptions {
    aiAdapter?: IDesignAIAdapter;
    assetPipeline?: IAssetPipeline;
}
/**
 * Phoenix Design API: start workflows, get status, submit for review.
 * IDA products depend on this surface.
 */
export declare class PhoenixDesignAPI {
    private engine;
    constructor(options?: PhoenixDesignAPIOptions);
    /**
     * Start a design workflow. Returns runId and initial status.
     */
    startDesignWorkflow(def: WorkflowDef, input: WorkflowInput): StartDesignWorkflowResult;
    /**
     * Get current status of a workflow run.
     */
    getDesignWorkflowStatus(runId: string): DesignWorkflowStatus | undefined;
    /**
     * Advance a workflow run by one step. Returns updated status or undefined.
     */
    advanceDesignWorkflow(runId: string): Promise<DesignWorkflowStatus | undefined>;
    /**
     * Run a workflow to completion (convenience). Each step advanced in sequence.
     */
    runDesignWorkflowToCompletion(def: WorkflowDef, input: WorkflowInput): Promise<{
        runId: string;
        status: DesignWorkflowStatus;
    }>;
    /**
     * Bridge to review layer: submit design decision + artifact for Account Manager review.
     * runId is for correlation/tracing; review is performed on payload + verdict.
     */
    submitDesignForReview(_runId: string, payload: ReviewPayload, verdict: ReviewVerdict): ReviewResult;
}
//# sourceMappingURL=api.d.ts.map