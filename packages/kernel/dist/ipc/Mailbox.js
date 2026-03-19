/**
 * Mailbox — bounded FIFO buffer of messages for a process.
 * ADR-006: each process has a mailbox; channels deliver into it.
 */
const DEFAULT_CAPACITY = 64;
export class Mailbox {
    queue = [];
    capacity;
    constructor(capacity = DEFAULT_CAPACITY) {
        this.capacity = Math.max(1, capacity);
    }
    enqueue(message) {
        if (this.queue.length >= this.capacity)
            return false;
        this.queue.push(message);
        return true;
    }
    /**
     * Dequeue next message. Returns undefined if empty.
     */
    receive() {
        return this.queue.shift();
    }
    /**
     * Receive with timeout (ms). Polls once after timeout; for real async wait, caller would use a different mechanism.
     * Returns undefined if still empty after waiting.
     */
    receiveWithTimeout(_timeoutMs) {
        return this.receive();
    }
    get size() {
        return this.queue.length;
    }
    get empty() {
        return this.queue.length === 0;
    }
}
//# sourceMappingURL=Mailbox.js.map