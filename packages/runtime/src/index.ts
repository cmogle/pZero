/**
 * @fileoverview Phoenix OS runtime — service layer exports.
 * Runtime layer: execution environment, service APIs, and integrations.
 */

export const RUNTIME_VERSION = "0.1.0";

export { type PhoenixProfile, type ProfileConfig, getProfile, getProfileConfig } from "./config.js";
export {
  BOUNDS,
  validateString,
  validateRunId,
  validateRecord,
  type ValidateResult,
  type ValidationResult,
  type ValidationError,
} from "./validation.js";

export {
  type TrackedAccount,
  type RawSignal,
  type SignalSummary,
  type SignalSource,
  type PipelineResult,
  createMockFeedSource,
  ingestNetNew,
  markSeen,
  clearSeen,
  summarizeSignal,
  runSignalPipeline,
} from "./signals/index.js";
export {
  type AccountContext,
  type ConsiderationResult,
  type ContentBlockRef,
  type Playbook,
  mapSummaryToConsideration,
} from "./consideration/index.js";
export {
  type DecisionInput,
  type DecisionResult,
  decide,
} from "./decision/index.js";
export {
  type ActionArtifact,
  type AssemblerInput,
  type ContentBlock,
  type ContentLibrary,
  assemble,
} from "./assembler/index.js";
export {
  type ReviewPayload,
  type ReviewVerdict,
  type ReviewResult,
  type ExecutionHandoff,
  submitReview,
} from "./review/index.js";

// Design intelligence layer (ADR-007)
export type {
  WorkflowRunId,
  StepType,
  WorkflowStepDef,
  WorkflowDef,
  RunStatus,
  WorkflowRunState,
  WorkflowInput,
  AIStepHandler,
  AssetStepHandler,
  EngineOptions,
} from "./workflow/index.js";
export { WorkflowEngine } from "./workflow/index.js";
export type { AIResult, AIContext, IDesignAIAdapter } from "./ai/index.js";
export { StubDesignAIAdapter } from "./ai/index.js";
export type { AssetRef, AssetResult, IAssetPipeline } from "./asset/index.js";
export { PassThroughAssetPipeline } from "./asset/index.js";
export type { RoomId, PresenceEntry, PresenceMap, CollabEvent, ICollabPrimitives } from "./collab/index.js";
export { StubCollabPrimitives } from "./collab/index.js";
export type {
  StartDesignWorkflowResult,
  DesignWorkflowStatus,
  SubmitDesignForReviewPayload,
  DesignReviewVerdict,
  DesignReviewResult,
} from "./design-api/index.js";
export { PhoenixDesignAPI } from "./design-api/index.js";
export type { PhoenixDesignAPIOptions } from "./design-api/index.js";
