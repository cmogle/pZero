/**
 * WorkflowVisualization — displays a Phoenix Design API workflow run as a vertical step timeline.
 *
 * Design spec: docs/design/phase3-components.md § 1
 * Data contract: ADR-007 Phoenix Design API (packages/runtime)
 * Design system: packages/design-system/README.md
 * IX principles: docs/design/ix-principles.md (zero-click intelligence, § 2)
 */
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
export declare function WorkflowVisualization({ runId, workflowName, status, steps, updatedAt, loading, className, }: WorkflowVisualizationProps): import("react/jsx-runtime").JSX.Element;
export default WorkflowVisualization;
//# sourceMappingURL=WorkflowVisualization.d.ts.map