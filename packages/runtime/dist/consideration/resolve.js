/**
 * Resolve playbook and content-block candidates from a signal summary and account context.
 * INT-12: Consideration pass — map summary to codified playbooks and content library.
 */
/**
 * Map a structured signal summary to playbook and content-block candidates
 * using account/context. Output is suitable for the Decision engine.
 */
export function mapSummaryToConsideration(summary, context) {
    if (summary.accountId !== context.accountId) {
        return {
            summary,
            playbookCandidates: [],
            contentBlockCandidates: [],
        };
    }
    const signalTags = new Set(summary.tags ?? []);
    const playbookCandidates = context.playbooks.filter((pb) => pb.triggerTags.some((t) => signalTags.has(t)));
    const contentLibrary = context.contentLibrary instanceof Map
        ? Object.fromEntries(context.contentLibrary)
        : context.contentLibrary;
    const blockIdsSeen = new Set();
    const contentBlockCandidates = [];
    for (const playbook of playbookCandidates) {
        for (const blockId of playbook.contentBlockIds) {
            if (blockIdsSeen.has(blockId))
                continue;
            const ref = contentLibrary[blockId];
            if (ref) {
                blockIdsSeen.add(blockId);
                contentBlockCandidates.push(ref);
            }
        }
    }
    return {
        summary,
        playbookCandidates,
        contentBlockCandidates,
    };
}
//# sourceMappingURL=resolve.js.map