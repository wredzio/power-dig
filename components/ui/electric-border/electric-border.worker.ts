import { drawElectricFrame, type ElectricBorderConfig, FRAME_INTERVAL_MS } from "./electric-draw";

/**
 * Renders every ElectricBorder on the page off the main thread. One worker
 * instance is shared; each border registers its OffscreenCanvas here.
 */

export type WorkerMessage =
  | ({
      type: "register";
      id: number;
      canvas: OffscreenCanvas;
      width: number;
      height: number;
      dpr: number;
    } & ElectricBorderConfig)
  | { type: "resize"; id: number; width: number; height: number; dpr: number }
  | { type: "pause"; id: number }
  | { type: "resume"; id: number }
  | { type: "dispose"; id: number };

interface Entry extends ElectricBorderConfig {
  ctx: OffscreenCanvasRenderingContext2D;
  canvas: OffscreenCanvas;
  width: number;
  height: number;
  dpr: number;
  time: number;
  running: boolean;
}

const entries = new Map<number, Entry>();
let lastTick = 0;
let scheduled = false;

const scope = self as unknown as {
  onmessage: ((e: MessageEvent<WorkerMessage>) => void) | null;
};

function schedule(): void {
  if (scheduled) return;
  scheduled = true;
  if (typeof requestAnimationFrame === "function") requestAnimationFrame(tick);
  else setTimeout(() => tick(performance.now()), FRAME_INTERVAL_MS);
}

function tick(now: number): void {
  scheduled = false;
  let anyRunning = false;
  entries.forEach((entry) => {
    if (entry.running) anyRunning = true;
  });
  if (!anyRunning) {
    lastTick = 0;
    return;
  }
  schedule();
  if (lastTick !== 0 && now - lastTick < FRAME_INTERVAL_MS - 1) return;
  const delta = lastTick === 0 ? 0 : (now - lastTick) / 1000;
  lastTick = now;

  entries.forEach((entry) => {
    if (!entry.running) return;
    entry.time += delta * entry.speed;
    drawElectricFrame(entry.ctx, entry);
  });
}

function applySize(entry: Entry, width: number, height: number, dpr: number): void {
  entry.width = width;
  entry.height = height;
  entry.dpr = dpr;
  entry.canvas.width = Math.max(1, Math.round(width * dpr));
  entry.canvas.height = Math.max(1, Math.round(height * dpr));
}

scope.onmessage = (event) => {
  const msg = event.data;
  switch (msg.type) {
    case "register": {
      const ctx = msg.canvas.getContext("2d");
      if (!ctx) return;
      const entry: Entry = {
        ctx,
        canvas: msg.canvas,
        color: msg.color,
        speed: msg.speed,
        chaos: msg.chaos,
        borderRadius: msg.borderRadius,
        width: msg.width,
        height: msg.height,
        dpr: msg.dpr,
        time: 0,
        running: true,
      };
      applySize(entry, msg.width, msg.height, msg.dpr);
      entries.set(msg.id, entry);
      drawElectricFrame(ctx, entry);
      schedule();
      return;
    }
    case "resize": {
      const entry = entries.get(msg.id);
      if (!entry) return;
      applySize(entry, msg.width, msg.height, msg.dpr);
      drawElectricFrame(entry.ctx, entry);
      return;
    }
    case "pause": {
      const entry = entries.get(msg.id);
      if (entry) entry.running = false;
      return;
    }
    case "resume": {
      const entry = entries.get(msg.id);
      if (!entry) return;
      entry.running = true;
      schedule();
      return;
    }
    case "dispose":
      entries.delete(msg.id);
      return;
  }
};
