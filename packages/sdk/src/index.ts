/**
 * Phoenix OS TypeScript SDK — public API.
 * Full type coverage for runtime and kernel. Use this package to build on Phoenix OS.
 * @packageDocumentation
 */

export const SDK_VERSION = "0.1.0";

// ---------------------------------------------------------------------------
// Kernel — process, scheduler, IPC, memory
// ---------------------------------------------------------------------------

export {
  KERNEL_VERSION,
  type ProcessId,
  type ProcessState,
  type ProcessKind,
  type Priority,
  type ProcessMeta,
  type Process,
  ProcessManager,
  Scheduler,
  type ChannelId,
  type Message,
  Channel,
  Mailbox,
  createChannel,
  getMailbox,
  resetIPC,
  type AllocHandle,
  type Allocator,
  PoolAllocator,
} from "@pzero/kernel";

// ---------------------------------------------------------------------------
// Runtime — signals, consideration, decision, assembler, review
// ---------------------------------------------------------------------------

export {
  RUNTIME_VERSION,
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
  type AccountContext,
  type ConsiderationResult,
  type ContentBlockRef,
  type Playbook,
  mapSummaryToConsideration,
  type DecisionInput,
  type DecisionResult,
  decide,
  type ActionArtifact,
  type AssemblerInput,
  type ContentBlock,
  type ContentLibrary,
  assemble,
  type ReviewPayload,
  type ReviewVerdict,
  type ReviewResult,
  type ExecutionHandoff,
  submitReview,
} from "@pzero/runtime";

// ---------------------------------------------------------------------------
// Runtime — workflow and design API
// ---------------------------------------------------------------------------

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
} from "@pzero/runtime";
export { WorkflowEngine } from "@pzero/runtime";
export type { AIResult, AIContext, IDesignAIAdapter } from "@pzero/runtime";
export { StubDesignAIAdapter } from "@pzero/runtime";
export type { AssetRef, AssetResult, IAssetPipeline } from "@pzero/runtime";
export { PassThroughAssetPipeline } from "@pzero/runtime";
export type {
  RoomId,
  PresenceEntry,
  PresenceMap,
  CollabEvent,
  ICollabPrimitives,
} from "@pzero/runtime";
export { StubCollabPrimitives } from "@pzero/runtime";
export type {
  StartDesignWorkflowResult,
  DesignWorkflowStatus,
  SubmitDesignForReviewPayload,
  DesignReviewVerdict,
  DesignReviewResult,
  PhoenixDesignAPIOptions,
} from "@pzero/runtime";
export { PhoenixDesignAPI } from "@pzero/runtime";

// ---------------------------------------------------------------------------
// Plugin contract (SDK-owned; CLI consumes)
// ---------------------------------------------------------------------------

export type {
  PhoenixPluginManifest,
  PhoenixPluginContext,
  IPhoenixPlugin,
} from "./plugin.js";
