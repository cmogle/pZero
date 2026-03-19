/**
 * SDK unit tests — public API and plugin contract.
 */

import { describe, it, expect } from "vitest";
import {
  SDK_VERSION,
  PhoenixDesignAPI,
  WorkflowEngine,
  StubDesignAIAdapter,
  PassThroughAssetPipeline,
  type WorkflowDef,
  type WorkflowInput,
  type PhoenixPluginManifest,
  type IPhoenixPlugin,
} from "./index.js";

describe("@pzero/sdk", () => {
  it("exports SDK_VERSION", () => {
    expect(SDK_VERSION).toBe("0.1.0");
  });

  it("PhoenixDesignAPI starts and runs a workflow to completion", async () => {
    const def: WorkflowDef = {
      id: "test-wf",
      name: "Test",
      entry: "a",
      steps: [
        { id: "a", type: "task", config: {}, onSuccess: "b" },
        { id: "b", type: "task", config: {} },
      ],
    };
    const input: WorkflowInput = {};
    const api = new PhoenixDesignAPI();
    const { runId, status } = api.startDesignWorkflow(def, input);
    expect(runId).toBeDefined();
    expect(status).toBe("running");
    const result = await api.runDesignWorkflowToCompletion(def, input);
    expect(result.status.status).toBe("completed");
  });

  it("WorkflowEngine runs with stub AI adapter", async () => {
    const engine = new WorkflowEngine({
      onAIStep: async () => ({ success: true, output: "ok" }),
    });
    const def: WorkflowDef = {
      id: "ai-wf",
      name: "AI",
      entry: "step1",
      steps: [
        { id: "step1", type: "ai_call", config: { prompt: "Hello" }, onSuccess: "step2" },
        { id: "step2", type: "task", config: {} },
      ],
    };
    const { runId } = await engine.runToCompletion(def, {});
    const state = engine.getState(runId);
    expect(state?.status).toBe("completed");
  });

  it("plugin contract types are usable", () => {
    const manifest: PhoenixPluginManifest = {
      id: "test/plugin",
      name: "Test Plugin",
      version: "1.0.0",
      commands: ["hello"],
    };
    const plugin: IPhoenixPlugin = {
      manifest,
      commands: { hello: async () => 0 },
    };
    expect(plugin.manifest.id).toBe("test/plugin");
  });
});
