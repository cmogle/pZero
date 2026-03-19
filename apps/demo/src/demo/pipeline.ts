/**
 * Run the full signal-to-action pipeline with demo data.
 * Uses real @pzero/runtime: runSignalPipeline → consideration → decide → assemble → review payload.
 */

import { clearSeen, runSignalPipeline } from '@pzero/runtime';
import {
  mapSummaryToConsideration,
  decide,
  assemble,
  buildReviewPayload,
} from '@pzero/app';
import type {
  SignalSummary,
  ConsiderationResult,
  DecisionResult,
  ActionArtifact,
  ReviewPayload,
} from '@pzero/runtime';
import {
  DEMO_ACCOUNTS,
  ACME_ACCOUNT_ID,
  createDemoSignalSource,
  getDemoAccountContext,
  DEMO_CONTENT_LIBRARY,
} from './data';

const DEMO_TENANT = 'demo';

export interface DemoPipelineResult {
  accounts: typeof DEMO_ACCOUNTS;
  /** All signals from pipeline run */
  signals: Array<{ accountId: string; headline: string; observedAt: string }>;
  /** Acme's primary signal summary (for Step 2) */
  acmeSummary: SignalSummary | null;
  /** Consideration result for Acme (Step 3) */
  consideration: ConsiderationResult | null;
  /** Decision for Acme (Step 4) */
  decision: DecisionResult | null;
  /** Assembled artifact for Acme (Step 4) */
  artifact: ActionArtifact | null;
  /** Review payload for AM (Step 5) */
  reviewPayload: ReviewPayload | null;
}

/**
 * Run pipeline with demo source and demo tenant. Clears demo seen set first so run is deterministic.
 */
export async function runDemoPipeline(): Promise<DemoPipelineResult> {
  clearSeen(DEMO_TENANT);
  const source = createDemoSignalSource();
  const { signals, summaries } = await runSignalPipeline(source, DEMO_ACCOUNTS, {
    tenantId: DEMO_TENANT,
    limit: 20,
  });

  const signalsForList = signals.map((s) => {
    const summary = summaries.find((sum) => sum.signalId === s.id);
    return {
      accountId: s.accountId,
      headline: summary?.headline ?? (s.payload as { title?: string })?.title ?? 'Signal',
      observedAt: s.observedAt,
    };
  });

  const acmeSummary = summaries.find((s) => s.accountId === ACME_ACCOUNT_ID) ?? null;
  let consideration: ConsiderationResult | null = null;
  let decision: DecisionResult | null = null;
  let artifact: ActionArtifact | null = null;
  let reviewPayload: ReviewPayload | null = null;

  if (acmeSummary) {
    const context = getDemoAccountContext(ACME_ACCOUNT_ID);
    consideration = mapSummaryToConsideration(acmeSummary, context);
    decision = decide(consideration);
    if (decision.shouldRespond && decision.selectedBlockIds.length > 0) {
      const raw = assemble({
        decisionResult: decision,
        contentLibrary: DEMO_CONTENT_LIBRARY,
      });
      if (raw) {
        artifact = { ...raw, kind: 'email' };
        reviewPayload = buildReviewPayload(decision, artifact);
      }
    }
  }

  return {
    accounts: DEMO_ACCOUNTS,
    signals: signalsForList,
    acmeSummary,
    consideration,
    decision,
    artifact,
    reviewPayload,
  };
}
