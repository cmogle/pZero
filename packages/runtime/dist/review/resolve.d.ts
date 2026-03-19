/**
 * Apply Account Manager verdict to a review payload.
 * INT-15: Approved/edited actions yield handoff body; rejected yield no handoff. No autonomous send.
 */
import type { ReviewPayload, ReviewVerdict, ReviewResult } from "./types.js";
/**
 * Process a review verdict. Returns handoff body only when outcome is approved or edit.
 * Caller is responsible for sending to execution; this layer never sends autonomously.
 */
export declare function submitReview(payload: ReviewPayload, verdict: ReviewVerdict): ReviewResult;
//# sourceMappingURL=resolve.d.ts.map