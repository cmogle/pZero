# Phoenix OS Plugin Contract

Plugins extend the Phoenix OS CLI and SDK with custom commands and optional hooks. This document defines the interface contracts.

## Manifest

Every plugin must expose a **manifest** describing the plugin and what it provides.

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `id` | string | Yes | Unique plugin id (e.g. `my-org/my-phoenix-plugin`). Used for install/remove. |
| `name` | string | Yes | Human-readable name. |
| `version` | string | Yes | Semantic version (e.g. `1.0.0`). |
| `description` | string | No | Short description. |
| `commands` | string[] | No | CLI command names this plugin registers. |
| `hooks` | string[] | No | Hook names the plugin implements (reserved for future use). |

## Plugin interface (`IPhoenixPlugin`)

Implement this interface so the runtime can load and run your plugin.

- **`manifest: PhoenixPluginManifest`** — Required. Describes the plugin.
- **`init?(context: PhoenixPluginContext)`** — Optional. Called once when the plugin is loaded. Use to register CLI subcommands or subscribe to hooks. `context` includes `sdkVersion`, `cwd`, and optional `config`.
- **`commands?: Record<string, (args: string[]) => Promise<number> \| number>`** — Optional. Map of command name → handler. Used when the CLI runs `phoenix plugin run <plugin-id> <command> [args]`. Return an exit code (0 = success).

## Context

`PhoenixPluginContext` passed to `init()`:

| Field | Type | Description |
|-------|------|-------------|
| `sdkVersion` | string | Phoenix SDK version. |
| `cwd` | string | Working directory when the CLI was invoked. |
| `config` | object? | Config from `phoenix.config.json` or environment. |

## Example

```ts
import type { IPhoenixPlugin, PhoenixPluginManifest, PhoenixPluginContext } from "@pzero/sdk";

const manifest: PhoenixPluginManifest = {
  id: "acme/phoenix-lint",
  name: "Acme Lint",
  version: "1.0.0",
  description: "Lint design outputs",
  commands: ["lint"],
};

export const plugin: IPhoenixPlugin = {
  manifest,
  init(context) {
    console.log(`Loaded ${manifest.name} (cwd: ${context.cwd})`);
  },
  commands: {
    lint: async (args) => {
      // Run linter; return 0 or 1
      return 0;
    },
  },
};
```

## Discovery and loading

- **Install**: `phoenix plugin install <path-or-npm-spec>` adds the plugin to `.phoenix/plugins.json`. Plugin loaders (e.g. dynamic `import()` of the installed package) are not yet implemented; the contract is documented for future wiring.
- **List**: `phoenix plugin list` shows installed plugins from `.phoenix/plugins.json`.
- **Remove**: `phoenix plugin remove <plugin-id>` removes the plugin from the manifest.

## Stability

This contract is part of the Phoenix OS developer platform. Breaking changes will be documented in the changelog and reflected in SDK version bumps.
