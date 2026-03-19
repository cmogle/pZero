/**
 * Phoenix profile — IDA and environment-specific config.
 * ADR-008: Phase 5 IDA integration. Read via getProfile(); set PHOENIX_PROFILE in env.
 */

export type PhoenixProfile = "development" | "staging" | "ida" | "production";

const VALID: PhoenixProfile[] = ["development", "staging", "ida", "production"];

/**
 * Returns the current Phoenix profile from env (PHOENIX_PROFILE). Defaults to "development" when unset or invalid.
 */
export function getProfile(): PhoenixProfile {
  const raw = typeof process !== "undefined" && process.env?.PHOENIX_PROFILE?.toLowerCase();
  if (raw && VALID.includes(raw as PhoenixProfile)) return raw as PhoenixProfile;
  return "development";
}

/** Profile-aware config: timeouts (ms), feature flags, and IDA-specific behaviour. */
export interface ProfileConfig {
  /** Request/execution timeout for external calls (e.g. AI, design API). */
  defaultTimeoutMs: number;
  /** Stricter validation and logging in non-development. */
  strictValidation: boolean;
  /** IDA branding / feature flags when profile is ida or production. */
  idaFeatures: boolean;
}

const PROFILE_CONFIG: Record<PhoenixProfile, ProfileConfig> = {
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
export function getProfileConfig(): ProfileConfig {
  return PROFILE_CONFIG[getProfile()];
}
