/**
 * Signal ingestion and summarization for tracked accounts.
 * ADR: INT-11.
 */

export type {
  TrackedAccount,
  RawSignal,
  SignalSummary,
} from "./types.js";
export type { SignalSource } from "./sources/types.js";
export { createMockFeedSource } from "./sources/mockFeed.js";
export { ingestNetNew, markSeen, clearSeen } from "./ingest.js";
export { summarizeSignal } from "./summarize.js";
export { runSignalPipeline } from "./pipeline.js";
export type { PipelineResult } from "./pipeline.js";
