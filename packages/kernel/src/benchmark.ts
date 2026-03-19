/**
 * Kernel benchmark — process lifecycle and IPC hot paths.
 * ADR-008: Phase 5 performance baseline. Run with: pnpm run build && pnpm run benchmark
 */

import { ProcessManager, Scheduler, createChannel, getMailbox, resetIPC } from "./index.js";

const ITER = 10_000;

function now(): number {
  return performance.now();
}

function ms(start: number, end: number): string {
  return `${(end - start).toFixed(2)}ms`;
}

console.log("Kernel benchmark (iterations = %d)\n", ITER);

// Process create + start
const pm = new ProcessManager();
const t0 = now();
for (let i = 0; i < ITER; i++) {
  const p = pm.create({ priority: i % 3 });
  pm.start(p.id);
}
const t1 = now();
console.log("Process create+start: %s (%s per iter)", ms(t0, t1), ((t1 - t0) / ITER).toFixed(4) + "ms");

// Scheduler enqueue + next
const s = new Scheduler(pm);
const ids = pm.listByState("ready").map((p) => p.id).slice(0, 1000);
const t2 = now();
for (let i = 0; i < ITER; i++) {
  for (const id of ids) s.enqueue(id);
  for (let j = 0; j < ids.length; j++) s.next();
}
const t3 = now();
console.log("Scheduler enqueue+next (1k processes × %d): %s", ITER, ms(t2, t3));

// IPC channel send + receive
resetIPC();
const ch = createChannel<number>("a", "b");
const t4 = now();
for (let i = 0; i < ITER; i++) {
  ch.send(i);
}
const box = getMailbox<number>("b")!;
for (let i = 0; i < ITER; i++) {
  box.receive();
}
const t5 = now();
console.log("IPC send+receive: %s", ms(t4, t5));

console.log("\nDone.");
