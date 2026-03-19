/**
 * @fileoverview Phoenix OS runtime — service layer exports.
 * Runtime layer: execution environment, service APIs, and integrations.
 */
export const RUNTIME_VERSION = "0.1.0";
export { getProfile, getProfileConfig } from "./config.js";
export { BOUNDS, validateString, validateRunId, validateRecord, } from "./validation.js";
export { createMockFeedSource, ingestNetNew, markSeen, clearSeen, summarizeSignal, runSignalPipeline, } from "./signals/index.js";
export { mapSummaryToConsideration, } from "./consideration/index.js";
export { decide, } from "./decision/index.js";
export { assemble, } from "./assembler/index.js";
export { submitReview, } from "./review/index.js";
export { WorkflowEngine } from "./workflow/index.js";
export { StubDesignAIAdapter } from "./ai/index.js";
export { PassThroughAssetPipeline } from "./asset/index.js";
export { StubCollabPrimitives } from "./collab/index.js";
export { PhoenixDesignAPI } from "./design-api/index.js";
//# sourceMappingURL=index.js.map