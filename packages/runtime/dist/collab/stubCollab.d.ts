/**
 * Stub collaboration primitives: in-memory only; no persistence or real-time.
 * ADR-007: API exists so callers don't break when we add WebSockets/Supabase.
 */
import type { ICollabPrimitives, RoomId, CollabEvent, PresenceMap } from "./types.js";
export declare class StubCollabPrimitives implements ICollabPrimitives {
    private handlers;
    private presenceData;
    presence(workflowRunId?: string): PresenceMap;
    broadcast(room: RoomId, event: CollabEvent): void;
    subscribe(room: RoomId, handler: (event: CollabEvent) => void): () => void;
}
//# sourceMappingURL=stubCollab.d.ts.map