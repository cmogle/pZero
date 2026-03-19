/**
 * phoenix init — unit tests.
 */

import { describe, it, expect, beforeEach, afterEach, vi } from "vitest";
import { mkdtempSync, readFileSync, existsSync, writeFileSync, rmSync } from "node:fs";
import { join } from "node:path";
import { tmpdir } from "node:os";
import { cmdInit } from "./init.js";

describe("phoenix init", () => {
  let cwd: string;
  let origCwd: string;

  beforeEach(() => {
    origCwd = process.cwd();
    cwd = mkdtempSync(join(tmpdir(), "phoenix-init-"));
    process.chdir(cwd);
  });

  afterEach(() => {
    process.chdir(origCwd);
    rmSync(cwd, { recursive: true, force: true });
  });

  it("creates phoenix.config.json", async () => {
    await cmdInit({});
    expect(existsSync(join(cwd, "phoenix.config.json"))).toBe(true);
    const content = JSON.parse(readFileSync(join(cwd, "phoenix.config.json"), "utf8"));
    expect(content.name).toBe("phoenix-project");
    expect(Array.isArray(content.workflows)).toBe(true);
    expect(content.workflows[0].id).toBe("sample-workflow");
  });

  it("refuses to overwrite without --force", async () => {
    writeFileSync(join(cwd, "phoenix.config.json"), '{"name":"existing"}', "utf8");
    const exitSpy = vi.spyOn(process, "exit").mockImplementation(((code?: number) => {
      throw new Error(`exit(${code})`);
    }) as () => never);
    await expect(cmdInit({})).rejects.toThrow("exit(1)");
    expect(JSON.parse(readFileSync(join(cwd, "phoenix.config.json"), "utf8")).name).toBe("existing");
    exitSpy.mockRestore();
  });

  it("overwrites with --force", async () => {
    writeFileSync(join(cwd, "phoenix.config.json"), '{"name":"old"}', "utf8");
    await cmdInit({ force: true });
    const content = JSON.parse(readFileSync(join(cwd, "phoenix.config.json"), "utf8"));
    expect(content.name).toBe("phoenix-project");
  });
});
