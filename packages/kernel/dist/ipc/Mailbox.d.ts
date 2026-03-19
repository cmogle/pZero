/**
 * Mailbox — bounded FIFO buffer of messages for a process.
 * ADR-006: each process has a mailbox; channels deliver into it.
 */
import type { Message } from "./types.js";
export declare class Mailbox<T = unknown> {
    private queue;
    private readonly capacity;
    constructor(capacity?: number);
    enqueue(message: Message<T>): boolean;
    /**
     * Dequeue next message. Returns undefined if empty.
     */
    receive(): Message<T> | undefined;
    /**
     * Receive with timeout (ms). Polls once after timeout; for real async wait, caller would use a different mechanism.
     * Returns undefined if still empty after waiting.
     */
    receiveWithTimeout(_timeoutMs: number): Message<T> | undefined;
    get size(): number;
    get empty(): boolean;
}
//# sourceMappingURL=Mailbox.d.ts.map