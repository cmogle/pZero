/**
 * phoenix plugin install | list | remove — manage plugins.
 */

import { readFileSync, writeFileSync, existsSync, mkdirSync } from "node:fs";
import { join } from "node:path";

const PLUGINS_DIR = ".phoenix/plugins";
const PLUGINS_MANIFEST = ".phoenix/plugins.json";

interface PluginEntry {
  id: string;
  spec: string;
  version?: string;
}

function ensurePluginsDir(cwd: string): string {
  const dir = join(cwd, PLUGINS_DIR);
  if (!existsSync(dir)) {
    mkdirSync(dir, { recursive: true });
  }
  return dir;
}

function readManifest(cwd: string): PluginEntry[] {
  const path = join(cwd, PLUGINS_MANIFEST);
  if (!existsSync(path)) return [];
  try {
    const raw = JSON.parse(readFileSync(path, "utf8"));
    return Array.isArray(raw.plugins) ? raw.plugins : [];
  } catch {
    return [];
  }
}

function writeManifest(cwd: string, plugins: PluginEntry[]): void {
  const dir = join(cwd, ".phoenix");
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(
    join(cwd, PLUGINS_MANIFEST),
    JSON.stringify({ plugins }, null, 2) + "\n",
    "utf8"
  );
}

export async function cmdPlugin(
  action: "install" | "list" | "remove",
  arg?: string
): Promise<void> {
  const cwd = process.cwd();

  if (action === "list") {
    const plugins = readManifest(cwd);
    if (plugins.length === 0) {
      console.log("No plugins installed.");
      return;
    }
    for (const p of plugins) {
      console.log(`${p.id}\t${p.spec}${p.version ? ` (${p.version})` : ""}`);
    }
    return;
  }

  if (action === "install" && arg) {
    ensurePluginsDir(cwd);
    const plugins = readManifest(cwd);
    const id = arg.replace(/^@[^/]+\//, "").replace(/.*\//, "").replace(/\.tgz$/, "");
    if (plugins.some((p) => p.id === id)) {
      console.error(`Plugin already installed: ${id}`);
      process.exit(1);
    }
    plugins.push({ id, spec: arg });
    writeManifest(cwd, plugins);
    console.log(`Added plugin: ${id} (${arg}). Load implementation not yet wired.`);
    return;
  }

  if (action === "remove" && arg) {
    const plugins = readManifest(cwd).filter((p) => p.id !== arg);
    if (plugins.length === readManifest(cwd).length) {
      console.error(`Plugin not found: ${arg}`);
      process.exit(1);
    }
    writeManifest(cwd, plugins);
    console.log(`Removed plugin: ${arg}`);
    return;
  }

  console.error("Usage: phoenix plugin install <spec> | list | remove <plugin-id>");
  process.exit(1);
}
