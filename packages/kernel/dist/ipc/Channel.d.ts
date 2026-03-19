/**
 * Channel — unidirectional typed message passing between process IDs.
 * ADR-006: send/receive with optional timeout.
 */
import type { ProcessId } from "../process/types.js";
import { Mailbox } from "./Mailbox.js";
/**
 * A channel connects a sender to a receiver's mailbox. One-way.
 * Send enqueues to the receiver's mailbox; receive is on the mailbox.
 */
export declare class Channel<T = unknown> {
    readonly id: string;
    readonly sender: ProcessId;
    readonly receiver: ProcessId;
    private mailbox;
    constructor(sender: ProcessId, receiver: ProcessId, mailbox: Mailbox<T>);
    /** Send a message to the receiver. Enqueues in receiver's mailbox. */
    send(payload: T): void;
    /** Receive is on the mailbox (receiver calls mailbox.receive). */
    getMailbox(): Mailbox<T>;
}
//# sourceMappingURL=Channel.d.ts.map