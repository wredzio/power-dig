/** Deterministic pseudo-random in [−1, 1) derived from a seed. */
function random(x: number): number {
  return (Math.sin(x * 12.9898) * 43758.5453) % 1;
}

function noise2D(x: number, y: number): number {
  const i = Math.floor(x);
  const j = Math.floor(y);
  const fx = x - i;
  const fy = y - j;

  const a = random(i + j * 57);
  const b = random(i + 1 + j * 57);
  const c = random(i + (j + 1) * 57);
  const d = random(i + 1 + (j + 1) * 57);

  const ux = fx * fx * (3.0 - 2.0 * fx);
  const uy = fy * fy * (3.0 - 2.0 * fy);

  return a * (1 - ux) * (1 - uy) + b * ux * (1 - uy) + c * (1 - ux) * uy + d * ux * uy;
}

/** Fractal (octaved) 1D noise animated over time; first octave is flattened. */
export function octavedNoise(
  x: number,
  octaves: number,
  lacunarity: number,
  gain: number,
  baseAmplitude: number,
  baseFrequency: number,
  time: number,
  seed: number,
): number {
  // The first octave is flattened to zero (baseFlatness = 0 in the original
  // effect), so it is skipped instead of computed and multiplied by 0.
  let y = 0;
  let amplitude = baseAmplitude * gain;
  let frequency = baseFrequency * lacunarity;
  for (let i = 1; i < octaves; i++) {
    y += amplitude * noise2D(frequency * x + seed * 100, time * frequency * 0.3);
    frequency *= lacunarity;
    amplitude *= gain;
  }
  return y;
}

interface Point {
  x: number;
  y: number;
}

function cornerPoint(
  centerX: number,
  centerY: number,
  radius: number,
  startAngle: number,
  arcLength: number,
  progress: number,
): Point {
  const angle = startAngle + progress * arcLength;
  return { x: centerX + radius * Math.cos(angle), y: centerY + radius * Math.sin(angle) };
}

/** Point at fraction `t` (0..1) along the perimeter of a rounded rectangle. */
export function getRoundedRectPoint(
  t: number,
  left: number,
  top: number,
  width: number,
  height: number,
  radius: number,
): Point {
  const straightWidth = width - 2 * radius;
  const straightHeight = height - 2 * radius;
  const cornerArc = (Math.PI * radius) / 2;
  const perimeter = 2 * straightWidth + 2 * straightHeight + 4 * cornerArc;
  let distance = t * perimeter;

  const segments: Array<{ length: number; at: (p: number) => Point }> = [
    { length: straightWidth, at: (p) => ({ x: left + radius + p * straightWidth, y: top }) },
    {
      length: cornerArc,
      at: (p) =>
        cornerPoint(left + width - radius, top + radius, radius, -Math.PI / 2, Math.PI / 2, p),
    },
    {
      length: straightHeight,
      at: (p) => ({ x: left + width, y: top + radius + p * straightHeight }),
    },
    {
      length: cornerArc,
      at: (p) =>
        cornerPoint(left + width - radius, top + height - radius, radius, 0, Math.PI / 2, p),
    },
    {
      length: straightWidth,
      at: (p) => ({ x: left + width - radius - p * straightWidth, y: top + height }),
    },
    {
      length: cornerArc,
      at: (p) =>
        cornerPoint(left + radius, top + height - radius, radius, Math.PI / 2, Math.PI / 2, p),
    },
    {
      length: straightHeight,
      at: (p) => ({ x: left, y: top + height - radius - p * straightHeight }),
    },
    {
      length: cornerArc,
      at: (p) => cornerPoint(left + radius, top + radius, radius, Math.PI, Math.PI / 2, p),
    },
  ];

  for (const segment of segments) {
    if (distance <= segment.length)
      return segment.at(segment.length === 0 ? 0 : distance / segment.length);
    distance -= segment.length;
  }
  return segments[segments.length - 1].at(1);
}
