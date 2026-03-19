/**
 * Signal ingestion and summarization for tracked accounts.
 * ADR: INT-11.
 */
export { createMockFeedSource } from "./sources/mockFeed.js";
export { ingestNetNew, markSeen, clearSeen } from "./ingest.js";
export { summarizeSignal } from "./summarize.js";
export { runSignalPipeline } from "./pipeline.js";
//# sourceMappingURL=index.js.map