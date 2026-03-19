/**
 * phoenix run — run a workflow by id or path.
 */

import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { PhoenixDesignAPI } from "@pzero/sdk";
import type { WorkflowDef, WorkflowInput } from "@pzero/sdk";

const CONFIG_FILENAME = "phoenix.config.json";

function loadConfig(cwd: string): { workflows?: WorkflowDef[] } {
  const path = join(cwd, CONFIG_FILENAME);
  if (!existsSync(path)) {
    return {};
  }
  const raw = JSON.parse(readFileSync(path, "utf8"));
  return raw as { workflows?: WorkflowDef[] };
}

function parseInput(inputOpt?: string): WorkflowInput {
  if (!inputOpt) return {};
  if (inputOpt.startsWith("{")) {
    return JSON.parse(inputOpt) as WorkflowInput;
  }
  const path = join(process.cwd(), inputOpt);
  if (!existsSync(path)) {
    throw new Error(`Input file not found: ${path}`);
  }
  return JSON.parse(readFileSync(path, "utf8")) as WorkflowInput;
}

export async function cmdRun(
  workflowIdOrPath?: string,
  opts?: { input?: string }
): Promise<void> {
  const cwd = process.cwd();
  const config = loadConfig(cwd);
  const workflows = config.workflows ?? [];
  let def: WorkflowDef | undefined;

  if (workflowIdOrPath) {
    if (existsSync(join(cwd, workflowIdOrPath))) {
      const raw = JSON.parse(readFileSync(join(cwd, workflowIdOrPath), "utf8"));
      def = raw as WorkflowDef;
    } else {
      def = workflows.find((w) => w.id === workflowIdOrPath);
    }
  } else {
    def = workflows[0];
  }

  if (!def) {
    console.error("No workflow specified and none found in phoenix.config.json. Use: phoenix init");
    process.exit(1);
  }

  const input = parseInput(opts?.input);
  const api = new PhoenixDesignAPI();
  const { runId, status } = api.startDesignWorkflow(def, input);
  console.log(`Started run: ${runId} (${status})`);
  const result = await api.runDesignWorkflowToCompletion(def, input);
  console.log(JSON.stringify(result.status, null, 2));
  if (result.status.error) process.exit(1);
}
