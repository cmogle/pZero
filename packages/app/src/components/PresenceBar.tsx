/**
 * PresenceBar — live collaboration indicators: connected collaborators, live status, last updated.
 *
 * Design spec: docs/design/phase3-components.md § 4
 * Data contract: stub — maps to ICollabPrimitives.presence() once the collaboration layer ships (ADR-007)
 * IX principles: zero-click visibility of collaboration state
 * Accessibility: WCAG 2.1 AA — see docs/design/accessibility.md
 */

'use client';

import * as React from 'react';

// ---------------------------------------------------------------------------
// Types
// ---------------------------------------------------------------------------

export interface Collaborator {
  id: string;
  name: string;
  /** 1-2 char initials fallback when no avatar URL */
  initials: string;
  /** Optional avatar image URL */
  avatarUrl?: string;
  isCurrentUser?: boolean;
}

export interface PresenceBarProps {
  collaborators: Collaborator[];
  /** ISO 8601 */
  lastUpdatedAt?: string;
  /** Whether the workflow run is actively broadcasting events */
  isLive?: boolean;
  /** Max visible avatars before overflow count. Default: 3 */
  maxVisible?: number;
  className?: string;
}

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function relativeTime(iso?: string): string {
  if (!iso) return '';
  const diff = Math.floor((Date.now() - Date.parse(iso)) / 1000);
  if (diff < 5) return 'just now';
  if (diff < 60) return `${diff}s ago`;
  if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
  return `${Math.floor(diff / 3600)}h ago`;
}

/**
 * Deterministic hue from a string — used to give each collaborator a consistent
 * accent ring color without requiring an explicit color assignment.
 */
function colorFromId(id: string): string {
  let hash = 0;
  for (let i = 0; i < id.length; i++) {
    hash = id.charCodeAt(i) + ((hash << 5) - hash);
  }
  // Return one of a curated set of accessible accent colors (not zinc, not indigo which is reserved for current user)
  const palette = ['#a78bfa', '#34d399', '#f59e0b', '#fb923c', '#38bdf8', '#f472b6'];
  return palette[Math.abs(hash) % palette.length];
}

// ---------------------------------------------------------------------------
// Sub-components
// ---------------------------------------------------------------------------

interface AvatarProps {
  collaborator: Collaborator;
  size?: 'sm' | 'md';
}

function Avatar({ collaborator, size = 'sm' }: AvatarProps) {
  const sizeClass = size === 'sm' ? 'h-7 w-7 text-[10px]' : 'h-8 w-8 text-xs';
  const ringColor = collaborator.isCurrentUser
    ? 'border-indigo-500'
    : 'border-zinc-900';
  const accentColor = collaborator.isCurrentUser ? undefined : colorFromId(collaborator.id);

  return (
    <div
      role="listitem"
      aria-label={`${collaborator.name}${collaborator.isCurrentUser ? ', you' : ''}`}
      title={collaborator.name}
      className={`${sizeClass} rounded-full border-2 ${ringColor} flex items-center justify-center shrink-0 overflow-hidden relative`}
      style={accentColor ? { borderColor: accentColor } : undefined}
    >
      {collaborator.avatarUrl ? (
        <img
          src={collaborator.avatarUrl}
          alt={collaborator.name}
          className="h-full w-full object-cover"
        />
      ) : (
        <span
          className="font-mono font-medium text-zinc-300 bg-zinc-800 h-full w-full flex items-center justify-center"
          aria-hidden="true"
        >
          {collaborator.initials.slice(0, 2).toUpperCase()}
        </span>
      )}
    </div>
  );
}

// ---------------------------------------------------------------------------
// Main component
// ---------------------------------------------------------------------------

export function PresenceBar({
  collaborators,
  lastUpdatedAt,
  isLive = false,
  maxVisible = 3,
  className = '',
}: PresenceBarProps) {
  const [, forceUpdate] = React.useReducer((x: number) => x + 1, 0);

  // Re-render every 30s so relative timestamp stays fresh
  React.useEffect(() => {
    const id = setInterval(forceUpdate, 30_000);
    return () => clearInterval(id);
  }, []);

  const visible = collaborators.slice(0, maxVisible);
  const overflow = collaborators.length - maxVisible;

  return (
    <div
      className={`flex items-center gap-3 flex-wrap ${className}`}
      aria-label="Collaboration status"
    >
      {/* Live indicator */}
      {isLive && (
        <div className="flex items-center gap-1.5">
          <span
            className="h-2 w-2 rounded-full bg-emerald-500 motion-safe:animate-pulse shrink-0"
            aria-hidden="true"
          />
          <span
            role="status"
            aria-live="polite"
            className="text-xs text-emerald-400 font-medium"
          >
            Live
          </span>
        </div>
      )}

      {/* Separator */}
      {isLive && collaborators.length > 0 && (
        <span className="text-zinc-700 text-xs" aria-hidden="true">·</span>
      )}

      {/* Avatar stack */}
      {collaborators.length > 0 && (
        <div
          role="list"
          aria-label={`${collaborators.length} active collaborator${collaborators.length !== 1 ? 's' : ''}`}
          className="flex items-center -space-x-2"
        >
          {visible.map((c) => (
            <Avatar key={c.id} collaborator={c} />
          ))}
          {overflow > 0 && (
            <div
              role="listitem"
              aria-label={`${overflow} more collaborator${overflow !== 1 ? 's' : ''}`}
              title={collaborators
                .slice(maxVisible)
                .map((c) => c.name)
                .join(', ')}
              className="h-7 w-7 rounded-full border-2 border-zinc-900 bg-zinc-800 flex items-center justify-center font-mono text-[10px] text-zinc-400 shrink-0"
            >
              +{overflow}
            </div>
          )}
        </div>
      )}

      {/* Separator before timestamp */}
      {collaborators.length > 0 && lastUpdatedAt && (
        <span className="text-zinc-700 text-xs" aria-hidden="true">·</span>
      )}

      {/* Last updated timestamp */}
      {lastUpdatedAt && (
        <span
          className="font-mono text-xs text-zinc-500"
          suppressHydrationWarning
          title={new Date(lastUpdatedAt).toLocaleString()}
        >
          Updated {relativeTime(lastUpdatedAt)}
        </span>
      )}

      {/* No collaborators state */}
      {collaborators.length === 0 && !isLive && !lastUpdatedAt && (
        <span className="font-mono text-xs text-zinc-600">No active collaborators</span>
      )}
    </div>
  );
}

export default PresenceBar;
