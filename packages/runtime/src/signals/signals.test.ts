import { describe, it, expect, beforeEach } from "vitest";
import {
  createMockFeedSource,
  ingestNetNew,
  clearSeen,
  summarizeSignal,
  runSignalPipeline,
} from "./index.js";
import type { RawSignal, TrackedAccount } from "./types.js";

const accounts: TrackedAccount[] = [
  {
    id: "acc-1",
    externalId: "TICKER_A",
    label: "Company A",
  },
  {
    id: "acc-2",
    externalId: "TICKER_B",
    label: "Company B",
  },
];

describe("signals", () => {
  beforeEach(() => {
    clearSeen();
  });

  describe("createMockFeedSource", () => {
    it("returns a source with id mock-feed", () => {
      const source = createMockFeedSource();
      expect(source.id).toBe("mock-feed");
    });

    it("fetch returns signals for each account up to limit", async () => {
      const source = createMockFeedSource();
      const { signals } = await source.fetch(accounts, { limit: 10 });
      expect(signals.length).toBeGreaterThanOrEqual(1);
      expect(signals.length).toBeLessThanOrEqual(2);
      const accountIds = new Set(signals.map((s) => s.accountId));
      expect(accountIds.has("acc-1") || accountIds.has("acc-2")).toBe(true);
      signals.forEach((s) => {
        expect(s.sourceId).toBe("mock-feed");
        expect(s.observedAt).toBeDefined();
        expect((s.payload as { title?: string }).title).toContain("Market update");
      });
    });
  });

  describe("ingestNetNew", () => {
    it("returns net-new signals and deduplicates on second call", async () => {
      const source = createMockFeedSource();
      const first = await ingestNetNew(source, accounts, { limit: 10 });
      expect(first.signals.length).toBeGreaterThanOrEqual(1);
      const second = await ingestNetNew(source, accounts, { limit: 10 });
      expect(second.signals.length).toBe(0);
    });
  });

  describe("summarizeSignal", () => {
    it("produces headline and bullets from payload", () => {
      const raw: RawSignal = {
        id: "s1",
        accountId: "acc-1",
        sourceId: "mock-feed",
        observedAt: new Date().toISOString(),
        payload: {
          type: "earnings",
          title: "Q4 earnings beat",
          body: "Revenue up 10%\nGuidance raised",
        },
      };
      const summary = summarizeSignal(raw);
      expect(summary.signalId).toBe("s1");
      expect(summary.headline).toBe("Q4 earnings beat");
      expect(summary.bullets).toContain("Revenue up 10%");
      expect(summary.bullets).toContain("Guidance raised");
      expect(summary.tags).toEqual(["earnings"]);
    });
  });

  describe("runSignalPipeline", () => {
    it("returns signals and summaries for net-new only", async () => {
      const source = createMockFeedSource();
      const result = await runSignalPipeline(source, accounts, { limit: 10 });
      expect(result.signals.length).toBe(result.summaries.length);
      result.summaries.forEach((s) => {
        expect(s.headline).toBeDefined();
        expect(Array.isArray(s.bullets)).toBe(true);
      });
    });
  });
});
