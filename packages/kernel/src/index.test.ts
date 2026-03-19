import { describe, it, expect, beforeEach } from "vitest";
import {
  KERNEL_VERSION,
  ProcessManager,
  Scheduler,
  createChannel,
  getMailbox,
  resetIPC,
  Mailbox,
  PoolAllocator,
} from "./index.js";

describe("@pzero/kernel", () => {
  it("exports a kernel version", () => {
    expect(KERNEL_VERSION).toBe("0.1.0");
  });

  describe("ProcessManager", () => {
    it("creates process in created state, start makes ready", () => {
      const pm = new ProcessManager();
      const p = pm.create({ priority: 1 });
      expect(p.state).toBe("created");
      expect(p.priority).toBe(1);
      pm.start(p.id);
      expect(pm.get(p.id)?.state).toBe("ready");
    });

    it("pause/resume and terminate", () => {
      const pm = new ProcessManager();
      const p = pm.create();
      pm.start(p.id);
      pm.resume(p.id);
      expect(pm.get(p.id)?.state).toBe("running");
      pm.pause(p.id);
      expect(pm.get(p.id)?.state).toBe("ready");
      pm.resume(p.id);
      pm.terminate(p.id);
      expect(pm.get(p.id)?.state).toBe("terminated");
    });

    it("listByState", () => {
      const pm = new ProcessManager();
      const a = pm.create();
      const b = pm.create();
      pm.start(a.id);
      expect(pm.listByState("ready")).toHaveLength(1);
      expect(pm.listByState("created")).toHaveLength(1);
    });
  });

  describe("Scheduler", () => {
    it("enqueues and yields next by priority", () => {
      const pm = new ProcessManager();
      const s = new Scheduler(pm);
      const lo = pm.create({ priority: 0 });
      const hi = pm.create({ priority: 2 });
      pm.start(lo.id);
      pm.start(hi.id);
      s.enqueue(lo.id);
      s.enqueue(hi.id);
      const next = s.next();
      expect(next).toBe(hi.id);
      expect(pm.get(hi.id)?.state).toBe("running");
    });

    it("yield puts current back and returns next", () => {
      const pm = new ProcessManager();
      const s = new Scheduler(pm);
      const a = pm.create({ priority: 1 });
      const b = pm.create({ priority: 1 });
      pm.start(a.id);
      pm.start(b.id);
      s.enqueue(a.id);
      s.enqueue(b.id);
      const first = s.next()!;
      const second = s.yield(first);
      expect(second).toBe(b.id);
      expect(pm.get(a.id)?.state).toBe("ready");
    });
  });

  describe("IPC", () => {
    beforeEach(() => resetIPC());

    it("channel sends to receiver mailbox", () => {
      const ch = createChannel<string>("sender", "receiver");
      ch.send("hello");
      const box = getMailbox<string>("receiver");
      expect(box?.receive()?.payload).toBe("hello");
      expect(box?.receive()).toBeUndefined();
    });

    it("mailbox FIFO and capacity", () => {
      const box = new Mailbox<number>(2);
      expect(box.enqueue({ from: "a", payload: 1 })).toBe(true);
      expect(box.enqueue({ from: "a", payload: 2 })).toBe(true);
      expect(box.enqueue({ from: "a", payload: 3 })).toBe(false);
      expect(box.receive()?.payload).toBe(1);
      expect(box.receive()?.payload).toBe(2);
    });
  });

  describe("PoolAllocator", () => {
    it("allocate and free", () => {
      const pool = new PoolAllocator(64, 4);
      const h1 = pool.allocate(32);
      const h2 = pool.allocate(32);
      expect(h1).toBeDefined();
      expect(h2).toBeDefined();
      expect(pool.free(h1!)).toBe(true);
      expect(pool.free(h1!)).toBe(false);
      const h3 = pool.allocate(32);
      expect(h3).toBeDefined();
    });

    it("returns undefined when size exceeds block or pool full", () => {
      const pool = new PoolAllocator(8, 2);
      expect(pool.allocate(16)).toBeUndefined();
      pool.allocate(1);
      pool.allocate(1);
      expect(pool.allocate(1)).toBeUndefined();
    });
  });
});
