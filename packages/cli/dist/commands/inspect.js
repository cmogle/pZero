/**
 * phoenix inspect — show run status or environment info.
 */
import { readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { PhoenixDesignAPI, SDK_VERSION } from "@pzero/sdk";
const CONFIG_FILENAME = "phoenix.config.json";
export async function cmdInspect(runId) {
    if (runId) {
        const api = new PhoenixDesignAPI();
        const status = api.getDesignWorkflowStatus(runId);
        if (!status) {
            console.error(`Run not found: ${runId}`);
            process.exit(1);
        }
        console.log(JSON.stringify(status, null, 2));
        return;
    }
    const cwd = process.cwd();
    const configPath = join(cwd, CONFIG_FILENAME);
    const hasConfig = existsSync(configPath);
    const config = hasConfig ? JSON.parse(readFileSync(configPath, "utf8")) : null;
    const workflowIds = config?.workflows?.map((w) => w.id) ?? [];
    console.log(JSON.stringify({
        sdkVersion: SDK_VERSION,
        cwd,
        configFile: hasConfig ? CONFIG_FILENAME : null,
        workflowIds,
    }, null, 2));
}
//# sourceMappingURL=inspect.js.map