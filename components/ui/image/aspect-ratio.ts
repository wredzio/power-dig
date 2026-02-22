export type AspectRatioString = "3/4" | "9/16" | "16/9" | "1/1" | "4/3" | "3/2" | "2/3";

export type AspectRatio = AspectRatioString | { width: number; height: number };

export function parseAspectRatio(ratio: AspectRatio): number {
  if (typeof ratio === "object") {
    return ratio.height / ratio.width;
  }

  const [w, h] = ratio.split("/").map(Number);
  return h / w;
}

export function computeHeight(width: number, aspectRatio: AspectRatio): number {
  return Math.round(width * parseAspectRatio(aspectRatio));
}
