/**
 * Stub AI adapter for tests and local dev.
 * ADR-007: returns fixed response; no external calls.
 */

import type { IDesignAIAdapter, AIResult, AIContext } from "./types.js";

const STUB_RESPONSE = "Stub completion: design intelligence placeholder.";

export class StubDesignAIAdapter implements IDesignAIAdapter {
  private response: string;

  constructor(response: string = STUB_RESPONSE) {
    this.response = response;
  }

  async complete(_prompt: string, _context?: AIContext): Promise<AIResult> {
    return { success: true, output: this.response, data: { stub: true } };
  }
}
