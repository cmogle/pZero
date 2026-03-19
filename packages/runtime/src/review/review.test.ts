import { describe, it, expect } from "vitest";
import { submitReview } from "./resolve.js";
import type { ReviewPayload, ReviewVerdict } from "./types.js";
import type { DecisionResult } from "../decision/types.js";
import type { ActionArtifact } from "../assembler/types.js";

const decision: DecisionResult = {
  shouldRespond: true,
  playbookId: "pb-1",
  selectedBlockIds: ["b1", "b2"],
  reasoning: 'Because "Q4 earnings", we are triggering Playbook "Earnings response" (pb-1).',
  signalHeadline: "Q4 earnings",
};

const artifact: ActionArtifact = {
  kind: "draft",
  body: "Hello world.\n\nSecond block.",
  sourceBlockIds: ["b1", "b2"],
};

const payload: ReviewPayload = { decision, artifact };

describe("review", () => {
  describe("submitReview", () => {
    it("approved without edit returns handoffBody as artifact body", () => {
      const verdict: ReviewVerdict = { outcome: "approved" };
      const result = submitReview(payload, verdict);
      expect(result.accepted).toBe(true);
      expect(result.handoffBody).toBe(artifact.body);
    });

    it("approved with editedBody returns handoffBody as editedBody", () => {
      const verdict: ReviewVerdict = { outcome: "approved", editedBody: "Edited text." };
      const result = submitReview(payload, verdict);
      expect(result.accepted).toBe(true);
      expect(result.handoffBody).toBe("Edited text.");
    });

    it("edit outcome returns handoffBody as verdict body", () => {
      const verdict: ReviewVerdict = { outcome: "edit", body: "Minimal edit." };
      const result = submitReview(payload, verdict);
      expect(result.accepted).toBe(true);
      expect(result.handoffBody).toBe("Minimal edit.");
    });

    it("rejected returns no handoffBody and optional reason", () => {
      const verdict: ReviewVerdict = { outcome: "rejected", reason: "Not this time." };
      const result = submitReview(payload, verdict);
      expect(result.accepted).toBe(false);
      expect(result.handoffBody).toBeUndefined();
      expect(result.rejectionReason).toBe("Not this time.");
    });
  });
});
