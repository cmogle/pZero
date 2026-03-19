/**
 * @fileoverview Phoenix OS application layer — user-facing exports.
 * App layer: workflows, APIs, and UX entrypoints.
 */
export const APP_VERSION = "0.1.0";
export { submitReview, decide, assemble, mapSummaryToConsideration, } from "@pzero/runtime";
export { submitReviewAndHandoff } from "./review.js";
/**
 * Build a review payload for the Account Manager: decision logic + drafted action artifact.
 * INT-15: Present "Because [Signal], we are triggering Playbook X" and assembled content for verification.
 * Caller (e.g. API route or UI) presents this to the user; no autonomous send.
 */
export function buildReviewPayload(decision, artifact) {
    return { decision, artifact };
}
//# sourceMappingURL=index.js.map