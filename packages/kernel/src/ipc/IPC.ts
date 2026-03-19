/**
 * IPC — create channels and mailboxes; route messages.
 * ADR-006: channels are one-way sender→receiver; receiver reads from mailbox.
 */

import type { ProcessId } from "../process/types.js";
import { Channel } from "./Channel.js";
import { Mailbox } from "./Mailbox.js";

/** Process mailbox registry: one mailbox per process (per type if we want typed mailboxes later). */
const mailboxes = new Map<ProcessId, Mailbox>();

function getOrCreateMailbox(pid: ProcessId, capacity?: number): Mailbox {
  let box = mailboxes.get(pid);
  if (!box) {
    box = new Mailbox(capacity);
    mailboxes.set(pid, box);
  }
  return box;
}

/**
 * Create a channel from sender to receiver. Receiver gets a mailbox if needed.
 */
export function createChannel<T = unknown>(
  sender: ProcessId,
  receiver: ProcessId,
  receiverMailboxCapacity?: number
): Channel<T> {
  const mailbox = getOrCreateMailbox(receiver, receiverMailboxCapacity);
  return new Channel(sender, receiver, mailbox as Mailbox<T>);
}

/**
 * Get the mailbox for a process (for receiving).
 */
export function getMailbox<T = unknown>(pid: ProcessId): Mailbox<T> | undefined {
  return mailboxes.get(pid) as Mailbox<T> | undefined;
}

/**
 * For tests: clear all mailboxes and channel id counter.
 */
export function resetIPC(): void {
  mailboxes.clear();
  // Channel id counter is in Channel.ts; we could export a reset from there if needed
}
