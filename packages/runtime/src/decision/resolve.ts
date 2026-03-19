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
export function decide(consideration: ConsiderationResult): DecisionResult {
  const { summary, playbookCandidates, contentBlockCandidates } = consideration;
  const headline = summary.headline ?? "Signal received";

  if (playbookCandidates.length === 0) {
    return {
      shouldRespond: false,
      selectedBlockIds: [],
      reasoning: `No matching playbook for signal: "${headline}". Consideration found no playbook with trigger tags matching [${(summary.tags ?? []).join(", ") || "none"}.]`,
      signalHeadline: headline,
    };
  }

  // Deterministic selection: first matching playbook. (Future: scoring/ranking.)
  const playbook = playbookCandidates[0];
  const selectedBlockIds = playbook.contentBlockIds.filter((id) =>
    contentBlockCandidates.some((c) => c.id === id)
  );

  const reasoning =
    `Because "${headline}", we are triggering Playbook "${playbook.name}" (${playbook.id}). ` +
    `Selected ${selectedBlockIds.length} content block(s) for assembly.`;

  return {
    shouldRespond: true,
    playbookId: playbook.id,
    selectedBlockIds,
    reasoning,
    signalHeadline: headline,
  };
}
