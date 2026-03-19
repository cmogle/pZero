/**
 * AIOutputPanel — surfaces AI intelligence output: signal headline, reasoning, playbook selection.
 *
 * Design spec: docs/design/phase3-components.md § 2
 * Data contract: DecisionResult from @pzero/runtime
 * IX principles: zero-click intelligence (§ 2) — reasoning visible on arrival, no accordion
 * Accessibility: WCAG 2.1 AA — see docs/design/accessibility.md
 */

'use client';

import * as React from 'react';
import type { DecisionResult } from '@pzero/runtime';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface AIOutputPanelProps {
  decision: DecisionResult;
  /** ISO 8601 — shown as "Updated X ago" */
  generatedAt?: string;
  loading?: boolean;
  className?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function relativeTime(iso?: string): string {
  if (!iso) return '';
  const diff = Math.floor((Date.now() - Date.parse(iso)) / 1000);
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

/** Split reasoning into lines and count for truncation threshold */
const REASONING_LINE_THRESHOLD = 4;

function SkeletonLine({ className = '' }: { className?: string }) {
  return (
    <div
      className={`h-3 bg-zinc-800 rounded motion-safe:animate-pulse ${className}`}
      aria-hidden="true"
    />
  );
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-[10px] font-medium text-zinc-500 uppercase tracking-widest">
      {children}
    </p>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function AIOutputPanel({
  decision,
  generatedAt,
  loading = false,
  className = '',
}: AIOutputPanelProps) {
  const [expanded, setExpanded] = React.useState(false);

  const reasoningId = React.useId();
  const liveRegionId = React.useId();

  const reasoningLines = decision?.reasoning?.split('\n') ?? [];
  const needsTruncation = !loading && reasoningLines.length > REASONING_LINE_THRESHOLD;
  const visibleReasoning =
    needsTruncation && !expanded
      ? reasoningLines.slice(0, REASONING_LINE_THRESHOLD).join('\n')
      : decision?.reasoning ?? '';

  if (loading) {
    return (
      <div
        className={`bg-zinc-900 border border-zinc-800 rounded-md p-4 space-y-4 ${className}`}
        aria-busy="true"
        aria-label="Loading AI output"
      >
        <div className="flex items-baseline justify-between">
          <SkeletonLine className="w-12" />
          <SkeletonLine className="w-16" />
        </div>
        <SkeletonLine className="w-3/4 h-5" />
        <SkeletonLine className="w-1/2 h-5" />
        <div className="space-y-1.5 pt-1">
          <SkeletonLine className="w-20" />
          <div className="bg-zinc-950 border border-zinc-800 rounded p-3 space-y-1.5">
            {[0, 1, 2, 3].map((i) => (
              <SkeletonLine key={i} className={i === 3 ? 'w-2/3' : 'w-full'} />
            ))}
          </div>
        </div>
        <div className="flex gap-3">
          <div className="h-8 w-40 bg-zinc-800 rounded motion-safe:animate-pulse" />
          <div className="h-8 w-24 bg-zinc-800 rounded motion-safe:animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className={`bg-zinc-900 border border-zinc-800 rounded-md ${className}`}>
      {/* Header */}
      <div className="px-4 pt-4 pb-3 border-b border-zinc-800 flex items-start justify-between gap-2">
        <div className="space-y-1 min-w-0">
          <SectionLabel>Signal</SectionLabel>
          <h2 className="text-xl lg:text-2xl font-semibold text-zinc-50 leading-snug">
            {decision.signalHeadline}
          </h2>
        </div>
        {generatedAt && (
          <span className="font-mono text-xs text-zinc-500 shrink-0 mt-0.5" suppressHydrationWarning>
            {relativeTime(generatedAt)}
          </span>
        )}
      </div>

      <div className="px-4 py-4 space-y-4">
        {/* Reasoning */}
        <div className="space-y-2">
          <SectionLabel>AI Reasoning</SectionLabel>
          <div
            id={reasoningId}
            role="region"
            aria-label="AI reasoning"
            className="bg-zinc-950 border border-zinc-800 rounded p-3 relative"
          >
            <pre className="font-mono text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap break-words">
              {visibleReasoning}
              {needsTruncation && !expanded && (
                <span
                  className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-zinc-950 to-transparent rounded-b pointer-events-none"
                  aria-hidden="true"
                />
              )}
            </pre>
            {needsTruncation && (
              <button
                type="button"
                onClick={() => setExpanded((v) => !v)}
                aria-expanded={expanded}
                aria-controls={reasoningId}
                className="mt-2 text-xs text-indigo-400 hover:text-indigo-300 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 rounded"
              >
                {expanded ? 'Show less' : `Show more (${reasoningLines.length - REASONING_LINE_THRESHOLD} more lines)`}
              </button>
            )}
          </div>
        </div>

        {/* Playbook + blocks row */}
        {decision.shouldRespond ? (
          <div className="flex flex-wrap items-center gap-3">
            {/* Playbook */}
            <div className="space-y-1.5">
              <SectionLabel>Selected Playbook</SectionLabel>
              <div
                role="status"
                className="inline-flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm px-3 py-1.5 rounded"
              >
                {/* Sparkle icon */}
                <svg className="h-3 w-3 shrink-0" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path
                    d="M6 1L7.06 4.47L10.5 4.47L7.72 6.53L8.78 10L6 7.94L3.22 10L4.28 6.53L1.5 4.47L4.94 4.47L6 1Z"
                    fill="currentColor"
                  />
                </svg>
                <span>{decision.playbookId ?? 'Default playbook'}</span>
              </div>
            </div>

            {/* Content blocks */}
            <div className="space-y-1.5">
              <SectionLabel>Content Blocks</SectionLabel>
              <p className="text-sm text-zinc-400 py-1.5">
                {decision.selectedBlockIds.length === 0
                  ? 'No blocks selected'
                  : `${decision.selectedBlockIds.length} block${decision.selectedBlockIds.length !== 1 ? 's' : ''} selected`}
              </p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-zinc-500 italic">
            No action recommended — AI determined a response is not warranted at this time.
          </p>
        )}
      </div>

      {/* Live region for dynamic updates (streaming/polling) */}
      <div
        id={liveRegionId}
        className="sr-only"
        aria-live="polite"
        aria-atomic="true"
      >
        {decision.shouldRespond
          ? `AI recommends action: ${decision.signalHeadline}`
          : 'No action recommended'}
      </div>
    </div>
  );
}

export default AIOutputPanel;
