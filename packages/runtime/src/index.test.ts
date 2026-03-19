import { describe, it, expect } from "vitest";
import { RUNTIME_VERSION } from "./index.js";

describe("@pzero/runtime", () => {
  it("exports a runtime version", () => {
    expect(RUNTIME_VERSION).toBe("0.1.0");
  });
});
