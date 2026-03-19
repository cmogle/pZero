/**
 * Decide whether to respond and which playbook/content blocks to use from Consideration output.
 * INT-13: Auditable reasoning only; no autonomous execution.
 */
import type { DecisionResult } from "./types.js";
import type { ConsiderationResult } from "../consideration/types.js";
/**
 * From Consideration output, produce an auditable decision: respond or not,
 * selected playbook and content block IDs, and a reasoning string for human review.
 */
export declare function decide(consideration: ConsiderationResult): DecisionResult;
//# sourceMappingURL=resolve.d.ts.map