/**
 * Asset pipeline types for Phoenix OS runtime.
 * ADR-007: interface only; real processing (resize, format conversion) added later.
 */
export interface AssetRef {
    /** Identifier or path for the asset. */
    id: string;
    /** Optional MIME or format hint. */
    type?: string;
}
export interface AssetResult {
    success: boolean;
    /** Processed asset reference or URL. */
    outputRef?: string;
    error?: string;
}
/**
 * Asset pipeline interface. Workflow steps can request processing without binding to implementation.
 */
export interface IAssetPipeline {
    process(assetRef: AssetRef, options?: Record<string, unknown>): Promise<AssetResult>;
}
//# sourceMappingURL=types.d.ts.map