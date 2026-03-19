/**
 * WorkflowVisualization — displays a Phoenix Design API workflow run as a vertical step timeline.
 *
 * Design spec: docs/design/phase3-components.md § 1
 * Data contract: ADR-007 Phoenix Design API (packages/runtime)
 * Design system: packages/design-system/README.md
 * IX principles: docs/design/ix-principles.md (zero-click intelligence, § 2)
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs } from "react/jsx-runtime";
import * as React from 'react';
// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function elapsedSeconds(startedAt, completedAt) {
    if (!startedAt)
        return null;
    const start = Date.parse(startedAt);
    const end = completedAt ? Date.parse(completedAt) : Date.now();
    const diff = (end - start) / 1000;
    return diff < 60 ? `${diff.toFixed(1)}s` : `${(diff / 60).toFixed(1)}m`;
}
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
const STEP_TYPE_LABELS = {
    task: 'task',
    ai_call: 'ai',
    gate: 'gate',
};
// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------
function StatusBadge({ status }) {
    const variants = {
        idle: 'bg-zinc-800 text-zinc-400 border-zinc-700',
        running: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/30',
        done: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
        failed: 'bg-red-600/10 text-red-400 border-red-600/30',
    };
    const labels = {
        idle: 'idle',
        running: 'running',
        done: 'done',
        failed: 'failed',
    };
    return (_jsxs("span", { className: `inline-flex items-center border rounded px-2 py-0.5 text-xs font-medium ${variants[status]}`, children: [status === 'running' && (_jsx("span", { className: "mr-1.5 h-1.5 w-1.5 rounded-full bg-indigo-400 motion-safe:animate-pulse", "aria-hidden": "true" })), labels[status]] }));
}
function StepIcon({ status }) {
    if (status === 'done') {
        return (_jsxs("svg", { className: "h-4 w-4 text-emerald-500 shrink-0", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: [_jsx("circle", { cx: "8", cy: "8", r: "7", stroke: "currentColor", strokeWidth: "1.5" }), _jsx("path", { d: "M5 8l2.5 2.5L11 5.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })] }));
    }
    if (status === 'running') {
        return (_jsx("svg", { className: "h-4 w-4 text-indigo-400 shrink-0 motion-safe:animate-spin", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: _jsx("circle", { cx: "8", cy: "8", r: "6", stroke: "currentColor", strokeWidth: "1.5", strokeDasharray: "20 18", strokeLinecap: "round" }) }));
    }
    if (status === 'failed') {
        return (_jsxs("svg", { className: "h-4 w-4 text-red-500 shrink-0", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: [_jsx("circle", { cx: "8", cy: "8", r: "7", stroke: "currentColor", strokeWidth: "1.5" }), _jsx("path", { d: "M5.5 5.5l5 5M10.5 5.5l-5 5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })] }));
    }
    // pending
    return (_jsx("svg", { className: "h-4 w-4 text-zinc-700 shrink-0", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: _jsx("circle", { cx: "8", cy: "8", r: "7", stroke: "currentColor", strokeWidth: "1.5" }) }));
}
function SkeletonLine({ className = '' }) {
    return (_jsx("div", { className: `h-3 bg-zinc-800 rounded motion-safe:animate-pulse ${className}`, "aria-hidden": "true" }));
}
// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export function WorkflowVisualization({ runId, workflowName, status, steps, updatedAt, loading = false, className = '', }) {
    const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
    // Re-render every second while a step is running so elapsed timers update
    React.useEffect(() => {
        if (status !== 'running')
            return;
        const id = setInterval(forceUpdate, 1000);
        return () => clearInterval(id);
    }, [status]);
    const liveRegionId = React.useId();
    if (loading) {
        return (_jsxs("div", { className: `bg-zinc-900 border border-zinc-800 rounded-md p-4 space-y-4 ${className}`, "aria-busy": "true", "aria-label": "Loading workflow", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(SkeletonLine, { className: "w-40" }), _jsx(SkeletonLine, { className: "w-16" })] }), _jsx(SkeletonLine, { className: "w-24" }), _jsx("div", { className: "space-y-3 pt-1", children: [0, 1, 2, 3, 4].map((i) => (_jsxs("div", { className: "flex items-center gap-3", children: [_jsx("div", { className: "h-4 w-4 rounded-full bg-zinc-800 shrink-0 motion-safe:animate-pulse" }), _jsx(SkeletonLine, { className: "flex-1" }), _jsx(SkeletonLine, { className: "w-10" })] }, i))) })] }));
    }
    const activeStep = steps.find((s) => s.status === 'running');
    return (_jsxs("div", { className: `bg-zinc-900 border border-zinc-800 rounded-md ${className}`, children: [_jsxs("div", { className: "px-4 py-3 border-b border-zinc-800 flex items-center justify-between gap-2", children: [_jsxs("div", { className: "min-w-0", children: [_jsx("p", { className: "text-sm font-medium text-zinc-50 truncate", children: workflowName }), _jsxs("p", { className: "font-mono text-xs text-zinc-500 mt-0.5 truncate", title: runId, children: ["run/", runId.slice(0, 8)] })] }), _jsxs("div", { className: "flex items-center gap-2 shrink-0", children: [updatedAt && (_jsx("span", { className: "font-mono text-xs text-zinc-500 hidden sm:block", children: relativeTime(updatedAt) })), _jsx(StatusBadge, { status: status })] })] }), _jsx("div", { id: liveRegionId, className: "sr-only", "aria-live": "polite", "aria-atomic": "true", children: activeStep ? `Active: ${activeStep.label}` : status === 'done' ? 'Workflow complete' : '' }), steps.length === 0 ? (_jsxs("div", { className: "px-4 py-8 flex flex-col items-center gap-2 text-center", children: [_jsx("svg", { className: "h-6 w-6 text-zinc-700", viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: "1.5", "aria-hidden": "true", children: _jsx("path", { strokeLinecap: "round", strokeLinejoin: "round", d: "M3.75 6.75h16.5M3.75 12h16.5M12 17.25h8.25" }) }), _jsx("p", { className: "text-sm text-zinc-500", children: "No steps defined" })] })) : (_jsx("ol", { className: "p-4 space-y-0", role: "list", "aria-label": `Workflow steps — ${status}`, children: steps.map((step, index) => {
                    const isLast = index === steps.length - 1;
                    const elapsed = elapsedSeconds(step.startedAt, step.completedAt);
                    return (_jsxs("li", { className: "relative flex gap-3", "aria-label": `Step ${index + 1} of ${steps.length}: ${step.label}, ${step.status}`, "aria-current": step.status === 'running' ? 'step' : undefined, "aria-busy": step.status === 'running' ? true : undefined, children: [!isLast && (_jsx("div", { className: "absolute left-[7px] top-5 bottom-0 w-px bg-zinc-800", "aria-hidden": "true" })), _jsx("div", { className: "mt-0.5 relative z-10", children: _jsx(StepIcon, { status: step.status }) }), _jsxs("div", { className: `flex-1 pb-4 min-w-0 ${isLast ? 'pb-0' : ''}`, children: [_jsxs("div", { className: "flex items-baseline justify-between gap-2 min-h-[2rem] items-center", children: [_jsx("span", { className: `text-sm leading-snug truncate ${step.status === 'done'
                                                    ? 'text-zinc-400'
                                                    : step.status === 'running'
                                                        ? 'text-zinc-100 font-medium'
                                                        : step.status === 'failed'
                                                            ? 'text-red-400'
                                                            : 'text-zinc-600'}`, children: step.label }), _jsxs("div", { className: "flex items-center gap-1.5 shrink-0", children: [step.type === 'ai_call' && (_jsx("span", { className: "bg-indigo-500/10 text-indigo-400 text-[10px] px-1.5 py-0.5 rounded font-mono leading-none", children: STEP_TYPE_LABELS.ai_call })), step.type === 'gate' && (_jsx("span", { className: "bg-amber-500/10 text-amber-400 text-[10px] px-1.5 py-0.5 rounded font-mono leading-none", children: "gate" })), elapsed && (_jsx("span", { className: "font-mono text-[10px] text-zinc-600", children: elapsed }))] })] }), step.aiModel && step.status !== 'pending' && (_jsxs("p", { className: "font-mono text-[10px] text-zinc-600 mt-0.5 truncate", children: ["model: ", step.aiModel] })), step.status === 'failed' && step.errorMessage && (_jsx("p", { className: "text-xs text-red-400/80 mt-1 leading-snug", children: step.errorMessage }))] })] }, step.id));
                }) }))] }));
}
export default WorkflowVisualization;
//# sourceMappingURL=WorkflowVisualization.js.map