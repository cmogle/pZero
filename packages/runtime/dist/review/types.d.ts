/**
 * Account Manager review and approval flow.
 * INT-15: Present decision + artifact; approve / reject / edit; no autonomous send without approval.
 */
import type { DecisionResult } from "../decision/types.js";
import type { ActionArtifact } from "../assembler/types.js";
/** Payload presented to the Account Manager for review. */
export interface ReviewPayload {
    /** Decision logic (e.g. "Because [Signal], we are triggering Playbook X"). */
    decision: DecisionResult;
    /** Drafted action artifact (assembled content) for verification. */
    artifact: ActionArtifact;
}
/** Verdict from the Account Manager. */
export type ReviewVerdict = {
    outcome: "approved";
    editedBody?: string;
} | {
    outcome: "rejected";
    reason?: string;
} | {
    outcome: "edit";
    body: string;
};
/** Result of submitting a review verdict. Approved actions flow to execution handoff; no autonomous send. */
export interface ReviewResult {
    /** Whether the verdict was accepted. */
    accepted: boolean;
    /** If approved (or edit), the final body to hand off to execution. Caller must invoke execution; this layer never sends. */
    handoffBody?: string;
    /** If rejected, optional reason. */
    rejectionReason?: string;
}
/**
 * Execution handoff: called by app layer only when review verdict is approved or edit.
 * Implementations (e.g. queue job, call send API) must not be invoked by runtime; app owns the boundary.
 */
export type ExecutionHandoff = (params: {
    body: string;
    kind: string;
    sourceBlockIds: string[];
}) => void | Promise<void>;
//# sourceMappingURL=types.d.ts.map