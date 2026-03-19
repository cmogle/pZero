import { describe, it, expect } from "vitest";
import { APP_VERSION, buildReviewPayload, submitReviewAndHandoff } from "./index.js";
import type { DecisionResult, ActionArtifact } from "@pzero/runtime";

describe("@pzero/app", () => {
  it("exports an app version", () => {
    expect(APP_VERSION).toBe("0.1.0");
  });

  it("buildReviewPayload returns decision + artifact", () => {
    const decision: DecisionResult = {
      shouldRespond: true,
      playbookId: "pb-1",
      selectedBlockIds: ["b1"],
      reasoning: "Because signal, we trigger Playbook X.",
      signalHeadline: "Signal",
    };
    const artifact: ActionArtifact = { kind: "draft", body: "Content.", sourceBlockIds: ["b1"] };
    const payload = buildReviewPayload(decision, artifact);
    expect(payload.decision).toBe(decision);
    expect(payload.artifact).toBe(artifact);
  });

  it("submitReviewAndHandoff invokes handoff only when approved", () => {
    const payload = {
      decision: {
        shouldRespond: true,
        playbookId: "pb-1",
        selectedBlockIds: ["b1"],
        reasoning: "Because.",
        signalHeadline: "Signal",
      } as DecisionResult,
      artifact: { kind: "draft", body: "Hello.", sourceBlockIds: ["b1"] } as ActionArtifact,
    };
    let handed = false;
    const result = submitReviewAndHandoff(payload, { outcome: "approved" }, (params) => {
      handed = true;
      expect(params.body).toBe("Hello.");
      expect(params.kind).toBe("draft");
      expect(params.sourceBlockIds).toEqual(["b1"]);
    });
    expect(result.accepted).toBe(true);
    expect(result.handoffBody).toBe("Hello.");
    expect(handed).toBe(true);
  });

  it("submitReviewAndHandoff does not invoke handoff when rejected", () => {
    const payload = {
      decision: {
        shouldRespond: true,
        playbookId: "pb-1",
        selectedBlockIds: ["b1"],
        reasoning: "Because.",
        signalHeadline: "Signal",
      } as DecisionResult,
      artifact: { kind: "draft", body: "Hello.", sourceBlockIds: ["b1"] } as ActionArtifact,
    };
    let handed = false;
    const result = submitReviewAndHandoff(payload, { outcome: "rejected" }, () => {
      handed = true;
    });
    expect(result.accepted).toBe(false);
    expect(result.handoffBody).toBeUndefined();
    expect(handed).toBe(false);
  });
});
