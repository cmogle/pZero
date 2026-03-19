/**
 * @fileoverview Phoenix OS application layer — user-facing exports.
 * App layer: workflows, APIs, and UX entrypoints.
 */
import type { DecisionResult, ActionArtifact, ReviewPayload } from "@pzero/runtime";
export declare const APP_VERSION = "0.1.0";
export type { ReviewPayload, ReviewVerdict, ReviewResult, DecisionResult, ActionArtifact, ExecutionHandoff, } from "@pzero/runtime";
export { submitReview, decide, assemble, mapSummaryToConsideration, } from "@pzero/runtime";
export type { ConsiderationResult, ContentLibrary, ContentBlock } from "@pzero/runtime";
export { submitReviewAndHandoff } from "./review.js";
/**
 * Build a review payload for the Account Manager: decision logic + drafted action artifact.
 * INT-15: Present "Because [Signal], we are triggering Playbook X" and assembled content for verification.
 * Caller (e.g. API route or UI) presents this to the user; no autonomous send.
 */
export declare function buildReviewPayload(decision: DecisionResult, artifact: ActionArtifact): ReviewPayload;
//# sourceMappingURL=index.d.ts.map