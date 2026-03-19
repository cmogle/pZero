/**
 * Apply Account Manager verdict to a review payload.
 * INT-15: Approved/edited actions yield handoff body; rejected yield no handoff. No autonomous send.
 */
/**
 * Process a review verdict. Returns handoff body only when outcome is approved or edit.
 * Caller is responsible for sending to execution; this layer never sends autonomously.
 */
export function submitReview(payload, verdict) {
    if (verdict.outcome === "rejected") {
        return {
            accepted: false,
            rejectionReason: verdict.reason,
        };
    }
    if (verdict.outcome === "edit") {
        return {
            accepted: true,
            handoffBody: verdict.body,
        };
    }
    // approved — use editedBody if provided, else artifact body
    const handoffBody = verdict.editedBody ?? payload.artifact.body;
    return {
        accepted: true,
        handoffBody,
    };
}
//# sourceMappingURL=resolve.js.map