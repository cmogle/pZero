/**
 * Assemble selected content blocks into a single Action artifact.
 * INT-14: Retrieve from library, stitch in order; optional minimal connective tissue (MVP: concat only).
 */
function getBlock(lib, id) {
    if (lib instanceof Map)
        return lib.get(id);
    return lib[id];
}
/**
 * Retrieve selected blocks from the atomic content library and stitch into one drafted artifact.
 * Order follows decisionResult.selectedBlockIds. No bulk generation — core payload is existing IP.
 * Returns null when decision is shouldRespond: false (nothing to assemble).
 */
export function assemble(input) {
    const { decisionResult, contentLibrary } = input;
    if (!decisionResult.shouldRespond || decisionResult.selectedBlockIds.length === 0) {
        return null;
    }
    const parts = [];
    const resolvedIds = [];
    for (const id of decisionResult.selectedBlockIds) {
        const block = getBlock(contentLibrary, id);
        if (block?.body != null) {
            parts.push(block.body.trim());
            resolvedIds.push(id);
        }
    }
    const body = parts.join("\n\n");
    return {
        kind: "draft",
        body,
        sourceBlockIds: resolvedIds,
    };
}
//# sourceMappingURL=resolve.js.map