/**
 * PoolAllocator — simple fixed-size block pool for kernel-managed buffers.
 * ADR-006: in-memory implementation; "memory" is JS objects (buffers).
 */
let handleCounter = 0;
function nextHandle() {
    handleCounter += 1;
    return `mem${handleCounter}`;
}
/**
 * Allocates fixed-size blocks from a pre-allocated pool. Good for message payloads or small buffers.
 */
export class PoolAllocator {
    slots = [];
    handleToIndex = new Map();
    blockSize;
    maxBlocks;
    constructor(blockSize, maxBlocks) {
        this.blockSize = Math.max(1, blockSize);
        this.maxBlocks = Math.max(1, maxBlocks);
        this.grow(1);
    }
    grow(count) {
        const toAdd = Math.min(Math.max(count, 1), this.maxBlocks - this.slots.length);
        for (let i = 0; i < toAdd && this.slots.length < this.maxBlocks; i++) {
            const handle = nextHandle();
            const slot = {
                handle,
                inUse: false,
                buffer: new Uint8Array(this.blockSize),
            };
            const idx = this.slots.length;
            this.slots.push(slot);
            this.handleToIndex.set(handle, idx);
        }
    }
    allocate(size) {
        if (size > this.blockSize)
            return undefined;
        let free = this.slots.find((s) => !s.inUse);
        if (!free && this.slots.length < this.maxBlocks) {
            this.grow(1);
            free = this.slots.find((s) => !s.inUse);
        }
        if (!free)
            return undefined;
        free.inUse = true;
        return free.handle;
    }
    free(handle) {
        const idx = this.handleToIndex.get(handle);
        if (idx === undefined)
            return false;
        const slot = this.slots[idx];
        if (!slot.inUse)
            return false;
        slot.inUse = false;
        return true;
    }
    /**
     * Get the buffer for a handle. Caller must not use after free(). Kernel-internal.
     */
    getBuffer(handle) {
        const idx = this.handleToIndex.get(handle);
        if (idx === undefined)
            return undefined;
        const slot = this.slots[idx];
        if (!slot.inUse)
            return undefined;
        return slot.buffer;
    }
    reclaim() {
        // No compaction for this simple pool; could defrag in a future impl.
    }
}
//# sourceMappingURL=PoolAllocator.js.map