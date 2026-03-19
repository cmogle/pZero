/**
 * Ingestion: fetch from source, filter to net-new, return for summarization.
 * Net-new = not previously seen (by dedupeKey or id); MVP uses in-memory set.
 * ADR: INT-11 — detect net-new signals, produce summary for Consideration pass.
 * ADR INT-28: seen keys are scoped per tenant to avoid cross-tenant contamination.
 */
/** Per-tenant seen-key sets. Key is tenantId (or default "default" when not provided). */
const seenByTenant = new Map();
function getSeenSet(tenantId) {
    let set = seenByTenant.get(tenantId);
    if (!set) {
        set = new Set();
        seenByTenant.set(tenantId, set);
    }
    return set;
}
/** Mark signals as seen for a tenant so they are not emitted again as net-new. */
export function markSeen(keys, tenantId = "default") {
    const seenKeys = getSeenSet(tenantId);
    for (const k of keys)
        seenKeys.add(k);
}
/** Clear seen set for a tenant (e.g. for tests). Omit tenantId to clear all tenants. */
export function clearSeen(tenantId) {
    if (tenantId === undefined) {
        seenByTenant.clear();
    }
    else {
        seenByTenant.delete(tenantId);
    }
}
/**
 * Ingest from a source and return only net-new signals.
 * Each signal is considered new if (dedupeKey ?? id) is not in the tenant's seen set.
 */
export async function ingestNetNew(source, accounts, options) {
    const tenantId = options?.tenantId ?? "default";
    const seenKeys = getSeenSet(tenantId);
    const { signals, nextCursor } = await source.fetch(accounts, options);
    const netNew = [];
    for (const s of signals) {
        const key = s.dedupeKey ?? s.id;
        if (seenKeys.has(key))
            continue;
        seenKeys.add(key);
        netNew.push(s);
    }
    return { signals: netNew, nextCursor };
}
//# sourceMappingURL=ingest.js.map