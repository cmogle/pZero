#!/usr/bin/env node
/**
 * Phoenix OS health server — /health and /ready for containers and load balancers.
 * ADR-008: Phase 5. No auth; use network policy in production.
 * Usage: node scripts/health-server.mjs [port]
 */

import { createServer } from "http";
import { readFileSync } from "fs";
import { fileURLToPath } from "url";
import { dirname, join } from "path";

const __dirname = dirname(fileURLToPath(import.meta.url));
const root = join(__dirname, "..");
const port = parseInt(process.env.PORT || process.argv[2] || "8080", 10);

let pkg;
try {
  pkg = JSON.parse(readFileSync(join(root, "package.json"), "utf8"));
} catch {
  pkg = { version: "0.1.0" };
}

const profile = process.env.PHOENIX_PROFILE || "development";

function json(res, code, body) {
  res.writeHead(code, { "Content-Type": "application/json" });
  res.end(JSON.stringify(body));
}

const server = createServer((req, res) => {
  const path = req.url?.split("?")[0];
  if (req.method === "GET" && (path === "/health" || path === "/")) {
    return json(res, 200, {
      status: "ok",
      version: pkg.version,
      profile,
      service: "phoenix-os",
    });
  }
  if (req.method === "GET" && path === "/ready") {
    return json(res, 200, { ready: true, profile });
  }
  res.writeHead(404);
  res.end();
});

server.listen(port, "0.0.0.0", () => {
  console.log(`Health server listening on :${port}`);
});
