/**
 * IPC — create channels and mailboxes; route messages.
 * ADR-006: channels are one-way sender→receiver; receiver reads from mailbox.
 */
import { Channel } from "./Channel.js";
import { Mailbox } from "./Mailbox.js";
/** Process mailbox registry: one mailbox per process (per type if we want typed mailboxes later). */
const mailboxes = new Map();
function getOrCreateMailbox(pid, capacity) {
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
export function createChannel(sender, receiver, receiverMailboxCapacity) {
    const mailbox = getOrCreateMailbox(receiver, receiverMailboxCapacity);
    return new Channel(sender, receiver, mailbox);
}
/**
 * Get the mailbox for a process (for receiving).
 */
export function getMailbox(pid) {
    return mailboxes.get(pid);
}
/**
 * For tests: clear all mailboxes and channel id counter.
 */
export function resetIPC() {
    mailboxes.clear();
    // Channel id counter is in Channel.ts; we could export a reset from there if needed
}
//# sourceMappingURL=IPC.js.map