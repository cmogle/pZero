/**
 * phoenix init — scaffold a Phoenix OS project.
 */
import { writeFileSync, existsSync } from "node:fs";
import { join } from "node:path";
const CONFIG_FILENAME = "phoenix.config.json";
const SAMPLE_WORKFLOW = {
    id: "sample-workflow",
    name: "Sample workflow",
    entry: "step-1",
    steps: [
        { id: "step-1", type: "task", config: {}, onSuccess: "step-2" },
        { id: "step-2", type: "task", config: {} },
    ],
};
export async function cmdInit(opts) {
    const cwd = process.cwd();
    const configPath = join(cwd, CONFIG_FILENAME);
    if (existsSync(configPath) && !opts.force) {
        console.error(`Already exists: ${CONFIG_FILENAME}. Use --force to overwrite.`);
        process.exit(1);
    }
    const config = {
        name: "phoenix-project",
        version: "0.1.0",
        workflows: [SAMPLE_WORKFLOW],
    };
    writeFileSync(configPath, JSON.stringify(config, null, 2) + "\n", "utf8");
    console.log(`Created ${CONFIG_FILENAME}`);
}
//# sourceMappingURL=init.js.map