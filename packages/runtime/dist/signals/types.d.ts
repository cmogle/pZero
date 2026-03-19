/**
 * Signal and account types for market intelligence ingestion.
 * ADR: INT-11 — Signal ingestion and summarization for tracked accounts.
 */
/** A tracked account (e.g. company, instrument) that we ingest signals for. */
export interface TrackedAccount {
    id: string;
    /** External identifier (e.g. ticker, domain). */
    externalId: string;
    /** Human-readable label. */
    label: string;
    /** Optional source-specific config (e.g. API keys scoped to this account). */
    config?: Record<string, unknown>;
}
/** Raw signal as received from a source (feed/API). */
export interface RawSignal {
    id: string;
    accountId: string;
    sourceId: string;
    /** When the signal was observed or published. */
    observedAt: string;
    /** Opaque payload; structure depends on source. */
    payload: unknown;
    /** Optional source-provided deduplication key. */
    dedupeKey?: string;
}
/** Structured summary of a signal, suitable for playbook/Consideration pass. */
export interface SignalSummary {
    signalId: string;
    accountId: string;
    observedAt: string;
    /** Short headline (e.g. one line). */
    headline: string;
    /** Key facts or bullets for mapping. */
    bullets: string[];
    /** Optional tags for playbook routing (e.g. "earnings", "guidance"). */
    tags?: string[];
}
//# sourceMappingURL=types.d.ts.map