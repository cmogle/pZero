/**
 * Assembler: stitch pre-approved content blocks into a single Action artifact.
 * INT-14 — assembler model only; no net-generation of bulk content.
 */
import type { DecisionResult } from "../decision/types.js";
import type { ContentBlockRef } from "../consideration/types.js";
/** Atomic content block with body (pre-approved IP). Extends ref with content. */
export interface ContentBlock extends ContentBlockRef {
    /** Pre-approved body text. No net-generation; assembler stitches this as-is. */
    body: string;
}
/** Content library keyed by block id. Used to retrieve full block content for assembly. */
export type ContentLibrary = Record<string, ContentBlock> | Map<string, ContentBlock>;
/** Input to the Assembler: Decision output plus library to resolve block bodies. */
export interface AssemblerInput {
    /** Decision result with selectedBlockIds (order preserved for assembly). */
    decisionResult: DecisionResult;
    /** Library to resolve block id → ContentBlock (id, label, kind?, body). */
    contentLibrary: ContentLibrary;
}
/**
 * Drafted artifact ready for human review. Single response (email, agenda, deck, etc.).
 * Traceability: sourceBlockIds lists blocks that were stitched.
 */
export interface ActionArtifact {
    /** Artifact kind for downstream handling (e.g. "email", "agenda", "deck"). */
    kind: string;
    /** Assembled body: stitched block content with optional minimal connective tissue. */
    body: string;
    /** Block ids that were assembled, in order. For audit and HITL. */
    sourceBlockIds: string[];
}
//# sourceMappingURL=types.d.ts.map