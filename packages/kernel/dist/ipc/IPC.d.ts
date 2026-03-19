/**
 * IPC — create channels and mailboxes; route messages.
 * ADR-006: channels are one-way sender→receiver; receiver reads from mailbox.
 */
import type { ProcessId } from "../process/types.js";
import { Channel } from "./Channel.js";
import { Mailbox } from "./Mailbox.js";
/**
 * Create a channel from sender to receiver. Receiver gets a mailbox if needed.
 */
export declare function createChannel<T = unknown>(sender: ProcessId, receiver: ProcessId, receiverMailboxCapacity?: number): Channel<T>;
/**
 * Get the mailbox for a process (for receiving).
 */
export declare function getMailbox<T = unknown>(pid: ProcessId): Mailbox<T> | undefined;
/**
 * For tests: clear all mailboxes and channel id counter.
 */
export declare function resetIPC(): void;
//# sourceMappingURL=IPC.d.ts.map