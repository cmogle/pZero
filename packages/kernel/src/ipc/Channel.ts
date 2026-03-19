/**
 * Channel — unidirectional typed message passing between process IDs.
 * ADR-006: send/receive with optional timeout.
 */

import type { ProcessId } from "../process/types.js";
import type { Message } from "./types.js";
import { Mailbox } from "./Mailbox.js";

let channelIdCounter = 0;

function nextChannelId(): string {
  channelIdCounter += 1;
  return `ch${channelIdCounter}`;
}

/**
 * A channel connects a sender to a receiver's mailbox. One-way.
 * Send enqueues to the receiver's mailbox; receive is on the mailbox.
 */
export class Channel<T = unknown> {
  readonly id: string;
  readonly sender: ProcessId;
  readonly receiver: ProcessId;
  private mailbox: Mailbox<T>;

  constructor(sender: ProcessId, receiver: ProcessId, mailbox: Mailbox<T>) {
    this.id = nextChannelId();
    this.sender = sender;
    this.receiver = receiver;
    this.mailbox = mailbox;
  }

  /** Send a message to the receiver. Enqueues in receiver's mailbox. */
  send(payload: T): void {
    const message: Message<T> = { from: this.sender, payload };
    this.mailbox.enqueue(message);
  }

  /** Receive is on the mailbox (receiver calls mailbox.receive). */
  getMailbox(): Mailbox<T> {
    return this.mailbox;
  }
}
