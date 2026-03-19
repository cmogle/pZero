/**
 * Input validation at API boundaries.
 * docs/security.md: validate and sanitize at API boundaries; do not trust client.
 * Use these helpers in server-side handlers before processing.
 */
/** Max allowed string length for IDs, runIds, and short tokens. */
export declare const BOUNDS: {
    readonly id: 128;
    readonly runId: 128;
    readonly body: 100000;
    readonly prompt: 50000;
};
export interface ValidationResult<T> {
    ok: true;
    value: T;
}
export interface ValidationError {
    ok: false;
    reason: string;
}
export type ValidateResult<T> = ValidationResult<T> | ValidationError;
/**
 * Validates a string is non-empty, within length, and (optional) matches a pattern.
 */
export declare function validateString(raw: unknown, opts: {
    maxLength: number;
    field?: string;
    pattern?: RegExp;
}): ValidateResult<string>;
/**
 * Validates a workflow runId for use in getDesignWorkflowStatus / advanceDesignWorkflow.
 */
export declare function validateRunId(raw: unknown): ValidateResult<string>;
/**
 * Validates an object is a plain object with string values (e.g. payload).
 */
export declare function validateRecord(raw: unknown, maxValueLength?: number): ValidateResult<Record<string, string>>;
//# sourceMappingURL=validation.d.ts.map