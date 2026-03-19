/**
 * Workflow engine and Design API tests.
 * ADR-007: design intelligence layer.
 */

import { describe, it, expect } from "vitest";
import { WorkflowEngine } from "./engine.js";
import { StubDesignAIAdapter } from "../ai/stubAdapter.js";
import { PassThroughAssetPipeline } from "../asset/passThrough.js";
import { PhoenixDesignAPI } from "../design-api/api.js";
import type { WorkflowDef } from "./types.js";

describe("WorkflowEngine", () => {
  it("starts a run and returns runId and state", () => {
    const engine = new WorkflowEngine();
    const def: WorkflowDef = {
      id: "w1",
      name: "Simple",
      entry: "a",
      steps: [{ id: "a", type: "task" }],
    };
    const { runId, state } = engine.start(def, { foo: "bar" });
    expect(runId).toMatch(/^wr-\d+$/);
    expect(state.status).toBe("running");
    expect(state.currentStepId).toBe("a");
    expect(state.payload).toEqual({ foo: "bar" });
  });

  it("advances task step and completes when no onSuccess", async () => {
    const engine = new WorkflowEngine();
    const def: WorkflowDef = {
      id: "w2",
      name: "One task",
      entry: "step1",
      steps: [{ id: "step1", type: "task" }],
    };
    const { runId } = engine.start(def, {});
    const after = await engine.advance(runId);
    expect(after?.status).toBe("completed");
    expect(after?.currentStepId).toBeNull();
  });

  it("advances through two steps via onSuccess", async () => {
    const engine = new WorkflowEngine();
    const def: WorkflowDef = {
      id: "w3",
      name: "Two steps",
      entry: "first",
      steps: [
        { id: "first", type: "task", onSuccess: "second" },
        { id: "second", type: "task" },
      ],
    };
    const { runId } = engine.start(def, {});
    let state = await engine.advance(runId);
    expect(state?.status).toBe("running");
    expect(state?.currentStepId).toBe("second");
    state = await engine.advance(runId);
    expect(state?.status).toBe("completed");
  });

  it("invokes AI adapter when step type is ai_call", async () => {
    const stub = new StubDesignAIAdapter("AI said hello");
    const engine = new WorkflowEngine({ onAIStep: async (stepId, config, payload) => {
      const result = await stub.complete((config.prompt as string) ?? "", payload);
      return { success: result.success, output: result.output };
    } });
    const def: WorkflowDef = {
      id: "w4",
      name: "AI step",
      entry: "ai",
      steps: [{ id: "ai", type: "ai_call", config: { prompt: "Design a logo" } }],
    };
    const { runId } = engine.start(def, {});
    const state = await engine.advance(runId);
    expect(state?.status).toBe("completed");
    expect(state?.payload?.ai).toBe("AI said hello");
  });

  it("runToCompletion instantiates engine, starts run, and advances to completion", async () => {
    const engine = new WorkflowEngine();
    const def: WorkflowDef = {
      id: "w5",
      name: "Run to completion",
      entry: "s1",
      steps: [
        { id: "s1", type: "task", onSuccess: "s2" },
        { id: "s2", type: "task" },
      ],
    };
    const { runId, state } = await engine.runToCompletion(def, { input: "test" });
    expect(runId).toMatch(/^wr-\d+$/);
    expect(state.status).toBe("completed");
    expect(state.currentStepId).toBeNull();
    expect(state.payload?.input).toBe("test");
  });
});

describe("PhoenixDesignAPI", () => {
  it("startDesignWorkflow returns runId and status", () => {
    const api = new PhoenixDesignAPI();
    const def: WorkflowDef = {
      id: "d1",
      name: "Design",
      entry: "s1",
      steps: [{ id: "s1", type: "task" }],
    };
    const out = api.startDesignWorkflow(def, { brief: "Logo" });
    expect(out.runId).toMatch(/^wr-\d+$/);
    expect(out.status).toBe("running");
  });

  it("getDesignWorkflowStatus returns current step and result", async () => {
    const api = new PhoenixDesignAPI();
    const def: WorkflowDef = {
      id: "d2",
      name: "Design",
      entry: "s1",
      steps: [{ id: "s1", type: "task" }],
    };
    const { runId } = api.startDesignWorkflow(def, {});
    let status = api.getDesignWorkflowStatus(runId);
    expect(status?.currentStep).toBe("s1");
    expect(status?.status).toBe("running");
    // advance to completion (sync advance not on API; use runToCompletion for full run)
    // So we test getDesignWorkflowStatus after a run that we drive via engine or runToCompletion
    const full = await api.runDesignWorkflowToCompletion(def, {});
    status = api.getDesignWorkflowStatus(full.runId);
    expect(status?.status).toBe("completed");
    expect(status?.currentStep).toBeNull();
  });

  it("submitDesignForReview bridges to review layer", () => {
    const api = new PhoenixDesignAPI();
    const payload = {
      decision: {
        shouldRespond: true,
        playbookId: "pb1",
        selectedBlockIds: ["b1"],
        reasoning: "Test",
        signalHeadline: "Headline",
      },
      artifact: { kind: "email", body: "Hello", sourceBlockIds: ["b1"] },
    };
    const result = api.submitDesignForReview("wr-1", payload, { outcome: "approved" });
    expect(result.accepted).toBe(true);
    expect(result.handoffBody).toBe("Hello");
  });
});
