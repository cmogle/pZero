import { describe, it, expect } from "vitest";
import { mapSummaryToConsideration } from "./resolve.js";
import type { SignalSummary } from "../signals/types.js";
import type { AccountContext, ContentBlockRef, Playbook } from "./types.js";

const summaryEarnings: SignalSummary = {
  signalId: "s1",
  accountId: "acc-1",
  observedAt: "2026-03-17T10:00:00Z",
  headline: "Q4 earnings beat",
  bullets: ["Revenue up 10%", "Guidance raised"],
  tags: ["earnings", "guidance"],
};

const playbookEarnings: Playbook = {
  id: "pb-earnings",
  name: "Earnings response",
  triggerTags: ["earnings"],
  contentBlockIds: ["block-disclaimer", "block-template"],
};

const playbookGuidance: Playbook = {
  id: "pb-guidance",
  name: "Guidance update",
  triggerTags: ["guidance"],
  contentBlockIds: ["block-template", "block-followup"],
};

const contentLibrary: Record<string, ContentBlockRef> = {
  "block-disclaimer": { id: "block-disclaimer", label: "Standard disclaimer", kind: "disclaimer" },
  "block-template": { id: "block-template", label: "Earnings template", kind: "template" },
  "block-followup": { id: "block-followup", label: "Follow-up note", kind: "template" },
};

const context: AccountContext = {
  accountId: "acc-1",
  playbooks: [playbookEarnings, playbookGuidance],
  contentLibrary,
};

describe("consideration", () => {
  describe("mapSummaryToConsideration", () => {
    it("returns playbook and content-block candidates for matching tags", () => {
      const result = mapSummaryToConsideration(summaryEarnings, context);
      expect(result.summary).toBe(summaryEarnings);
      expect(result.playbookCandidates).toHaveLength(2);
      expect(result.playbookCandidates.map((p) => p.id).sort()).toEqual([
        "pb-earnings",
        "pb-guidance",
      ]);
      expect(result.contentBlockCandidates).toHaveLength(3);
      const ids = result.contentBlockCandidates.map((c) => c.id).sort();
      expect(ids).toEqual(["block-disclaimer", "block-followup", "block-template"]);
    });

    it("returns empty candidates when accountId does not match context", () => {
      const wrongAccount: SignalSummary = { ...summaryEarnings, accountId: "other" };
      const result = mapSummaryToConsideration(wrongAccount, context);
      expect(result.playbookCandidates).toHaveLength(0);
      expect(result.contentBlockCandidates).toHaveLength(0);
    });

    it("returns only matching playbooks when summary has subset of tags", () => {
      const summaryOneTag: SignalSummary = {
        ...summaryEarnings,
        tags: ["guidance"],
      };
      const result = mapSummaryToConsideration(summaryOneTag, context);
      expect(result.playbookCandidates).toHaveLength(1);
      expect(result.playbookCandidates[0].id).toBe("pb-guidance");
      expect(result.contentBlockCandidates.map((c) => c.id).sort()).toEqual([
        "block-followup",
        "block-template",
      ]);
    });

    it("works with Map contentLibrary", () => {
      const contextWithMap: AccountContext = {
        accountId: "acc-1",
        playbooks: [playbookEarnings],
        contentLibrary: new Map(Object.entries(contentLibrary)),
      };
      const result = mapSummaryToConsideration(summaryEarnings, contextWithMap);
      expect(result.playbookCandidates).toHaveLength(1);
      expect(result.contentBlockCandidates.length).toBeGreaterThanOrEqual(1);
    });
  });
});
