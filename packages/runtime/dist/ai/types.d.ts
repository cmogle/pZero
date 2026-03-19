/**
 * AI adapter types for Phoenix OS runtime.
 * ADR-007: pluggable AI model integration; runtime does not depend on a specific provider.
 */
export interface AIResult {
    success: boolean;
    /** Model output (e.g. text, structured JSON). */
    output?: string;
    /** Optional structured data if adapter parses output. */
    data?: unknown;
    error?: string;
}
export interface AIContext {
    /** Key-value context for the model (e.g. design brief, constraints). */
    [key: string]: unknown;
}
/**
 * Adapter interface for AI model completion.
 * Implementations: stub (dev), OpenAI, Anthropic, etc.
 */
export interface IDesignAIAdapter {
    complete(prompt: string, context?: AIContext): Promise<AIResult>;
}
//# sourceMappingURL=types.d.ts.map