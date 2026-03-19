/**
 * Channel — unidirectional typed message passing between process IDs.
 * ADR-006: send/receive with optional timeout.
 */
let channelIdCounter = 0;
function nextChannelId() {
    channelIdCounter += 1;
    return `ch${channelIdCounter}`;
}
/**
 * A channel connects a sender to a receiver's mailbox. One-way.
 * Send enqueues to the receiver's mailbox; receive is on the mailbox.
 */
export class Channel {
    id;
    sender;
    receiver;
    mailbox;
    constructor(sender, receiver, mailbox) {
        this.id = nextChannelId();
        this.sender = sender;
        this.receiver = receiver;
        this.mailbox = mailbox;
    }
    /** Send a message to the receiver. Enqueues in receiver's mailbox. */
    send(payload) {
        const message = { from: this.sender, payload };
        this.mailbox.enqueue(message);
    }
    /** Receive is on the mailbox (receiver calls mailbox.receive). */
    getMailbox() {
        return this.mailbox;
    }
}
//# sourceMappingURL=Channel.js.map