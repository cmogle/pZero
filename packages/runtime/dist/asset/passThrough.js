/**
 * Pass-through asset pipeline: no processing, returns ref as-is.
 * ADR-007: enables workflows to call pipeline; real implementation later.
 */
export class PassThroughAssetPipeline {
    async process(assetRef, _options) {
        return { success: true, outputRef: assetRef.id };
    }
}
//# sourceMappingURL=passThrough.js.map