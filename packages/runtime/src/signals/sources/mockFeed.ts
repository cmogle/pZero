/**
 * Mock signal source for MVP — in-memory feed.
 * Replace with a real feed/API (RSS, vendor API, etc.) when integrating.
 * ADR: INT-11 — at least one concrete source for MVP.
 */

import type { RawSignal, TrackedAccount } from "../types.js";
import type { SignalSource } from "./types.js";

const SOURCE_ID = "mock-feed";

export function createMockFeedSource(): SignalSource {
  return {
    id: SOURCE_ID,

    async fetch(
      accounts: TrackedAccount[],
      options?: { since?: string; limit?: number }
    ): Promise<{ signals: RawSignal[]; nextCursor?: string }> {
      const since = options?.since ? new Date(options.since) : new Date(0);
      const limit = options?.limit ?? 50;
      const signals: RawSignal[] = [];

      for (const account of accounts) {
        // Emit a deterministic "new" mock signal per account for testing.
        const observedAt = new Date();
        if (observedAt <= since) continue;

        const id = `mock-${account.id}-${observedAt.getTime()}`;
        signals.push({
          id,
          accountId: account.id,
          sourceId: SOURCE_ID,
          observedAt: observedAt.toISOString(),
          dedupeKey: id,
          payload: {
            type: "mock",
            title: `Market update for ${account.label}`,
            body: `Sample signal payload for ${account.externalId}.`,
          },
        });
        if (signals.length >= limit) break;
      }

      return {
        signals,
        nextCursor: signals.length > 0 ? String(Date.now()) : undefined,
      };
    },
  };
}
