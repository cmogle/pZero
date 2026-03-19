/**
 * Task scheduler — deterministic priority queue; AI-workload-aware.
 * ADR-006: single-threaded cooperative; yields next runnable process.
 */

import type { ProcessId } from "../process/types.js";
import type { ProcessManager } from "../process/index.js";

/** Entry for the ready queue: process id + priority + creation order for tie-break. */
interface QueueEntry {
  pid: ProcessId;
  priority: number;
  enqueuedAt: number;
}

export class Scheduler {
  private readyQueue: QueueEntry[] = [];
  private orderCounter = 0;

  constructor(private processManager: ProcessManager) {}

  /**
   * Enqueue a process as ready. Call when a process becomes runnable (start or unblock).
   */
  enqueue(pid: ProcessId): void {
    const p = this.processManager.get(pid);
    if (!p || p.state !== "ready") return;
    this.readyQueue.push({
      pid,
      priority: p.priority,
      enqueuedAt: this.orderCounter++,
    });
    // Keep sorted: higher priority first, then older enqueuedAt first
    this.readyQueue.sort((a, b) => {
      if (b.priority !== a.priority) return b.priority - a.priority;
      return a.enqueuedAt - b.enqueuedAt;
    });
  }

  /**
   * Dequeue the next runnable process and mark it running. Returns pid or undefined if none.
   */
  next(): ProcessId | undefined {
    while (this.readyQueue.length > 0) {
      const entry = this.readyQueue.shift()!;
      const p = this.processManager.get(entry.pid);
      if (!p) continue;
      if (p.state !== "ready") continue;
      this.processManager.resume(entry.pid);
      return entry.pid;
    }
    return undefined;
  }

  /**
   * Yield current process: mark it ready and enqueue; return next runnable pid.
   */
  yield(currentPid: ProcessId): ProcessId | undefined {
    this.processManager.pause(currentPid);
    this.enqueue(currentPid);
    return this.next();
  }

  /** Number of processes in the ready queue. */
  get readyCount(): number {
    return this.readyQueue.length;
  }
}
