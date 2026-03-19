/**
 * ArtifactReviewPanel — Account Manager HITL review interface for action artifacts.
 *
 * Design spec: docs/design/phase3-components.md § 3
 * Data contract: ReviewPayload / ReviewVerdict from @pzero/runtime
 * INT-15: Present decision + artifact; no autonomous send without approval.
 * IX principles: action an item in 1 interaction (§ 3), destructive requires confirmation
 * Accessibility: WCAG 2.1 AA — see docs/design/accessibility.md
 */
import type { ReviewPayload, ReviewVerdict } from '@pzero/runtime';
export interface ArtifactReviewResult {
    accepted: boolean;
    message?: string;
}
export interface ArtifactReviewPanelProps {
    payload: ReviewPayload;
    onVerdict: (verdict: ReviewVerdict) => Promise<void> | void;
    /** Shown while onVerdict is resolving */
    submitting?: boolean;
    /** Feedback state to show after verdict */
    result?: ArtifactReviewResult;
    className?: string;
}
export declare function ArtifactReviewPanel({ payload, onVerdict, submitting, result, className, }: ArtifactReviewPanelProps): import("react/jsx-runtime").JSX.Element;
export default ArtifactReviewPanel;
//# sourceMappingURL=ArtifactReviewPanel.d.ts.map