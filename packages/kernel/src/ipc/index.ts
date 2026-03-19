/**
 * IPC — channels and mailboxes.
 * ADR-006.
 */

export type { ChannelId, Message } from "./types.js";
export { Channel } from "./Channel.js";
export { Mailbox } from "./Mailbox.js";
export { createChannel, getMailbox, resetIPC } from "./IPC.js";
