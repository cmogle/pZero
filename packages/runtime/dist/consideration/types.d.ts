/**
 * Consideration pass: map signal summary to playbook and content-block candidates.
 * ADR: INT-12 — output suitable for Decision engine (playbook + block candidates).
 */
import type { SignalSummary } from "../signals/types.js";
/** A codified playbook (e.g. earnings response, guidance update). */
export interface Playbook {
    id: string;
    /** Human-readable name. */
    name: string;
    /** Tags that trigger this playbook (e.g. "earnings", "guidance"). */
    triggerTags: string[];
    /** IDs of content blocks this playbook can use. */
    contentBlockIds: string[];
}
/** Reference to an atomic content block in the library. */
export interface ContentBlockRef {
    id: string;
    /** Label for display or selection. */
    label: string;
    /** Optional kind (e.g. "disclaimer", "template"). */
    kind?: string;
}
/** Account-scoped context: playbooks and content library available for that account. */
export interface AccountContext {
    accountId: string;
    playbooks: Playbook[];
    /** Atomic content library: id → block ref. */
    contentLibrary: Map<string, ContentBlockRef> | Record<string, ContentBlockRef>;
}
/**
 * Result of the Consideration pass: input summary plus candidates for the Decision engine.
 */
export interface ConsiderationResult {
    /** Original signal summary. */
    summary: SignalSummary;
    /** Playbooks that match the summary (e.g. by tags). */
    playbookCandidates: Playbook[];
    /** Content block refs that are relevant (from matched playbooks or direct match). */
    contentBlockCandidates: ContentBlockRef[];
}
//# sourceMappingURL=types.d.ts.map