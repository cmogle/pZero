/**
 * PresenceBar — live collaboration indicators: connected collaborators, live status, last updated.
 *
 * Design spec: docs/design/phase3-components.md § 4
 * Data contract: stub — maps to ICollabPrimitives.presence() once the collaboration layer ships (ADR-007)
 * IX principles: zero-click visibility of collaboration state
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
    if (diff < 5)
        return 'just now';
    if (diff < 60)
        return `${diff}s ago`;
    if (diff < 3600)
        return `${Math.floor(diff / 60)}m ago`;
    return `${Math.floor(diff / 3600)}h ago`;
}
/**
 * Deterministic hue from a string — used to give each collaborator a consistent
 * accent ring color without requiring an explicit color assignment.
 */
function colorFromId(id) {
    let hash = 0;
    for (let i = 0; i < id.length; i++) {
        hash = id.charCodeAt(i) + ((hash << 5) - hash);
    }
    // Return one of a curated set of accessible accent colors (not zinc, not indigo which is reserved for current user)
    const palette = ['#a78bfa', '#34d399', '#f59e0b', '#fb923c', '#38bdf8', '#f472b6'];
    return palette[Math.abs(hash) % palette.length];
}
function Avatar({ collaborator, size = 'sm' }) {
    const sizeClass = size === 'sm' ? 'h-7 w-7 text-[10px]' : 'h-8 w-8 text-xs';
    const ringColor = collaborator.isCurrentUser
        ? 'border-indigo-500'
        : 'border-zinc-900';
    const accentColor = collaborator.isCurrentUser ? undefined : colorFromId(collaborator.id);
    return (_jsx("div", { role: "listitem", "aria-label": `${collaborator.name}${collaborator.isCurrentUser ? ', you' : ''}`, title: collaborator.name, className: `${sizeClass} rounded-full border-2 ${ringColor} flex items-center justify-center shrink-0 overflow-hidden relative`, style: accentColor ? { borderColor: accentColor } : undefined, children: collaborator.avatarUrl ? (_jsx("img", { src: collaborator.avatarUrl, alt: collaborator.name, className: "h-full w-full object-cover" })) : (_jsx("span", { className: "font-mono font-medium text-zinc-300 bg-zinc-800 h-full w-full flex items-center justify-center", "aria-hidden": "true", children: collaborator.initials.slice(0, 2).toUpperCase() })) }));
}
// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------
export function PresenceBar({ collaborators, lastUpdatedAt, isLive = false, maxVisible = 3, className = '', }) {
    const [, forceUpdate] = React.useReducer((x) => x + 1, 0);
    // Re-render every 30s so relative timestamp stays fresh
    React.useEffect(() => {
        const id = setInterval(forceUpdate, 30_000);
        return () => clearInterval(id);
    }, []);
    const visible = collaborators.slice(0, maxVisible);
    const overflow = collaborators.length - maxVisible;
    return (_jsxs("div", { className: `flex items-center gap-3 flex-wrap ${className}`, "aria-label": "Collaboration status", children: [isLive && (_jsxs("div", { className: "flex items-center gap-1.5", children: [_jsx("span", { className: "h-2 w-2 rounded-full bg-emerald-500 motion-safe:animate-pulse shrink-0", "aria-hidden": "true" }), _jsx("span", { role: "status", "aria-live": "polite", className: "text-xs text-emerald-400 font-medium", children: "Live" })] })), isLive && collaborators.length > 0 && (_jsx("span", { className: "text-zinc-700 text-xs", "aria-hidden": "true", children: "\u00B7" })), collaborators.length > 0 && (_jsxs("div", { role: "list", "aria-label": `${collaborators.length} active collaborator${collaborators.length !== 1 ? 's' : ''}`, className: "flex items-center -space-x-2", children: [visible.map((c) => (_jsx(Avatar, { collaborator: c }, c.id))), overflow > 0 && (_jsxs("div", { role: "listitem", "aria-label": `${overflow} more collaborator${overflow !== 1 ? 's' : ''}`, title: collaborators
                            .slice(maxVisible)
                            .map((c) => c.name)
                            .join(', '), className: "h-7 w-7 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center font-mono text-[10px] text-zinc-400 shrink-0", children: ["+", overflow] }))] })), collaborators.length > 0 && lastUpdatedAt && (_jsx("span", { className: "text-zinc-700 text-xs", "aria-hidden": "true", children: "\u00B7" })), lastUpdatedAt && (_jsxs("span", { className: "font-mono text-xs text-zinc-500", suppressHydrationWarning: true, title: new Date(lastUpdatedAt).toLocaleString(), children: ["Updated ", relativeTime(lastUpdatedAt)] })), collaborators.length === 0 && !isLive && !lastUpdatedAt && (_jsx("span", { className: "font-mono text-xs text-zinc-600", children: "No active collaborators" }))] }));
}
export default PresenceBar;
//# sourceMappingURL=PresenceBar.js.map