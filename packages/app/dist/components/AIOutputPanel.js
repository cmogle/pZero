/**
 * AIOutputPanel — surfaces AI intelligence output: signal headline, reasoning, playbook selection.
 *
 * Design spec: docs/design/phase3-components.md § 2
 * Data contract: DecisionResult from @pzero/runtime
 * IX principles: zero-click intelligence (§ 2) — reasoning visible on arrival, no accordion
 * Accessibility: WCAG 2.1 AA — see docs/design/accessibility.md
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function relativeTime(iso) {
    if (!iso)
        return '';
    const diff = Math.floor((Date.now() - Date.parse(iso)) / 1000);
    if (diff < 60)
        return `${diff}s ago`;
    if (diff < 3600)
        return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
}
/** Split reasoning into lines and count for truncation threshold */
const REASONING_LINE_THRESHOLD = 4;
function SkeletonLine({ className = '' }) {
    return (_jsx("div", { className: `h-3 bg-zinc-800 rounded motion-safe:animate-pulse ${className}`, "aria-hidden": "true" }));
}
// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------
function SectionLabel({ children }) {
    return (_jsx("p", { className: "text-[10px] font-medium text-zinc-500 uppercase tracking-widest", children: children }));
}
// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export function AIOutputPanel({ decision, generatedAt, loading = false, className = '', }) {
    const [expanded, setExpanded] = React.useState(false);
    const reasoningId = React.useId();
    const liveRegionId = React.useId();
    const reasoningLines = decision?.reasoning?.split('\n') ?? [];
    const needsTruncation = !loading && reasoningLines.length > REASONING_LINE_THRESHOLD;
    const visibleReasoning = needsTruncation && !expanded
        ? reasoningLines.slice(0, REASONING_LINE_THRESHOLD).join('\n')
        : decision?.reasoning ?? '';
    if (loading) {
        return (_jsxs("div", { className: `bg-zinc-900 border border-zinc-800 rounded-md p-4 space-y-4 ${className}`, "aria-busy": "true", "aria-label": "Loading AI output", children: [_jsxs("div", { className: "flex items-baseline justify-between", children: [_jsx(SkeletonLine, { className: "w-12" }), _jsx(SkeletonLine, { className: "w-16" })] }), _jsx(SkeletonLine, { className: "w-3/4 h-5" }), _jsx(SkeletonLine, { className: "w-1/2 h-5" }), _jsxs("div", { className: "space-y-1.5 pt-1", children: [_jsx(SkeletonLine, { className: "w-20" }), _jsx("div", { className: "bg-zinc-950 border border-zinc-800 rounded p-3 space-y-1.5", children: [0, 1, 2, 3].map((i) => (_jsx(SkeletonLine, { className: i === 3 ? 'w-2/3' : 'w-full' }, i))) })] }), _jsxs("div", { className: "flex gap-3", children: [_jsx("div", { className: "h-8 w-40 bg-zinc-800 rounded motion-safe:animate-pulse" }), _jsx("div", { className: "h-8 w-24 bg-zinc-800 rounded motion-safe:animate-pulse" })] })] }));
    }
    return (_jsxs("div", { className: `bg-zinc-900 border border-zinc-800 rounded-md ${className}`, children: [_jsxs("div", { className: "px-4 pt-4 pb-3 border-b border-zinc-800 flex items-start justify-between gap-2", children: [_jsxs("div", { className: "space-y-1 min-w-0", children: [_jsx(SectionLabel, { children: "Signal" }), _jsx("h2", { className: "text-xl lg:text-2xl font-semibold text-zinc-50 leading-snug", children: decision.signalHeadline })] }), generatedAt && (_jsx("span", { className: "font-mono text-xs text-zinc-500 shrink-0 mt-0.5", suppressHydrationWarning: true, children: relativeTime(generatedAt) }))] }), _jsxs("div", { className: "px-4 py-4 space-y-4", children: [_jsxs("div", { className: "space-y-2", children: [_jsx(SectionLabel, { children: "AI Reasoning" }), _jsxs("div", { id: reasoningId, role: "region", "aria-label": "AI reasoning", className: "bg-zinc-950 border border-zinc-800 rounded p-3 relative", children: [_jsxs("pre", { className: "font-mono text-sm text-zinc-300 leading-relaxed whitespace-pre-wrap break-words", children: [visibleReasoning, needsTruncation && !expanded && (_jsx("span", { className: "absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-zinc-950 to-transparent rounded-b pointer-events-none", "aria-hidden": "true" }))] }), needsTruncation && (_jsx("button", { type: "button", onClick: () => setExpanded((v) => !v), "aria-expanded": expanded, "aria-controls": reasoningId, className: "mt-2 text-xs text-indigo-400 hover:text-indigo-300 transition-colors duration-150 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950 rounded", children: expanded ? 'Show less' : `Show more (${reasoningLines.length - REASONING_LINE_THRESHOLD} more lines)` }))] })] }), decision.shouldRespond ? (_jsxs("div", { className: "flex flex-wrap items-center gap-3", children: [_jsxs("div", { className: "space-y-1.5", children: [_jsx(SectionLabel, { children: "Selected Playbook" }), _jsxs("div", { role: "status", className: "inline-flex items-center gap-1.5 bg-indigo-500/10 border border-indigo-500/20 text-indigo-300 text-sm px-3 py-1.5 rounded", children: [_jsx("svg", { className: "h-3 w-3 shrink-0", viewBox: "0 0 12 12", fill: "none", "aria-hidden": "true", children: _jsx("path", { d: "M6 1L7.06 4.47L10.5 4.47L7.72 6.53L8.78 10L6 7.94L3.22 10L4.28 6.53L1.5 4.47L4.94 4.47L6 1Z", fill: "currentColor" }) }), _jsx("span", { children: decision.playbookId ?? 'Default playbook' })] })] }), _jsxs("div", { className: "space-y-1.5", children: [_jsx(SectionLabel, { children: "Content Blocks" }), _jsx("p", { className: "text-sm text-zinc-400 py-1.5", children: decision.selectedBlockIds.length === 0
                                            ? 'No blocks selected'
                                            : `${decision.selectedBlockIds.length} block${decision.selectedBlockIds.length !== 1 ? 's' : ''} selected` })] })] })) : (_jsx("p", { className: "text-sm text-zinc-500 italic", children: "No action recommended \u2014 AI determined a response is not warranted at this time." }))] }), _jsx("div", { id: liveRegionId, className: "sr-only", "aria-live": "polite", "aria-atomic": "true", children: decision.shouldRespond
                    ? `AI recommends action: ${decision.signalHeadline}`
                    : 'No action recommended' })] }));
}
export default AIOutputPanel;
//# sourceMappingURL=AIOutputPanel.js.map