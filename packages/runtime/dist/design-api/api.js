/**
 * Phoenix Design API — public surface for IDA products.
 * ADR-007: workflow start/status, review bridge; single entry for runtime design features.
 */
import { WorkflowEngine } from "../workflow/engine.js";
import { submitReview } from "../review/resolve.js";
/**
 * Phoenix Design API: start workflows, get status, submit for review.
 * IDA products depend on this surface.
 */
export class PhoenixDesignAPI {
    engine;
    constructor(options = {}) {
        this.engine = new WorkflowEngine({
            onAIStep: options.aiAdapter
                ? async (_stepId, config, payload) => {
                    const prompt = config.prompt ?? "";
                    const result = await options.aiAdapter.complete(prompt, payload);
                    return {
                        success: result.success,
                        output: result.output ?? result.data,
                    };
                }
                : undefined,
            onAssetStep: options.assetPipeline
                ? async (_stepId, config, _payload) => {
                    const ref = config.assetRef;
                    if (!ref?.id)
                        return { success: false };
                    const result = await options.assetPipeline.process({ id: ref.id, type: ref.type }, config.options);
                    return { success: result.success, output: result.outputRef };
                }
                : undefined,
        });
    }
    /**
     * Start a design workflow. Returns runId and initial status.
     */
    startDesignWorkflow(def, input) {
        const { runId, state } = this.engine.start(def, input);
        return { runId, status: state.status };
    }
    /**
     * Get current status of a workflow run.
     */
    getDesignWorkflowStatus(runId) {
        const state = this.engine.getState(runId);
        if (!state)
            return undefined;
        return {
            runId: state.runId,
            status: state.status,
            currentStep: state.currentStepId,
            result: state.result,
            error: state.error,
        };
    }
    /**
     * Advance a workflow run by one step. Returns updated status or undefined.
     */
    async advanceDesignWorkflow(runId) {
        const state = await this.engine.advance(runId);
        if (!state)
            return undefined;
        return {
            runId: state.runId,
            status: state.status,
            currentStep: state.currentStepId,
            result: state.result,
            error: state.error,
        };
    }
    /**
     * Run a workflow to completion (convenience). Each step advanced in sequence.
     */
    async runDesignWorkflowToCompletion(def, input) {
        const { runId } = await this.engine.runToCompletion(def, input);
        const status = this.getDesignWorkflowStatus(runId);
        return { runId, status };
    }
    /**
     * Bridge to review layer: submit design decision + artifact for Account Manager review.
     * runId is for correlation/tracing; review is performed on payload + verdict.
     */
    submitDesignForReview(_runId, payload, verdict) {
        return submitReview(payload, verdict);
    }
}
//# sourceMappingURL=api.js.map