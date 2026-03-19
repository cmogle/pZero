/**
 * AIOutputPanel — surfaces AI intelligence output: signal headline, reasoning, playbook selection.
 *
 * Design spec: docs/design/phase3-components.md § 2
 * Data contract: DecisionResult from @pzero/runtime
 * IX principles: zero-click intelligence (§ 2) — reasoning visible on arrival, no accordion
 * Accessibility: WCAG 2.1 AA — see docs/design/accessibility.md
 */
import type { DecisionResult } from '@pzero/runtime';
export interface AIOutputPanelProps {
    decision: DecisionResult;
    /** ISO 8601 — shown as "Updated X ago" */
    generatedAt?: string;
    loading?: boolean;
    className?: string;
}
export declare function AIOutputPanel({ decision, generatedAt, loading, className, }: AIOutputPanelProps): import("react/jsx-runtime").JSX.Element;
export default AIOutputPanel;
//# sourceMappingURL=AIOutputPanel.d.ts.map