/**
 * Process lifecycle types for Phoenix OS kernel.
 * ADR-006: process states created → ready → running → blocked | terminated.
 */

/** Unique process identifier. */
export type ProcessId = string;

/**
 * Process state in the lifecycle.
 * - created: allocated, not yet runnable
 * - ready: runnable, waiting for scheduler
 * - running: currently selected by scheduler
 * - blocked: waiting on IPC or other resource
 * - terminated: finished or killed
 */
export type ProcessState =
  | "created"
  | "ready"
  | "running"
  | "blocked"
  | "terminated";

/**
 * Optional hint for scheduler (e.g. AI inference can be batched or deprioritized).
 * Kernel does not interpret; runtime/scheduler may use for policies.
 */
export type ProcessKind = "default" | "ai_inference" | "io" | "critical";

/** Priority: higher number = higher priority. Default 0. */
export type Priority = number;

export interface ProcessMeta {
  /** Scheduler hint. */
  kind?: ProcessKind;
  /** Optional user-defined label. */
  label?: string;
  /** Creation time (epoch ms). */
  createdAt?: number;
}

/** Process descriptor: identity, state, and metadata. */
export interface Process {
  id: ProcessId;
  state: ProcessState;
  priority: Priority;
  meta?: ProcessMeta;
}
