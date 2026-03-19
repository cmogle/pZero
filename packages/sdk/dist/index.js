/**
 * Phoenix OS TypeScript SDK — public API.
 * Full type coverage for runtime and kernel. Use this package to build on Phoenix OS.
 * @packageDocumentation
 */
export const SDK_VERSION = "0.1.0";
// ---------------------------------------------------------------------------
// Kernel — process, scheduler, IPC, memory
// ---------------------------------------------------------------------------
export { KERNEL_VERSION, ProcessManager, Scheduler, Channel, Mailbox, createChannel, getMailbox, resetIPC, PoolAllocator, } from "@pzero/kernel";
// ---------------------------------------------------------------------------
// Runtime — signals, consideration, decision, assembler, review
// ---------------------------------------------------------------------------
export { RUNTIME_VERSION, createMockFeedSource, ingestNetNew, markSeen, clearSeen, summarizeSignal, runSignalPipeline, mapSummaryToConsideration, decide, assemble, submitReview, } from "@pzero/runtime";
export { WorkflowEngine } from "@pzero/runtime";
export { StubDesignAIAdapter } from "@pzero/runtime";
export { PassThroughAssetPipeline } from "@pzero/runtime";
export { StubCollabPrimitives } from "@pzero/runtime";
export { PhoenixDesignAPI } from "@pzero/runtime";
//# sourceMappingURL=index.js.map