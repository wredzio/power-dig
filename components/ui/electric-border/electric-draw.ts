import { getRoundedRectPoint, octavedNoise } from "./electric-noise";

export type Canvas2D = CanvasRenderingContext2D | OffscreenCanvasRenderingContext2D;

export interface ElectricBorderConfig {
  color: string;
  speed: number;
  chaos: number;
  borderRadius: number;
}

export interface ElectricFrame extends ElectricBorderConfig {
  /** Canvas size in CSS px (already including BORDER_OFFSET on each side). */
  width: number;
  height: number;
  dpr: number;
  time: number;
}

export const OCTAVES = 6;
export const LACUNARITY = 1.6;
export const GAIN = 0.7;
export const FREQUENCY = 10;
export const DISPLACEMENT = 60;
// Max displacement is Σ(chaos·0.7^i)·60 ≈ 25px for chaos 0.14, so 40px of
// canvas margin keeps the whole bolt inside while shrinking the bitmap that
// is cleared and composited every frame.
export const BORDER_OFFSET = 40;
// Distance between path samples in CSS px. 3px is below the visual
// resolution of a 1.5px noisy stroke, and a third cheaper than 2px.
export const SAMPLE_SPACING = 3;
export const MAX_DPR = 2;
export const TARGET_FPS = 30;
export const FRAME_INTERVAL_MS = 1000 / TARGET_FPS;

/** Draws one frame of the electric border. Shared by the worker and the main-thread fallback. */
export function drawElectricFrame(ctx: Canvas2D, frame: ElectricFrame): void {
  const { width, height, dpr, color, chaos, borderRadius, time } = frame;
  ctx.setTransform(1, 0, 0, 1, 0, 0);
  ctx.clearRect(0, 0, width * dpr, height * dpr);
  ctx.scale(dpr, dpr);
  ctx.strokeStyle = color;
  ctx.lineWidth = 1.5;
  ctx.lineCap = "round";
  ctx.lineJoin = "round";

  const borderWidth = width - 2 * BORDER_OFFSET;
  const borderHeight = height - 2 * BORDER_OFFSET;
  const radius = Math.min(borderRadius, Math.min(borderWidth, borderHeight) / 2);
  const perimeter = 2 * (borderWidth + borderHeight) + 2 * Math.PI * radius;
  const sampleCount = Math.max(16, Math.floor(perimeter / SAMPLE_SPACING));

  ctx.beginPath();
  for (let i = 0; i <= sampleCount; i++) {
    const progress = i / sampleCount;
    const point = getRoundedRectPoint(
      progress,
      BORDER_OFFSET,
      BORDER_OFFSET,
      borderWidth,
      borderHeight,
      radius,
    );
    const xNoise = octavedNoise(progress * 8, OCTAVES, LACUNARITY, GAIN, chaos, FREQUENCY, time, 0);
    const yNoise = octavedNoise(progress * 8, OCTAVES, LACUNARITY, GAIN, chaos, FREQUENCY, time, 1);
    const x = point.x + xNoise * DISPLACEMENT;
    const y = point.y + yNoise * DISPLACEMENT;
    if (i === 0) ctx.moveTo(x, y);
    else ctx.lineTo(x, y);
  }
  ctx.closePath();
  ctx.stroke();
}
