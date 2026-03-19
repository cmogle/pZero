/**
 * Stub AI adapter for tests and local dev.
 * ADR-007: returns fixed response; no external calls.
 */
import type { IDesignAIAdapter, AIResult, AIContext } from "./types.js";
export declare class StubDesignAIAdapter implements IDesignAIAdapter {
    private response;
    constructor(response?: string);
    complete(_prompt: string, _context?: AIContext): Promise<AIResult>;
}
//# sourceMappingURL=stubAdapter.d.ts.map