/**
 * @fileoverview Phoenix OS kernel — core exports.
 * Kernel layer: orchestration, process lifecycle, and module boundaries.
 * ADR: Phase 1 foundation; ADR-006 Phase 2 core runtime.
 */
export declare const KERNEL_VERSION = "0.1.0";
export { type ProcessId, type ProcessState, type ProcessKind, type Priority, type ProcessMeta, type Process, ProcessManager, } from "./process/index.js";
export { Scheduler } from "./scheduler/index.js";
export { type ChannelId, type Message, Channel, Mailbox, createChannel, getMailbox, resetIPC, } from "./ipc/index.js";
export { type AllocHandle, type Allocator, PoolAllocator, } from "./memory/index.js";
//# sourceMappingURL=index.d.ts.map