import { describe, it, expect } from "vitest";
import { assemble } from "./resolve.js";
import type { DecisionResult } from "../decision/types.js";
import type { ContentBlock } from "./types.js";

const decisionRespond: DecisionResult = {
  shouldRespond: true,
  playbookId: "pb-earnings",
  selectedBlockIds: ["block-disclaimer", "block-template"],
  reasoning: "Because earnings, triggering Playbook.",
  signalHeadline: "Q4 earnings beat",
};

const decisionNoRespond: DecisionResult = {
  shouldRespond: false,
  selectedBlockIds: [],
  reasoning: "No matching playbook.",
  signalHeadline: "Q4 earnings beat",
};

const contentLibrary: Record<string, ContentBlock> = {
  "block-disclaimer": {
    id: "block-disclaimer",
    label: "Standard disclaimer",
    kind: "disclaimer",
    body: "This is not investment advice.",
  },
  "block-template": {
    id: "block-template",
    label: "Earnings template",
    kind: "template",
    body: "Thank you for the update. We note the following.",
  },
};

describe("assembler", () => {
  describe("assemble", () => {
    it("retrieves selected blocks and stitches into single artifact", () => {
      const artifact = assemble({
        decisionResult: decisionRespond,
        contentLibrary,
      });
      expect(artifact).not.toBeNull();
      expect(artifact!.kind).toBe("draft");
      expect(artifact!.body).toBe(
        "This is not investment advice.\n\nThank you for the update. We note the following."
      );
      expect(artifact!.sourceBlockIds).toEqual(["block-disclaimer", "block-template"]);
    });

    it("returns null when shouldRespond is false", () => {
      const artifact = assemble({
        decisionResult: decisionNoRespond,
        contentLibrary,
      });
      expect(artifact).toBeNull();
    });

    it("returns null when selectedBlockIds is empty", () => {
      const artifact = assemble({
        decisionResult: { ...decisionRespond, selectedBlockIds: [] },
        contentLibrary,
      });
      expect(artifact).toBeNull();
    });

    it("skips missing blocks and assembles available ones", () => {
      const artifact = assemble({
        decisionResult: {
          ...decisionRespond,
          selectedBlockIds: ["block-disclaimer", "block-missing", "block-template"],
        },
        contentLibrary,
      });
      expect(artifact).not.toBeNull();
      expect(artifact!.body).toBe(
        "This is not investment advice.\n\nThank you for the update. We note the following."
      );
      expect(artifact!.sourceBlockIds).toEqual(["block-disclaimer", "block-template"]);
    });

    it("works with Map contentLibrary", () => {
      const lib = new Map<string, ContentBlock>(Object.entries(contentLibrary));
      const artifact = assemble({
        decisionResult: decisionRespond,
        contentLibrary: lib,
      });
      expect(artifact).not.toBeNull();
      expect(artifact!.sourceBlockIds).toEqual(["block-disclaimer", "block-template"]);
    });
  });
});
