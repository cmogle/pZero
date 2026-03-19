/**
 * Phoenix profile — IDA and environment-specific config.
 * ADR-008: Phase 5 IDA integration. Read via getProfile(); set PHOENIX_PROFILE in env.
 */
const VALID = ["development", "staging", "ida", "production"];
/**
 * Returns the current Phoenix profile from env (PHOENIX_PROFILE). Defaults to "development" when unset or invalid.
 */
export function getProfile() {
    const raw = typeof process !== "undefined" && process.env?.PHOENIX_PROFILE?.toLowerCase();
    if (raw && VALID.includes(raw))
        return raw;
    return "development";
}
const PROFILE_CONFIG = {
    development: {
        defaultTimeoutMs: 60_000,
        strictValidation: false,
        idaFeatures: false,
    },
    staging: {
        defaultTimeoutMs: 30_000,
        strictValidation: true,
        idaFeatures: true,
    },
    ida: {
        defaultTimeoutMs: 30_000,
        strictValidation: true,
        idaFeatures: true,
    },
    production: {
        defaultTimeoutMs: 30_000,
        strictValidation: true,
        idaFeatures: true,
    },
};
/**
 * Returns profile-aware config. Use for timeouts, validation strictness, and IDA-specific behaviour.
 */
export function getProfileConfig() {
    return PROFILE_CONFIG[getProfile()];
}
//# sourceMappingURL=config.js.map