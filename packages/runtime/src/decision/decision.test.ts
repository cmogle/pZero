import { describe, it, expect } from "vitest";
import { decide } from "./resolve.js";
import type { ConsiderationResult } from "../consideration/types.js";
import type { SignalSummary } from "../signals/types.js";

const summary: SignalSummary = {
  signalId: "s1",
  accountId: "acc-1",
  observedAt: "2026-03-17T10:00:00Z",
  headline: "Q4 earnings beat",
  bullets: ["Revenue up 10%", "Guidance raised"],
  tags: ["earnings", "guidance"],
};

const considerationWithCandidates: ConsiderationResult = {
  summary,
  playbookCandidates: [
    {
      id: "pb-earnings",
      name: "Earnings response",
      triggerTags: ["earnings"],
      contentBlockIds: ["block-disclaimer", "block-template"],
    },
  ],
  contentBlockCandidates: [
    { id: "block-disclaimer", label: "Standard disclaimer", kind: "disclaimer" },
    { id: "block-template", label: "Earnings template", kind: "template" },
  ],
};

const considerationNoPlaybooks: ConsiderationResult = {
  summary: { ...summary, tags: [] },
  playbookCandidates: [],
  contentBlockCandidates: [],
};

describe("decision", () => {
  describe("decide", () => {
    it("returns shouldRespond true with playbook and blocks when candidates exist", () => {
      const result = decide(considerationWithCandidates);
      expect(result.shouldRespond).toBe(true);
      expect(result.playbookId).toBe("pb-earnings");
      expect(result.selectedBlockIds.sort()).toEqual(["block-disclaimer", "block-template"]);
      expect(result.reasoning).toContain("Q4 earnings beat");
      expect(result.reasoning).toContain("Earnings response");
      expect(result.reasoning).toContain("pb-earnings");
      expect(result.signalHeadline).toBe("Q4 earnings beat");
    });

    it("returns shouldRespond false and auditable reasoning when no playbook candidates", () => {
      const result = decide(considerationNoPlaybooks);
      expect(result.shouldRespond).toBe(false);
      expect(result.playbookId).toBeUndefined();
      expect(result.selectedBlockIds).toEqual([]);
      expect(result.reasoning).toContain("No matching playbook");
      expect(result.reasoning).toContain("Q4 earnings beat");
      expect(result.signalHeadline).toBe("Q4 earnings beat");
    });

    it("selects only blocks that exist in contentBlockCandidates", () => {
      const considerationPartial: ConsiderationResult = {
        ...considerationWithCandidates,
        contentBlockCandidates: [{ id: "block-disclaimer", label: "Standard disclaimer" }],
      };
      const result = decide(considerationPartial);
      expect(result.shouldRespond).toBe(true);
      expect(result.selectedBlockIds).toEqual(["block-disclaimer"]);
      expect(result.reasoning).toContain("1 content block(s)");
    });
  });
});
