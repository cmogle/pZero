/**
 * Consideration pass: map signal summary to playbook and content-block candidates.
 * ADR: INT-12.
 */

export type {
  AccountContext,
  ConsiderationResult,
  ContentBlockRef,
  Playbook,
} from "./types.js";
export { mapSummaryToConsideration } from "./resolve.js";
