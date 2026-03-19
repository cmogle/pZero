/**
 * phoenix plugin — unit tests.
 */

import { describe, it, expect, beforeEach, afterEach } from "vitest";
import { mkdtempSync, readFileSync, existsSync, rmSync, writeFileSync, mkdirSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { cmdPlugin } from "./plugin.js";

describe("phoenix plugin", () => {
  let cwd: string;
  let origCwd: string;

  beforeEach(() => {
    origCwd = process.cwd();
    cwd = mkdtempSync(join(tmpdir(), "phoenix-plugin-"));
    process.chdir(cwd);
  });

  afterEach(() => {
    process.chdir(origCwd);
    rmSync(cwd, { recursive: true, force: true });
  });

  it("list shows empty when no plugins", async () => {
    await cmdPlugin("list");
    expect(readManifest()).toEqual([]);
  });

  it("install adds plugin to manifest", async () => {
    await cmdPlugin("install", "./local/plugin");
    const manifest = readManifest();
    expect(manifest).toHaveLength(1);
    expect(manifest[0].id).toBe("plugin");
    expect(manifest[0].spec).toBe("./local/plugin");
  });

  it("remove deletes plugin from manifest", async () => {
    const dir = join(cwd, ".phoenix");
    if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
    writeFileSync(
      join(cwd, ".phoenix/plugins.json"),
      JSON.stringify({ plugins: [{ id: "foo", spec: "foo-pkg" }] }) + "\n",
      "utf8"
    );
    await cmdPlugin("remove", "foo");
    expect(readManifest()).toHaveLength(0);
  });

  function readManifest(): { id: string; spec: string }[] {
    const path = join(cwd, ".phoenix/plugins.json");
    if (!existsSync(path)) return [];
    return JSON.parse(readFileSync(path, "utf8")).plugins ?? [];
  }
});
