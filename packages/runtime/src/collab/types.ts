/**
 * Real-time collaboration primitives for Phoenix OS runtime.
 * ADR-007: interface only; stub/in-memory for now; WebSockets/Supabase later.
 */

export type RoomId = string;

export interface PresenceEntry {
  userId?: string;
  runId?: string;
  updatedAt: number;
}

export type PresenceMap = Map<string, PresenceEntry>;

export type CollabEvent = { type: string; payload?: unknown };

/**
 * Collaboration primitives: presence, broadcast, subscribe.
 * Implementations: in-memory stub now; real-time backend later.
 */
export interface ICollabPrimitives {
  presence(workflowRunId?: string): PresenceMap;
  broadcast(room: RoomId, event: CollabEvent): void;
  subscribe(room: RoomId, handler: (event: CollabEvent) => void): () => void;
}
