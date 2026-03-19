/**
 * Phoenix OS plugin/extension contract.
 * Plugins extend the CLI and SDK with custom commands and hooks.
 * @see docs/design/plugin-contract.md
 */

/** Plugin manifest — required for every plugin. */
export interface PhoenixPluginManifest {
  /** Unique plugin id (e.g. scope/name). */
  id: string;
  /** Human-readable name. */
  name: string;
  /** Semantic version. */
  version: string;
  /** Optional short description. */
  description?: string;
  /** Optional list of CLI command names this plugin registers. */
  commands?: string[];
  /** Optional hook names the plugin implements. */
  hooks?: string[];
}

/** Context passed to plugin init (e.g. SDK instance, config). */
export interface PhoenixPluginContext {
  /** SDK version. */
  sdkVersion: string;
  /** Working directory when CLI was invoked. */
  cwd: string;
  /** Optional config from phoenix.config.json or env. */
  config?: Record<string, unknown>;
}

/**
 * Plugin interface. Implement this to build Phoenix OS extensions.
 * - init(): called when the plugin is loaded; use to register commands or hooks.
 * - commands: optional map of command name -> handler for CLI subcommands.
 */
export interface IPhoenixPlugin {
  readonly manifest: PhoenixPluginManifest;

  /**
   * Initialize the plugin. Called once when the runtime loads the plugin.
   * Use to register CLI commands or subscribe to hooks.
   */
  init?(context: PhoenixPluginContext): void | Promise<void>;

  /**
   * Optional: CLI subcommand handlers. Key = command name, value = async handler(args).
   * Only used when the CLI runs `phoenix plugin run <plugin-id> <command> [args]`.
   */
  commands?: Record<string, (args: string[]) => Promise<number> | number>;
}
