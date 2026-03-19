/**
 * Pass-through asset pipeline: no processing, returns ref as-is.
 * ADR-007: enables workflows to call pipeline; real implementation later.
 */
import type { IAssetPipeline, AssetRef, AssetResult } from "./types.js";
export declare class PassThroughAssetPipeline implements IAssetPipeline {
    process(assetRef: AssetRef, _options?: Record<string, unknown>): Promise<AssetResult>;
}
//# sourceMappingURL=passThrough.d.ts.map