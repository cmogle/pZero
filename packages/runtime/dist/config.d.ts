/**
 * Phoenix profile — IDA and environment-specific config.
 * ADR-008: Phase 5 IDA integration. Read via getProfile(); set PHOENIX_PROFILE in env.
 */
export type PhoenixProfile = "development" | "staging" | "ida" | "production";
/**
 * Returns the current Phoenix profile from env (PHOENIX_PROFILE). Defaults to "development" when unset or invalid.
 */
export declare function getProfile(): PhoenixProfile;
/** Profile-aware config: timeouts (ms), feature flags, and IDA-specific behaviour. */
export interface ProfileConfig {
    /** Request/execution timeout for external calls (e.g. AI, design API). */
    defaultTimeoutMs: number;
    /** Stricter validation and logging in non-development. */
    strictValidation: boolean;
    /** IDA branding / feature flags when profile is ida or production. */
    idaFeatures: boolean;
}
/**
 * Returns profile-aware config. Use for timeouts, validation strictness, and IDA-specific behaviour.
 */
export declare function getProfileConfig(): ProfileConfig;
//# sourceMappingURL=config.d.ts.map