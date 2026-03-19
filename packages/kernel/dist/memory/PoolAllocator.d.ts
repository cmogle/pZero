/**
 * PoolAllocator — simple fixed-size block pool for kernel-managed buffers.
 * ADR-006: in-memory implementation; "memory" is JS objects (buffers).
 */
import type { Allocator, AllocHandle } from "./types.js";
/**
 * Allocates fixed-size blocks from a pre-allocated pool. Good for message payloads or small buffers.
 */
export declare class PoolAllocator implements Allocator {
    private slots;
    private handleToIndex;
    private readonly blockSize;
    private readonly maxBlocks;
    constructor(blockSize: number, maxBlocks: number);
    private grow;
    allocate(size: number): AllocHandle | undefined;
    free(handle: AllocHandle): boolean;
    /**
     * Get the buffer for a handle. Caller must not use after free(). Kernel-internal.
     */
    getBuffer(handle: AllocHandle): Uint8Array | undefined;
    reclaim(): void;
}
//# sourceMappingURL=PoolAllocator.d.ts.map