/**
 * @fileoverview Phoenix OS kernel — core exports.
 * Kernel layer: orchestration, process lifecycle, and module boundaries.
 * ADR: Phase 1 foundation; ADR-006 Phase 2 core runtime.
 */
export const KERNEL_VERSION = "0.1.0";
export { ProcessManager, } from "./process/index.js";
export { Scheduler } from "./scheduler/index.js";
export { Channel, Mailbox, createChannel, getMailbox, resetIPC, } from "./ipc/index.js";
export { PoolAllocator, } from "./memory/index.js";
//# sourceMappingURL=index.js.map