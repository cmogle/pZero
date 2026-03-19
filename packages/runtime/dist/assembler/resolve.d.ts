/**
 * Assemble selected content blocks into a single Action artifact.
 * INT-14: Retrieve from library, stitch in order; optional minimal connective tissue (MVP: concat only).
 */
import type { AssemblerInput, ActionArtifact } from "./types.js";
/**
 * Retrieve selected blocks from the atomic content library and stitch into one drafted artifact.
 * Order follows decisionResult.selectedBlockIds. No bulk generation — core payload is existing IP.
 * Returns null when decision is shouldRespond: false (nothing to assemble).
 */
export declare function assemble(input: AssemblerInput): ActionArtifact | null;
//# sourceMappingURL=resolve.d.ts.map