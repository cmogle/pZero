/**
 * App-layer review flow: submit verdict and hand off to execution only when approved.
 * INT-15: No autonomous send without approval; handoff is caller-provided.
 */
import type { ReviewPayload, ReviewVerdict, ReviewResult, ExecutionHandoff } from "@pzero/runtime";
/**
 * Submit Account Manager verdict; if approved or edit, invoke handoff with final body.
 * If rejected, handoff is not called. Caller provides handoff (e.g. queue job, send API).
 */
export declare function submitReviewAndHandoff(payload: ReviewPayload, verdict: ReviewVerdict, handoff: ExecutionHandoff): ReviewResult;
export type { ReviewPayload, ReviewVerdict, ReviewResult, ExecutionHandoff } from "@pzero/runtime";
export { submitReview } from "@pzero/runtime";
//# sourceMappingURL=review.d.ts.map