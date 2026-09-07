import type { WorkerMessage } from "./electric-border.worker";
import { drawElectricFrame, type ElectricBorderConfig, FRAME_INTERVAL_MS } from "./electric-draw";

export interface ElectricRenderer {
  resize(width: number, height: number, dpr: number): void;
  pause(): void;
  resume(): void;
  dispose(): void;
}

export interface RendererOptions extends ElectricBorderConfig {
  width: number;
  height: number;
  dpr: number;
  /** Render a single static frame and never animate. */
  static: boolean;
}

let sharedWorker: Worker | null = null;
let nextId = 1;

function getSharedWorker(): Worker | null {
  if (sharedWorker) return sharedWorker;
  try {
    sharedWorker = new Worker(new URL("./electric-border.worker.ts", import.meta.url), {
      type: "module",
    });
    return sharedWorker;
  } catch {
    return null;
  }
}

function supportsOffscreen(canvas: HTMLCanvasElement): boolean {
  return (
    typeof Worker !== "undefined" &&
    typeof OffscreenCanvas !== "undefined" &&
    typeof canvas.transferControlToOffscreen === "function"
  );
}

function createWorkerRenderer(
  canvas: HTMLCanvasElement,
  options: RendererOptions,
): ElectricRenderer | null {
  const worker = getSharedWorker();
  if (!worker) return null;
  let offscreen: OffscreenCanvas;
  try {
    offscreen = canvas.transferControlToOffscreen();
  } catch {
    return null;
  }
  const id = nextId++;
  const post = (message: WorkerMessage, transfer?: Transferable[]) =>
    transfer ? worker.postMessage(message, transfer) : worker.postMessage(message);

  post(
    {
      type: "register",
      id,
      canvas: offscreen,
      width: options.width,
      height: options.height,
      dpr: options.dpr,
      color: options.color,
      speed: options.speed,
      chaos: options.chaos,
      borderRadius: options.borderRadius,
    },
    [offscreen],
  );

  return {
    resize: (width, height, dpr) => post({ type: "resize", id, width, height, dpr }),
    pause: () => post({ type: "pause", id }),
    resume: () => post({ type: "resume", id }),
    dispose: () => post({ type: "dispose", id }),
  };
}

// Main-thread fallback: one shared 30 fps loop for every border.
const mainThreadSubscribers = new Set<(now: number) => void>();
let mainThreadRaf: number | null = null;
let mainThreadLastTick = 0;

function mainThreadLoop(now: number): void {
  if (mainThreadSubscribers.size === 0) {
    mainThreadRaf = null;
    return;
  }
  mainThreadRaf = requestAnimationFrame(mainThreadLoop);
  if (now - mainThreadLastTick < FRAME_INTERVAL_MS - 1) return;
  mainThreadLastTick = now;
  mainThreadSubscribers.forEach((cb) => cb(now));
}

function createMainThreadRenderer(
  canvas: HTMLCanvasElement,
  options: RendererOptions,
): ElectricRenderer | null {
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  const frame = { ...options, time: 0 };
  let lastFrame = 0;
  let subscribed: ((now: number) => void) | null = null;

  const apply = (width: number, height: number, dpr: number) => {
    frame.width = width;
    frame.height = height;
    frame.dpr = dpr;
    canvas.width = Math.max(1, Math.round(width * dpr));
    canvas.height = Math.max(1, Math.round(height * dpr));
    drawElectricFrame(ctx, frame);
  };
  apply(options.width, options.height, options.dpr);

  const tick = (now: number) => {
    if (lastFrame !== 0) frame.time += ((now - lastFrame) / 1000) * frame.speed;
    lastFrame = now;
    drawElectricFrame(ctx, frame);
  };

  const resume = () => {
    if (subscribed || options.static) return;
    lastFrame = 0;
    subscribed = tick;
    mainThreadSubscribers.add(tick);
    if (mainThreadRaf === null) mainThreadRaf = requestAnimationFrame(mainThreadLoop);
  };
  const pause = () => {
    if (subscribed) mainThreadSubscribers.delete(subscribed);
    subscribed = null;
  };

  return { resize: apply, pause, resume, dispose: pause };
}

/**
 * Creates the renderer for one ElectricBorder canvas: a shared Web Worker with
 * OffscreenCanvas when available (no main-thread work per frame), otherwise a
 * shared main-thread loop. Static mode (reduced motion) always stays on the
 * main thread and draws once.
 */
export function createElectricRenderer(
  canvas: HTMLCanvasElement,
  options: RendererOptions,
): ElectricRenderer | null {
  if (!options.static && supportsOffscreen(canvas)) {
    const renderer = createWorkerRenderer(canvas, options);
    if (renderer) return renderer;
  }
  return createMainThreadRenderer(canvas, options);
}
