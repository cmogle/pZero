/**
 * IPC types — channels and mailboxes.
 * ADR-006: unidirectional typed message passing; mailbox per process, FIFO.
 */
import type { ProcessId } from "../process/types.js";
/** Opaque handle for a channel (sender or receiver side). */
export type ChannelId = string;
/** Message envelope: sender, payload. */
export interface Message<T = unknown> {
    from: ProcessId;
    payload: T;
}
//# sourceMappingURL=types.d.ts.map