/**
 * WorkflowVisualization — displays a Phoenix Design API workflow run as a vertical step timeline.
 *
 * Design spec: docs/design/phase3-components.md § 1
 * Data contract: ADR-007 Phoenix Design API (packages/runtime)
 * Design system: packages/design-system/README.md
 * IX principles: docs/design/ix-principles.md (zero-click intelligence, § 2)
 */

'use client';

import * as React from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export type WorkflowStepType = 'task' | 'ai_call' | 'gate';
export type WorkflowStepStatus = 'pending' | 'running' | 'done' | 'failed';
export type WorkflowRunStatus = 'idle' | 'running' | 'done' | 'failed';

export interface WorkflowStep {
  id: string;
  label: string;
  type: WorkflowStepType;
  status: WorkflowStepStatus;
  /** ISO 8601 */
  startedAt?: string;
  /** ISO 8601 */
  completedAt?: string;
  /** Optional AI model name for ai_call steps */
  aiModel?: string;
  errorMessage?: string;
}

export interface WorkflowVisualizationProps {
  runId: string;
  workflowName: string;
  status: WorkflowRunStatus;
  steps: WorkflowStep[];
  /** ISO 8601 timestamp of last status update */
  updatedAt?: string;
  loading?: boolean;
  className?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function elapsedSeconds(startedAt?: string, completedAt?: string): string | null {
  if (!startedAt) return null;
  const start = Date.parse(startedAt);
  const end = completedAt ? Date.parse(completedAt) : Date.now();
  const diff = (end - start) / 1000;
  return diff < 60 ? `${diff.toFixed(1)}s` : `${(diff / 60).toFixed(1)}m`;
}

function relativeTime(iso?: string): string {
  if (!iso) return '';
  const diff = Math.floor((Date.now() - Date.parse(iso)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

const STEP_TYPE_LABELS: Record<WorkflowStepType, string> = {
  task: 'task',
  ai_call: 'ai',
  gate: 'gate',
};

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function StatusBadge({ status }: { status: WorkflowRunStatus }) {
  const variants: Record<WorkflowRunStatus, string> = {
    idle: 'bg-zinc-800 text-zinc-400 border-zinc-700',
    running: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
    done: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
    failed: 'bg-red-600/10 text-red-400 border-red-600/30',
  };
  const labels: Record<WorkflowRunStatus, string> = {
    idle: 'idle',
    running: 'running',
    done: 'done',
    failed: 'failed',
  };
  return (
    <span
      className={`inline-flex items-center border rounded px-2 py-0.5 text-xs font-medium ${variants[status]}`}
    >
      {status === 'running' && (
        <span className="mr-1.5 h-1.5 w-1.5 rounded-full bg-indigo-400 motion-safe:animate-pulse" aria-hidden="true" />
      )}
      {labels[status]}
    </span>
  );
}

function StepIcon({ status }: { status: WorkflowStepStatus }) {
  if (status === 'done') {
    return (
      <svg
        className="h-4 w-4 text-emerald-500 shrink-0"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5 8l2.5 2.5L11 5.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (status === 'running') {
    return (
      <svg
        className="h-4 w-4 text-indigo-400 shrink-0 motion-safe:animate-spin"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="8" cy="8" r="6" stroke="currentColor" strokeWidth="1.5" strokeDasharray="20 18" strokeLinecap="round" />
      </svg>
    );
  }
  if (status === 'failed') {
    return (
      <svg
        className="h-4 w-4 text-red-500 shrink-0"
        viewBox="0 0 16 16"
        fill="none"
        aria-hidden="true"
      >
        <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
        <path d="M5.5 5.5l5 5M10.5 5.5l-5 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
      </svg>
    );
  }
  // pending
  return (
    <svg
      className="h-4 w-4 text-zinc-700 shrink-0"
      viewBox="0 0 16 16"
      fill="none"
      aria-hidden="true"
    >
      <circle cx="8" cy="8" r="7" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

function SkeletonLine({ className = '' }: { className?: string }) {
  return (
    <div
      className={`h-3 bg-zinc-800 rounded motion-safe:animate-pulse ${className}`}
      aria-hidden="true"
    />
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function WorkflowVisualization({
  runId,
  workflowName,
  status,
  steps,
  updatedAt,
  loading = false,
  className = '',
}: WorkflowVisualizationProps) {
  const [, forceUpdate] = React.useReducer((x: number) => x + 1, 0);

  // Re-render every second while a step is running so elapsed timers update
  React.useEffect(() => {
    if (status !== 'running') return;
    const id = setInterval(forceUpdate, 1000);
    return () => clearInterval(id);
  }, [status]);

  const liveRegionId = React.useId();

  if (loading) {
    return (
      <div className={`bg-zinc-900 border border-zinc-800 rounded-md p-4 space-y-4 ${className}`} aria-busy="true" aria-label="Loading workflow">
        <div className="flex items-center justify-between">
          <SkeletonLine className="w-40" />
          <SkeletonLine className="w-16" />
        </div>
        <SkeletonLine className="w-24" />
        <div className="space-y-3 pt-1">
          {[0, 1, 2, 3, 4].map((i) => (
            <div key={i} className="flex items-center gap-3">
              <div className="h-4 w-4 rounded-full bg-zinc-800 shrink-0 motion-safe:animate-pulse" />
              <SkeletonLine className="flex-1" />
              <SkeletonLine className="w-10" />
            </div>
          ))}
        </div>
      </div>
    );
  }

  const activeStep = steps.find((s) => s.status === 'running');

  return (
    <div className={`bg-zinc-900 border border-zinc-800 rounded-md ${className}`}>
      {/* Header */}
      <div className="px-4 py-3 border-b border-zinc-800 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <p className="text-sm font-medium text-zinc-50 truncate">{workflowName}</p>
          <p className="font-mono text-xs text-zinc-500 mt-0.5 truncate" title={runId}>
            run/{runId.slice(0, 8)}
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          {updatedAt && (
            <span className="font-mono text-xs text-zinc-500 hidden sm:block">
              {relativeTime(updatedAt)}
            </span>
          )}
          <StatusBadge status={status} />
        </div>
      </div>

      {/* Live region for screen reader announcements */}
      <div
        id={liveRegionId}
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      >
        {activeStep ? `Active: ${activeStep.label}` : status === 'done' ? 'Workflow complete' : ''}
      </div>

      {/* Step list */}
      {steps.length === 0 ? (
        <div className="px-4 py-8 flex flex-col items-center gap-2 text-center">
          <svg className="h-6 w-6 text-zinc-700" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" />
          </svg>
          <p className="text-sm text-zinc-500">No steps defined</p>
        </div>
      ) : (
        <ol className="p-4 space-y-0" role="list" aria-label={`Workflow steps — ${status}`}>
          {steps.map((step, index) => {
            const isLast = index === steps.length - 1;
            const elapsed = elapsedSeconds(step.startedAt, step.completedAt);

            return (
              <li
                key={step.id}
                className="relative flex gap-3"
                aria-label={`Step ${index + 1} of ${steps.length}: ${step.label}, ${step.status}`}
                aria-current={step.status === 'running' ? 'step' : undefined}
                aria-busy={step.status === 'running' ? true : undefined}
              >
                {/* Connector line */}
                {!isLast && (
                  <div
                    className="absolute left-[7px] top-5 bottom-0 w-px bg-zinc-800"
                    aria-hidden="true"
                  />
                )}

                {/* Icon */}
                <div className="mt-0.5 relative z-10">
                  <StepIcon status={step.status} />
                </div>

                {/* Content */}
                <div className={`flex-1 pb-4 min-w-0 ${isLast ? 'pb-0' : ''}`}>
                  <div className="flex items-baseline justify-between gap-2 min-h-[2rem] items-center">
                    <span
                      className={`text-sm leading-snug truncate ${
                        step.status === 'done'
                          ? 'text-zinc-400'
                          : step.status === 'running'
                          ? 'text-zinc-100 font-medium'
                          : step.status === 'failed'
                          ? 'text-red-400'
                          : 'text-zinc-600'
                      }`}
                    >
                      {step.label}
                    </span>
                    <div className="flex items-center gap-1.5 shrink-0">
                      {step.type === 'ai_call' && (
                        <span className="bg-indigo-500/10 text-indigo-400 text-[10px] px-1.5 py-0.5 rounded font-mono leading-none">
                          {STEP_TYPE_LABELS.ai_call}
                        </span>
                      )}
                      {step.type === 'gate' && (
                        <span className="bg-amber-500/10 text-amber-400 text-[10px] px-1.5 py-0.5 rounded font-mono leading-none">
                          gate
                        </span>
                      )}
                      {elapsed && (
                        <span className="font-mono text-[10px] text-zinc-600">{elapsed}</span>
                      )}
                    </div>
                  </div>

                  {/* Step detail: AI model */}
                  {step.aiModel && step.status !== 'pending' && (
                    <p className="font-mono text-[10px] text-zinc-600 mt-0.5 truncate">
                      model: {step.aiModel}
                    </p>
                  )}

                  {/* Error message */}
                  {step.status === 'failed' && step.errorMessage && (
                    <p className="text-xs text-red-400/80 mt-1 leading-snug">
                      {step.errorMessage}
                    </p>
                  )}
                </div>
              </li>
            );
          })}
        </ol>
      )}
    </div>
  );
}

export default WorkflowVisualization;
