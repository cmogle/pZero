/**
 * Decision engine: auditable playbook selection and reasoning exposure.
 * ADR: INT-13 — recommendation only (human-in-the-loop); no autonomous execution.
 */
import type { ConsiderationResult } from "../consideration/types.js";
/** Input to the Decision engine (output of Consideration pass). */
export type DecisionInput = ConsiderationResult;
/**
 * Result of the Decision engine: whether to respond, which playbook/blocks,
 * and an auditable reasoning string for Account Manager review.
 */
export interface DecisionResult {
    /** Whether the engine recommends responding (human must still approve). */
    shouldRespond: boolean;
    /** If shouldRespond, the selected playbook id; otherwise undefined. */
    playbookId?: string;
    /** If shouldRespond, IDs of content blocks selected for assembly. */
    selectedBlockIds: string[];
    /**
     * Auditable reasoning string for human review.
     * E.g. "Because [Signal summary], we are triggering Playbook X."
     */
    reasoning: string;
    /** Snapshot of input summary headline for traceability. */
    signalHeadline: string;
}
//# sourceMappingURL=types.d.ts.map