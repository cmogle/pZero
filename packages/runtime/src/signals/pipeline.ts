/**
 * End-to-end: ingest net-new signals and return summaries.
 * Single entry point for "run signal ingestion and summarization for tracked accounts."
 */

import type { RawSignal, SignalSummary, TrackedAccount } from "./types.js";
import type { SignalSource } from "./sources/types.js";
import { ingestNetNew } from "./ingest.js";
import { summarizeSignal } from "./summarize.js";

export interface PipelineResult {
  signals: RawSignal[];
  summaries: SignalSummary[];
}

/**
 * Run ingestion for the given source and accounts, then summarize each net-new signal.
 * Pass tenantId in options to scope deduplication per tenant.
 */
export async function runSignalPipeline(
  source: SignalSource,
  accounts: TrackedAccount[],
  options?: { since?: string; limit?: number; tenantId?: string }
): Promise<PipelineResult> {
  const { signals } = await ingestNetNew(source, accounts, options);
  const summaries = signals.map(summarizeSignal);
  return { signals, summaries };
}
