/**
 * Memory management abstractions.
 * ADR-006: allocator interface; no raw pointers.
 */

/** Opaque handle returned by allocate(); used to free. */
export type AllocHandle = string;

export interface Allocator {
  /** Allocate a block of size bytes. Returns handle or undefined if OOM. */
  allocate(size: number): AllocHandle | undefined;
  /** Free a previously allocated block. */
  free(handle: AllocHandle): boolean;
  /** Reclaim any internal state (e.g. compact). Optional. */
  reclaim?(): void;
}
