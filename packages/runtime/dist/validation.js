/**
 * Input validation at API boundaries.
 * docs/security.md: validate and sanitize at API boundaries; do not trust client.
 * Use these helpers in server-side handlers before processing.
 */
/** Max allowed string length for IDs, runIds, and short tokens. */
export const BOUNDS = {
    id: 128,
    runId: 128,
    body: 100_000,
    prompt: 50_000,
};
/**
 * Validates a string is non-empty, within length, and (optional) matches a pattern.
 */
export function validateString(raw, opts) {
    if (raw === undefined || raw === null) {
        return { ok: false, reason: opts.field ? `${opts.field} is required` : "required" };
    }
    const s = String(raw).trim();
    if (s.length === 0) {
        return { ok: false, reason: opts.field ? `${opts.field} cannot be empty` : "cannot be empty" };
    }
    if (s.length > opts.maxLength) {
        return {
            ok: false,
            reason: opts.field ? `${opts.field} exceeds max length ${opts.maxLength}` : `exceeds max length ${opts.maxLength}`,
        };
    }
    if (opts.pattern && !opts.pattern.test(s)) {
        return { ok: false, reason: opts.field ? `${opts.field} has invalid format` : "invalid format" };
    }
    return { ok: true, value: s };
}
/**
 * Validates a workflow runId for use in getDesignWorkflowStatus / advanceDesignWorkflow.
 */
export function validateRunId(raw) {
    return validateString(raw, { maxLength: BOUNDS.runId, field: "runId" });
}
/**
 * Validates an object is a plain object with string values (e.g. payload).
 */
export function validateRecord(raw, maxValueLength = 10_000) {
    if (raw === null || raw === undefined) {
        return { ok: true, value: {} };
    }
    if (typeof raw !== "object" || Array.isArray(raw)) {
        return { ok: false, reason: "payload must be an object" };
    }
    const out = {};
    for (const [k, v] of Object.entries(raw)) {
        if (typeof k !== "string" || k.length > BOUNDS.id) {
            return { ok: false, reason: "invalid key" };
        }
        if (v !== undefined && v !== null) {
            const s = String(v);
            if (s.length > maxValueLength) {
                return { ok: false, reason: `value for ${k} exceeds max length` };
            }
            out[k] = s;
        }
    }
    return { ok: true, value: out };
}
//# sourceMappingURL=validation.js.map