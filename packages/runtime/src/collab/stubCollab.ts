/**
 * Stub collaboration primitives: in-memory only; no persistence or real-time.
 * ADR-007: API exists so callers don't break when we add WebSockets/Supabase.
 */

import type {
  ICollabPrimitives,
  RoomId,
  CollabEvent,
  PresenceMap,
  PresenceEntry,
} from "./types.js";

export class StubCollabPrimitives implements ICollabPrimitives {
  private handlers = new Map<RoomId, Set<(e: CollabEvent) => void>>();
  private presenceData = new Map<string, PresenceEntry>();

  presence(workflowRunId?: string): PresenceMap {
    const out = new Map<string, PresenceEntry>();
    for (const [k, v] of this.presenceData) {
      if (workflowRunId == null || v.runId === workflowRunId) out.set(k, v);
    }
    return out;
  }

  broadcast(room: RoomId, event: CollabEvent): void {
    const set = this.handlers.get(room);
    if (set) for (const h of set) h(event);
  }

  subscribe(room: RoomId, handler: (event: CollabEvent) => void): () => void {
    let set = this.handlers.get(room);
    if (!set) {
      set = new Set();
      this.handlers.set(room, set);
    }
    set.add(handler);
    return () => set!.delete(handler);
  }
}
