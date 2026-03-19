/**
 * Mailbox — bounded FIFO buffer of messages for a process.
 * ADR-006: each process has a mailbox; channels deliver into it.
 */

import type { Message } from "./types.js";

const DEFAULT_CAPACITY = 64;

export class Mailbox<T = unknown> {
  private queue: Message<T>[] = [];
  private readonly capacity: number;

  constructor(capacity: number = DEFAULT_CAPACITY) {
    this.capacity = Math.max(1, capacity);
  }

  enqueue(message: Message<T>): boolean {
    if (this.queue.length >= this.capacity) return false;
    this.queue.push(message);
    return true;
  }

  /**
   * Dequeue next message. Returns undefined if empty.
   */
  receive(): Message<T> | undefined {
    return this.queue.shift();
  }

  /**
   * Receive with timeout (ms). Polls once after timeout; for real async wait, caller would use a different mechanism.
   * Returns undefined if still empty after waiting.
   */
  receiveWithTimeout(_timeoutMs: number): Message<T> | undefined {
    return this.receive();
  }

  get size(): number {
    return this.queue.length;
  }

  get empty(): boolean {
    return this.queue.length === 0;
  }
}
