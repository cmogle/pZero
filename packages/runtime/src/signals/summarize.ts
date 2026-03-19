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
export function summarizeSignal(signal: RawSignal): SignalSummary {
  const payload = signal.payload as Record<string, unknown> | null;
  const title =
    (payload && typeof payload.title === "string" && payload.title) ||
    "Market signal";
  const body =
    payload && typeof payload.body === "string" ? payload.body : "";
  const bullets = body ? body.split(/\n+/).filter((s) => s.trim()) : [title];

  return {
    signalId: signal.id,
    accountId: signal.accountId,
    observedAt: signal.observedAt,
    headline: title,
    bullets: bullets.slice(0, 5),
    tags: inferTags(payload),
  };
}

function inferTags(payload: Record<string, unknown> | null): string[] {
  if (!payload || typeof payload.type !== "string") return [];
  return [payload.type];
}
