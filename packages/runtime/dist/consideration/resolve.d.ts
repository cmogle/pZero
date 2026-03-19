/**
 * Resolve playbook and content-block candidates from a signal summary and account context.
 * INT-12: Consideration pass — map summary to codified playbooks and content library.
 */
import type { SignalSummary } from "../signals/types.js";
import type { AccountContext, ConsiderationResult } from "./types.js";
/**
 * Map a structured signal summary to playbook and content-block candidates
 * using account/context. Output is suitable for the Decision engine.
 */
export declare function mapSummaryToConsideration(summary: SignalSummary, context: AccountContext): ConsiderationResult;
//# sourceMappingURL=resolve.d.ts.map