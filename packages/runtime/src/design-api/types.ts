/**
 * Phoenix Design API types — public surface for IDA products.
 * ADR-007: single contract consumed by IDA SDKs.
 */

import type { WorkflowRunId, RunStatus } from "../workflow/types.js";
import type { ReviewPayload, ReviewVerdict, ReviewResult } from "../review/types.js";
import type { WorkflowDef, WorkflowInput } from "../workflow/types.js";

export type { WorkflowDef, WorkflowInput };

/** Result of starting a design workflow. */
export interface StartDesignWorkflowResult {
  runId: WorkflowRunId;
  status: RunStatus;
}

/** Status of a design workflow run. */
export interface DesignWorkflowStatus {
  status: RunStatus;
  currentStep: string | null;
  result?: unknown;
  error?: string;
  runId: WorkflowRunId;
}

/** Bridge to review layer: submit design outcome for Account Manager review. */
export type SubmitDesignForReviewPayload = ReviewPayload;
export type DesignReviewVerdict = ReviewVerdict;
export type DesignReviewResult = ReviewResult;
