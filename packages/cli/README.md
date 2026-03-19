# @pzero/cli

Phoenix OS CLI — init, run, inspect, deploy, and plugin management. Use from the project root or link globally as `phoenix`.

## Install

In the monorepo the CLI is built with the rest of the workspace. To run it:

```bash
pnpm exec phoenix --help
# or from packages/cli after build:
node dist/index.js --help
```

To use as a global binary, link from the repo root:

```bash
pnpm link --global ./packages/cli
phoenix --help
```

## Commands

| Command | Description |
|---------|-------------|
| `phoenix init` | Initialize a Phoenix OS project (creates `phoenix.config.json`). Use `--force` to overwrite. |
| `phoenix run [workflow-id-or-path]` | Run a workflow. Reads from `phoenix.config.json` or a JSON file. Optional `-i, --input <json>` for input. |
| `phoenix inspect [run-id]` | Show workflow run status, or (without run-id) environment and config summary. |
| `phoenix deploy` | Deploy the project (placeholder; not yet implemented). |
| `phoenix plugin install <spec>` | Add a plugin (path or npm spec). Registered in `.phoenix/plugins.json`. |
| `phoenix plugin list` | List installed plugins. |
| `phoenix plugin remove <plugin-id>` | Remove a plugin by id. |

## Project config

After `phoenix init`, edit `phoenix.config.json`:

```json
{
  "name": "my-project",
  "version": "0.1.0",
  "workflows": [
    {
      "id": "my-workflow",
      "name": "My workflow",
      "entry": "step-1",
      "steps": [
        { "id": "step-1", "type": "task", "config": {}, "onSuccess": "step-2" },
        { "id": "step-2", "type": "task", "config": {} }
      ]
    }
  ]
}
```

## Plugins

Plugins are registered with `phoenix plugin install <path-or-package>`. The plugin contract (manifest, `IPhoenixPlugin`, context) is documented in the SDK and in [Plugin contract](../../docs/design/plugin-contract.md). Plugin loading (dynamic execution) is not yet wired; the CLI only manages the manifest.

## Scripts

- `pnpm build` — compile to `dist/`
- `pnpm test` — run unit tests
- `pnpm typecheck` — type-check without emit
- `pnpm clean` — remove `dist/`
