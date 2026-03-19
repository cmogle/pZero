/**
 * Review and approval flow — present decision + artifact, accept verdict, handoff only when approved.
 */

export type { ReviewPayload, ReviewVerdict, ReviewResult, ExecutionHandoff } from "./types.js";
export { submitReview } from "./resolve.js";
