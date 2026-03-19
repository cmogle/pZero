/**
 * Stub AI adapter for tests and local dev.
 * ADR-007: returns fixed response; no external calls.
 */
const STUB_RESPONSE = "Stub completion: design intelligence placeholder.";
export class StubDesignAIAdapter {
    response;
    constructor(response = STUB_RESPONSE) {
        this.response = response;
    }
    async complete(_prompt, _context) {
        return { success: true, output: this.response, data: { stub: true } };
    }
}
//# sourceMappingURL=stubAdapter.js.map