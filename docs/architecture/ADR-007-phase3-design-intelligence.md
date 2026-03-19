# ADR-007: Phase 3 design intelligence layer — workflow engine, AI adapters, Design API

**Status:** Accepted  
**Date:** 2026-03-18  
**Context:** INT-4 — Design Intelligence Layer: AI-native workflow engine for Phoenix OS.

## Decision

Implement the design intelligence layer in **@pzero/runtime** on top of the core runtime (ADR-006). No new package; app → runtime → kernel boundary unchanged.

1. **Workflow orchestration engine**
   - Design workflow = directed graph of steps (nodes) and transitions. Each step has an id, type (e.g. `task`, `ai_call`, `gate`), and optional config.
   - Engine runs workflows: start → advance steps → invoke AI adapters or asset pipeline when step type requires it. State is in-memory (workflow run id, current step, payload).
   - One workflow run per design job; no kernel process 1:1 required — workflows are runtime-level units of work. Optionally a run can create a kernel process for scheduling if we need it later.
   - Step outcomes (success/fail) drive transitions; optional timeout per step.

2. **AI model integration adapters**
   - **IDesignAIAdapter** interface: `complete(prompt, context) => Promise<AIResult>`. Runtime does not depend on a specific provider; adapters are pluggable.
   - Ship one **stub adapter** that returns a fixed response for tests and local dev. Real OpenAI/Anthropic/etc. adapters added later (or in app with dependency injection).
   - Adapters are invoked by the workflow engine when a step type is `ai_call`.

3. **Intelligent asset pipeline**
   - Interface only in this phase: **IAssetPipeline** with `process(assetRef, options) => Promise<AssetResult>`. Enables workflow steps to request "process this asset" without binding to a concrete implementation.
   - Runtime exports the interface and a no-op or pass-through implementation so workflows can call it; real processing (resize, format conversion, etc.) can be added later.

4. **Real-time collaboration primitives**
   - **ICollabPrimitives** interface: `presence(workflowRunId?)`, `broadcast(room, event)`, `subscribe(room, handler)`. No backend in this phase; in-memory or stub so API exists and callers don’t break when we add WebSockets/Supabase realtime.
   - Enables future: multiple IDA clients attached to the same design workflow run.

5. **Phoenix Design API**
   - Public surface that IDA products consume. Lives in runtime as the canonical API; app may expose it over HTTP.
   - **Start a design workflow**: `startDesignWorkflow(workflowDef, input) => { runId, status }`.
   - **Get status**: `getDesignWorkflowStatus(runId) => { status, currentStep, result? }`.
   - **Submit for review** (bridge to existing review layer): `submitDesignForReview(runId, payload) => ReviewResult`.
   - Types are exported so IDA SDKs can depend on @pzero/runtime.

## Consequences

- Design workflows are first-class in the runtime; AI and assets are pluggable, so we can swap providers and scale without changing the engine.
- Phoenix Design API gives a single contract for IDA products; implementation stays in one place (runtime).
- Minimal complexity: stub AI, no-op asset pipeline, stub collaboration keep the layer testable and unblock integration work. Real implementations can follow in later iterations.
