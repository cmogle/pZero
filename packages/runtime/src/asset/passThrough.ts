/**
 * Pass-through asset pipeline: no processing, returns ref as-is.
 * ADR-007: enables workflows to call pipeline; real implementation later.
 */

import type { IAssetPipeline, AssetRef, AssetResult } from "./types.js";

export class PassThroughAssetPipeline implements IAssetPipeline {
  async process(assetRef: AssetRef, _options?: Record<string, unknown>): Promise<AssetResult> {
    return { success: true, outputRef: assetRef.id };
  }
}
