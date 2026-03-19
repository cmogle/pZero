/**
 * Summarization: turn a raw signal into a structured summary for playbook mapping.
 * MVP uses a simple extractor from payload; can be replaced by LLM later.
 * ADR: INT-11 — concise, structured summary suitable for Consideration pass.
 */
import type { RawSignal, SignalSummary } from "./types.js";
/**
 * Produce a concise, structured summary from a raw signal.
 * MVP: derive headline and bullets from payload shape (title/body or similar).
 */
export declare function summarizeSignal(signal: RawSignal): SignalSummary;
//# sourceMappingURL=summarize.d.ts.map