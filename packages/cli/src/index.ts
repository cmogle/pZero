#!/usr/bin/env node
/**
 * Phoenix OS CLI — init, run, inspect, deploy, plugin.
 * @see packages/cli/README.md
 */

import { Command } from "commander";
import { cmdInit } from "./commands/init.js";
import { cmdRun } from "./commands/run.js";
import { cmdInspect } from "./commands/inspect.js";
import { cmdDeploy } from "./commands/deploy.js";
import { cmdPlugin } from "./commands/plugin.js";

const program = new Command();

program
  .name("phoenix")
  .description("Phoenix OS CLI — workflow management and developer tools")
  .version("0.1.0");

program
  .command("init")
  .description("Initialize a Phoenix OS project in the current directory")
  .option("-f, --force", "Overwrite existing config")
  .action(cmdInit);

program
  .command("run")
  .description("Run a workflow by id or path")
  .argument("[workflow-id-or-path]", "Workflow definition id or path to JSON file")
  .option("-i, --input <json>", "Input JSON string or path to JSON file")
  .action(cmdRun);

program
  .command("inspect")
  .description("Inspect workflow runs or environment")
  .argument("[run-id]", "Workflow run id (if omitted, show env info)")
  .action(cmdInspect);

program
  .command("deploy")
  .description("Deploy the current project to the configured target")
  .option("-t, --target <name>", "Deploy target (default from config)")
  .action(cmdDeploy);

program
  .command("plugin")
  .description("Manage Phoenix OS plugins")
  .addCommand(
    new Command("install")
      .argument("<spec>", "Plugin spec: path or npm package name")
      .action((spec: string) => cmdPlugin("install", spec))
  )
  .addCommand(
    new Command("list").alias("ls").description("List installed plugins").action(() => cmdPlugin("list"))
  )
  .addCommand(
    new Command("remove")
      .alias("rm")
      .argument("<plugin-id>", "Plugin id to remove")
      .action((id: string) => cmdPlugin("remove", id))
  );

program.parse();
