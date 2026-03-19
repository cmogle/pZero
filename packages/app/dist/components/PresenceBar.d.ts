/**
 * PresenceBar — live collaboration indicators: connected collaborators, live status, last updated.
 *
 * Design spec: docs/design/phase3-components.md § 4
 * Data contract: stub — maps to ICollabPrimitives.presence() once the collaboration layer ships (ADR-007)
 * IX principles: zero-click visibility of collaboration state
 * Accessibility: WCAG 2.1 AA — see docs/design/accessibility.md
 */
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
export declare function PresenceBar({ collaborators, lastUpdatedAt, isLive, maxVisible, className, }: PresenceBarProps): import("react/jsx-runtime").JSX.Element;
export default PresenceBar;
//# sourceMappingURL=PresenceBar.d.ts.map