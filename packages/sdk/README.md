# @pzero/sdk

Phoenix OS TypeScript SDK — type-safe API for the Phoenix runtime and kernel. Use this package to build workflows, design automation, and integrations on top of Phoenix OS.

## Install

```bash
pnpm add @pzero/sdk
```

In a Phoenix OS monorepo, add to your package:

```json
{ "dependencies": { "@pzero/sdk": "workspace:*" } }
```

## API overview

The SDK re-exports the full public surface of `@pzero/kernel` and `@pzero/runtime` with complete type coverage.

### Kernel

- **Process**: `ProcessManager`, `Process`, `ProcessId`, `ProcessState`, etc.
- **Scheduler**: `Scheduler`
- **IPC**: `Channel`, `Mailbox`, `createChannel`, `getMailbox`, `resetIPC`, and types
- **Memory**: `PoolAllocator`, `Allocator`, `AllocHandle`

### Runtime

- **Signals**: `createMockFeedSource`, `ingestNetNew`, `markSeen`, `summarizeSignal`, `runSignalPipeline`, and types
- **Consideration / Decision / Assembler**: `mapSummaryToConsideration`, `decide`, `assemble`, and types
- **Review**: `submitReview`, `ReviewPayload`, `ReviewVerdict`, `ReviewResult`, `ExecutionHandoff`
- **Workflow**: `WorkflowEngine`, `WorkflowDef`, `WorkflowRunState`, `RunStatus`, and step types
- **Design API**: `PhoenixDesignAPI` — start workflows, get status, advance, run to completion, submit for review
- **AI / Asset / Collab**: `IDesignAIAdapter`, `StubDesignAIAdapter`, `IAssetPipeline`, `PassThroughAssetPipeline`, `ICollabPrimitives`, `StubCollabPrimitives`, and related types

### Plugin contract

Plugins extend the CLI and SDK. Types and contract:

- `IPhoenixPlugin` — implement for your extension
- `PhoenixPluginManifest` — id, name, version, optional commands/hooks
- `PhoenixPluginContext` — passed to `init()` (sdkVersion, cwd, config)

See [Plugin contract](../../docs/design/plugin-contract.md) for the full interface and examples.

## Example

```ts
import {
  PhoenixDesignAPI,
  type WorkflowDef,
  type WorkflowInput,
} from "@pzero/sdk";

const api = new PhoenixDesignAPI();
const def: WorkflowDef = {
  id: "my-workflow",
  name: "My workflow",
  entry: "step-1",
  steps: [
    { id: "step-1", type: "task", config: {}, onSuccess: "step-2" },
    { id: "step-2", type: "task", config: {} },
  ],
};
const input: WorkflowInput = { key: "value" };
const { runId, status } = api.startDesignWorkflow(def, input);
const result = await api.runDesignWorkflowToCompletion(def, input);
console.log(result.status);
```

## Scripts

- `pnpm build` — compile to `dist/`
- `pnpm test` — run unit tests
- `pnpm typecheck` — type-check without emit
- `pnpm clean` — remove `dist/`

## Version

SDK version is exported as `SDK_VERSION` and matches the package version.
