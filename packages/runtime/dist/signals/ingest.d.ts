/**
 * Ingestion: fetch from source, filter to net-new, return for summarization.
 * Net-new = not previously seen (by dedupeKey or id); MVP uses in-memory set.
 * ADR: INT-11 — detect net-new signals, produce summary for Consideration pass.
 * ADR INT-28: seen keys are scoped per tenant to avoid cross-tenant contamination.
 */
import type { RawSignal, TrackedAccount } from "./types.js";
import type { SignalSource } from "./sources/types.js";
/** Mark signals as seen for a tenant so they are not emitted again as net-new. */
export declare function markSeen(keys: string[], tenantId?: string): void;
/** Clear seen set for a tenant (e.g. for tests). Omit tenantId to clear all tenants. */
export declare function clearSeen(tenantId?: string): void;
/**
 * Ingest from a source and return only net-new signals.
 * Each signal is considered new if (dedupeKey ?? id) is not in the tenant's seen set.
 */
export declare function ingestNetNew(source: SignalSource, accounts: TrackedAccount[], options?: {
    since?: string;
    limit?: number;
    tenantId?: string;
}): Promise<{
    signals: RawSignal[];
    nextCursor?: string;
}>;
//# sourceMappingURL=ingest.d.ts.map