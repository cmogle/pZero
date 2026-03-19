/**
 * Contract for signal sources (feeds, APIs).
 * Implement one per concrete source for MVP.
 */

import type { RawSignal, TrackedAccount } from "../types.js";

export interface SignalSource {
  readonly id: string;
  /** Fetch new raw signals for the given accounts since the given cursor/time. */
  fetch(
    accounts: TrackedAccount[],
    options?: { since?: string; limit?: number }
  ): Promise<{ signals: RawSignal[]; nextCursor?: string }>;
}
