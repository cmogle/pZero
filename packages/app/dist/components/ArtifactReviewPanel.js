/**
 * ArtifactReviewPanel — Account Manager HITL review interface for action artifacts.
 *
 * Design spec: docs/design/phase3-components.md § 3
 * Data contract: ReviewPayload / ReviewVerdict from @pzero/runtime
 * INT-15: Present decision + artifact; no autonomous send without approval.
 * IX principles: action an item in 1 interaction (§ 3), destructive requires confirmation
 * Accessibility: WCAG 2.1 AA — see docs/design/accessibility.md
 */
'use client';
import { jsx as _jsx, jsxs as _jsxs, Fragment as _Fragment } from "react/jsx-runtime";
import * as React from 'react';
// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function SectionLabel({ children }) {
    return (_jsx("p", { className: "text-[10px] font-medium text-zinc-500 uppercase tracking-widest", children: children }));
}
function Spinner() {
    return (_jsx("svg", { className: "h-3.5 w-3.5 motion-safe:animate-spin", viewBox: "0 0 14 14", fill: "none", "aria-hidden": "true", children: _jsx("circle", { cx: "7", cy: "7", r: "5.5", stroke: "currentColor", strokeWidth: "1.5", strokeDasharray: "18 15", strokeLinecap: "round" }) }));
}
// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export function ArtifactReviewPanel({ payload, onVerdict, submitting = false, result, className = '', }) {
    const { decision, artifact } = payload;
    const [mode, setMode] = React.useState('review');
    const [editedBody, setEditedBody] = React.useState(artifact.body);
    const [rejectReason, setRejectReason] = React.useState('');
    const approveButtonRef = React.useRef(null);
    const textareaRef = React.useRef(null);
    const rejectTextareaRef = React.useRef(null);
    const resultBannerId = React.useId();
    // Focus primary action on mount (keyboard-first: approve is ready immediately)
    React.useEffect(() => {
        approveButtonRef.current?.focus();
    }, []);
    // Focus textarea when entering edit or reject mode
    React.useEffect(() => {
        if (mode === 'editing')
            textareaRef.current?.focus();
        if (mode === 'rejecting')
            rejectTextareaRef.current?.focus();
    }, [mode]);
    // Auto-grow textarea height
    function autoGrow(el) {
        el.style.height = 'auto';
        el.style.height = `${el.scrollHeight}px`;
    }
    async function handleApprove() {
        const verdict = mode === 'editing'
            ? { outcome: 'edit', body: editedBody }
            : { outcome: 'approved' };
        await onVerdict(verdict);
    }
    async function handleRejectConfirm() {
        const verdict = {
            outcome: 'rejected',
            reason: rejectReason.trim() || undefined,
        };
        await onVerdict(verdict);
    }
    function cancelEdit() {
        setEditedBody(artifact.body);
        setMode('review');
    }
    function cancelReject() {
        setRejectReason('');
        setMode('review');
    }
    // If a result has been returned (post-verdict), show a terminal banner
    if (result) {
        return (_jsxs("div", { className: `bg-zinc-900 border border-zinc-800 rounded-md ${className}`, role: "region", "aria-label": "Artifact review \u2014 verdict recorded", children: [_jsxs("div", { className: "px-4 py-3 border-b border-zinc-800 flex items-center justify-between", children: [_jsx("p", { className: "text-sm font-medium text-zinc-50", children: "Review Action Artifact" }), _jsx("span", { className: "font-mono text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded", children: artifact.kind })] }), _jsx("div", { id: resultBannerId, role: "alert", "aria-live": "assertive", className: `mx-4 my-4 p-3 rounded text-sm flex items-center gap-2 ${result.accepted
                        ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400'
                        : 'bg-zinc-800 border border-zinc-700 text-zinc-400'}`, children: result.accepted ? (_jsxs(_Fragment, { children: [_jsxs("svg", { className: "h-4 w-4 shrink-0", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: [_jsx("circle", { cx: "8", cy: "8", r: "7", stroke: "currentColor", strokeWidth: "1.5" }), _jsx("path", { d: "M5 8l2.5 2.5L11 5.5", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" })] }), _jsx("span", { children: result.message ?? 'Approved — handed off to execution.' })] })) : (_jsxs(_Fragment, { children: [_jsxs("svg", { className: "h-4 w-4 shrink-0", viewBox: "0 0 16 16", fill: "none", "aria-hidden": "true", children: [_jsx("circle", { cx: "8", cy: "8", r: "7", stroke: "currentColor", strokeWidth: "1.5" }), _jsx("path", { d: "M6 6l4 4M10 6l-4 4", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round" })] }), _jsx("span", { children: result.message ?? 'Rejected — no action taken.' })] })) })] }));
    }
    return (_jsxs("div", { className: `bg-zinc-900 border border-zinc-800 rounded-md ${className}`, role: "region", "aria-label": "Artifact review", children: [_jsxs("div", { className: "px-4 py-3 border-b border-zinc-800 flex items-center justify-between gap-2", children: [_jsx("p", { className: "text-sm font-medium text-zinc-50", children: "Review Action Artifact" }), _jsx("span", { className: "font-mono text-xs bg-zinc-800 text-zinc-400 px-2 py-0.5 rounded shrink-0", children: artifact.kind })] }), _jsxs("div", { className: "px-4 py-4 space-y-4", children: [_jsxs("div", { className: "space-y-1.5", children: [_jsx(SectionLabel, { children: "Why this action" }), _jsx("div", { role: "region", "aria-label": "Decision reasoning", className: "bg-zinc-950 border border-zinc-800 rounded p-3", children: _jsx("p", { className: "font-mono text-sm text-zinc-300 leading-relaxed", children: decision.reasoning }) })] }), _jsxs("div", { className: "space-y-1.5", children: [_jsxs("div", { className: "flex items-center justify-between", children: [_jsx(SectionLabel, { children: "Drafted Content" }), mode === 'review' && (_jsxs("span", { className: "font-mono text-[10px] text-zinc-600", children: [artifact.sourceBlockIds.length, " block", artifact.sourceBlockIds.length !== 1 ? 's' : ''] })), mode === 'editing' && (_jsx("span", { className: "text-[10px] text-indigo-400 font-medium", children: "editing" }))] }), mode === 'editing' ? (_jsx("textarea", { ref: textareaRef, value: editedBody, onChange: (e) => {
                                    setEditedBody(e.target.value);
                                    autoGrow(e.target);
                                }, onFocus: (e) => autoGrow(e.target), rows: 6, "aria-label": "Edit artifact body", "aria-required": false, className: "w-full bg-zinc-950 border border-indigo-500 ring-1 ring-indigo-500 rounded p-4 text-sm text-zinc-200 leading-relaxed resize-none min-h-32 focus:outline-none font-sans placeholder-zinc-600", placeholder: "Edit the artifact content here\u2026" })) : (_jsx("div", { className: "bg-zinc-950 border border-zinc-800 rounded p-4 text-sm text-zinc-200 leading-relaxed whitespace-pre-wrap min-h-32", "aria-label": "Artifact body (read-only)", children: artifact.body }))] }), mode === 'rejecting' && (_jsxs("div", { className: "space-y-1.5", role: "alertdialog", "aria-label": "Confirm rejection", "aria-modal": "false", children: [_jsx(SectionLabel, { children: "Reason for rejection (optional)" }), _jsx("textarea", { ref: rejectTextareaRef, value: rejectReason, onChange: (e) => setRejectReason(e.target.value), rows: 3, "aria-label": "Rejection reason (optional)", className: "w-full bg-zinc-950 border border-zinc-700 rounded p-3 text-sm text-zinc-200 leading-relaxed resize-none focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 font-sans placeholder-zinc-600 transition-colors duration-150", placeholder: "Briefly explain why this action was rejected\u2026" })] })), _jsx("div", { className: "pt-1", children: _jsxs("div", { className: "flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2", children: [_jsxs("div", { className: "flex flex-col sm:flex-row gap-2 order-2 sm:order-1", children: [mode === 'review' && (_jsxs(_Fragment, { children: [_jsx("button", { type: "button", onClick: () => setMode('editing'), disabled: submitting, "aria-label": "Edit action artifact", className: "inline-flex items-center justify-center px-4 py-2 min-h-[44px] text-sm text-zinc-300 border border-zinc-700 hover:border-zinc-600 hover:text-zinc-100 rounded transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950", children: "Edit" }), _jsx("button", { type: "button", onClick: () => setMode('rejecting'), disabled: submitting, "aria-label": "Reject action artifact", className: "inline-flex items-center justify-center px-4 py-2 min-h-[44px] text-sm text-zinc-400 hover:text-red-400 rounded transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950", children: "Reject" })] })), (mode === 'editing' || mode === 'rejecting') && (_jsx("button", { type: "button", onClick: mode === 'editing' ? cancelEdit : cancelReject, disabled: submitting, className: "inline-flex items-center justify-center px-4 py-2 min-h-[44px] text-sm text-zinc-400 border border-zinc-700 hover:border-zinc-600 hover:text-zinc-200 rounded transition-colors duration-150 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950", children: "Cancel" }))] }), _jsx("div", { className: "order-1 sm:order-2", children: mode === 'rejecting' ? (_jsxs("button", { type: "button", onClick: handleRejectConfirm, disabled: submitting, "aria-busy": submitting, className: "inline-flex w-full sm:w-auto items-center justify-center gap-2 px-4 py-2 min-h-[44px] text-sm font-medium bg-red-600 hover:bg-red-500 text-white rounded transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950", children: [submitting && _jsx(Spinner, {}), "Confirm Reject"] })) : (_jsxs("button", { ref: approveButtonRef, type: "button", onClick: handleApprove, disabled: submitting, "aria-busy": submitting, "aria-label": mode === 'editing' ? 'Save edits and approve action artifact' : 'Approve action artifact', className: "inline-flex w-full sm:w-auto items-center justify-center gap-2 px-4 py-2 min-h-[44px] text-sm font-medium bg-indigo-500 hover:bg-indigo-400 text-white rounded transition-colors duration-150 disabled:opacity-60 disabled:cursor-not-allowed focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:ring-offset-zinc-950", children: [submitting && _jsx(Spinner, {}), mode === 'editing' ? 'Save and Approve' : 'Approve', !submitting && (_jsx("svg", { className: "h-3.5 w-3.5", viewBox: "0 0 14 14", fill: "none", "aria-hidden": "true", children: _jsx("path", { d: "M3 7l3 3 5-6", stroke: "currentColor", strokeWidth: "1.5", strokeLinecap: "round", strokeLinejoin: "round" }) }))] })) })] }) })] })] }));
}
export default ArtifactReviewPanel;
//# sourceMappingURL=ArtifactReviewPanel.js.map