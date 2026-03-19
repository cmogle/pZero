/**
 * End-to-end: ingest net-new signals and return summaries.
 * Single entry point for "run signal ingestion and summarization for tracked accounts."
 */
import { ingestNetNew } from "./ingest.js";
import { summarizeSignal } from "./summarize.js";
/**
 * Run ingestion for the given source and accounts, then summarize each net-new signal.
 * Pass tenantId in options to scope deduplication per tenant.
 */
export async function runSignalPipeline(source, accounts, options) {
    const { signals } = await ingestNetNew(source, accounts, options);
    const summaries = signals.map(summarizeSignal);
    return { signals, summaries };
}
//# sourceMappingURL=pipeline.js.map