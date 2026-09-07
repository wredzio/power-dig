"use client";

import { useEffect, useRef } from "react";

export interface LightningBolt {
  hue?: number;
  xOffset?: number;
  speed?: number;
  intensity?: number;
  size?: number;
  /** Layer opacity, identical to stacking an opaque canvas with CSS `opacity`. */
  opacity?: number;
}

interface LightningProps {
  /** One or two bolts rendered in a single WebGL pass. */
  bolts: LightningBolt[];
  className?: string;
}

const MAX_BOLTS = 2;
const TARGET_FPS = 30;
const FRAME_INTERVAL_MS = 1000 / TARGET_FPS;
const IDLE_START_TIMEOUT_MS = 300;

const VERTEX_SHADER = `
  attribute vec2 aPosition;
  void main() { gl_Position = vec4(aPosition, 0.0, 1.0); }
`;

// Same noise/fbm pipeline as the original single-bolt shader. Two bolts are
// evaluated in one pass and composited exactly like two stacked opaque
// canvases with CSS opacity would be (premultiplied "over" operator), so the
// picture is pixel-equivalent while the browser handles one context and one
// compositing layer instead of two.
const FRAGMENT_SHADER = `
  precision mediump float;
  uniform vec2 iResolution;
  uniform float iTime;
  uniform int uBoltCount;
  uniform float uHue[${MAX_BOLTS}];
  uniform float uXOffset[${MAX_BOLTS}];
  uniform float uSpeed[${MAX_BOLTS}];
  uniform float uIntensity[${MAX_BOLTS}];
  uniform float uSize[${MAX_BOLTS}];
  uniform float uOpacity[${MAX_BOLTS}];

  #define OCTAVE_COUNT 6

  vec3 hsv2rgb(vec3 c) {
    vec3 rgb = clamp(abs(mod(c.x * 6.0 + vec3(0.0,4.0,2.0), 6.0) - 3.0) - 1.0, 0.0, 1.0);
    return c.z * mix(vec3(1.0), rgb, c.y);
  }

  float hash12(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * .1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  mat2 rotate2d(float theta) {
    float c = cos(theta);
    float s = sin(theta);
    return mat2(c, -s, s, c);
  }

  float noise(vec2 p) {
    vec2 ip = floor(p);
    vec2 fp = fract(p);
    float a = hash12(ip);
    float b = hash12(ip + vec2(1.0, 0.0));
    float c = hash12(ip + vec2(0.0, 1.0));
    float d = hash12(ip + vec2(1.0, 1.0));
    vec2 t = smoothstep(0.0, 1.0, fp);
    return mix(mix(a, b, t.x), mix(c, d, t.x), t.y);
  }

  float fbm(vec2 p) {
    float value = 0.0;
    float amplitude = 0.5;
    for (int i = 0; i < OCTAVE_COUNT; ++i) {
      value += amplitude * noise(p);
      p *= rotate2d(0.45);
      p *= 2.0;
      amplitude *= 0.5;
    }
    return value;
  }

  vec3 bolt(vec2 baseUv, float hue, float xOffset, float speed, float intensity, float size) {
    vec2 uv = baseUv;
    uv.x += xOffset;
    uv += 2.0 * fbm(uv * size + 0.8 * iTime * speed) - 1.0;
    float dist = abs(uv.x);
    vec3 baseColor = hsv2rgb(vec3(hue / 360.0, 0.7, 0.8));
    float glow = mix(0.02, 0.04, sin(iTime * speed * 1.2) * 0.5 + 0.5);
    return clamp(baseColor * (glow / dist) * intensity, 0.0, 1.0);
  }

  void main() {
    vec2 uv = gl_FragCoord.xy / iResolution.xy;
    uv = 2.0 * uv - 1.0;
    uv.x *= iResolution.x / iResolution.y;

    vec3 rgb = bolt(uv, uHue[0], uXOffset[0], uSpeed[0], uIntensity[0], uSize[0]) * uOpacity[0];
    float alpha = uOpacity[0];
    if (uBoltCount > 1) {
      vec3 c = bolt(uv, uHue[1], uXOffset[1], uSpeed[1], uIntensity[1], uSize[1]);
      rgb = c * uOpacity[1] + rgb * (1.0 - uOpacity[1]);
      alpha = uOpacity[1] + alpha * (1.0 - uOpacity[1]);
    }
    gl_FragColor = vec4(rgb, alpha);
  }
`;

function compileShader(gl: WebGLRenderingContext, source: string, type: number) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function scheduleIdle(callback: () => void): () => void {
  if (typeof window.requestIdleCallback === "function") {
    const id = window.requestIdleCallback(callback, { timeout: IDLE_START_TIMEOUT_MS });
    return () => window.cancelIdleCallback(id);
  }
  const id = window.setTimeout(callback, 0);
  return () => window.clearTimeout(id);
}

export function Lightning({ bolts, className }: LightningProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const boltsKey = JSON.stringify(bolts);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const config: LightningBolt[] = JSON.parse(boltsKey);
    let cleanup: (() => void) | null = null;

    // Start after hydration settles so shader compilation never competes with
    // the first interaction.
    const cancelIdle = scheduleIdle(() => {
      cleanup = start(canvas, config);
    });

    return () => {
      cancelIdle();
      cleanup?.();
    };
  }, [boltsKey]);

  return (
    <canvas
      ref={canvasRef}
      className={className}
      style={{ width: "100%", height: "100%", display: "block", willChange: "transform" }}
    />
  );
}

function start(canvas: HTMLCanvasElement, bolts: LightningBolt[]): (() => void) | null {
  const gl = canvas.getContext("webgl", {
    alpha: true,
    premultipliedAlpha: true,
    antialias: false,
  });
  if (!gl) return null;

  const vertexShader = compileShader(gl, VERTEX_SHADER, gl.VERTEX_SHADER);
  const fragmentShader = compileShader(gl, FRAGMENT_SHADER, gl.FRAGMENT_SHADER);
  if (!vertexShader || !fragmentShader) return null;

  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vertexShader);
  gl.attachShader(program, fragmentShader);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return null;
  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]), gl.STATIC_DRAW);
  const posLoc = gl.getAttribLocation(program, "aPosition");
  gl.enableVertexAttribArray(posLoc);
  gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

  const used = bolts.slice(0, MAX_BOLTS);
  const pick = (key: keyof LightningBolt, fallback: number) =>
    Array.from({ length: MAX_BOLTS }, (_, i) => used[i]?.[key] ?? fallback);
  gl.uniform1i(gl.getUniformLocation(program, "uBoltCount"), used.length);
  gl.uniform1fv(gl.getUniformLocation(program, "uHue"), pick("hue", 230));
  gl.uniform1fv(gl.getUniformLocation(program, "uXOffset"), pick("xOffset", 0));
  gl.uniform1fv(gl.getUniformLocation(program, "uSpeed"), pick("speed", 1));
  gl.uniform1fv(gl.getUniformLocation(program, "uIntensity"), pick("intensity", 1));
  gl.uniform1fv(gl.getUniformLocation(program, "uSize"), pick("size", 1));
  gl.uniform1fv(gl.getUniformLocation(program, "uOpacity"), pick("opacity", 1));
  const resolutionLoc = gl.getUniformLocation(program, "iResolution");
  const timeLoc = gl.getUniformLocation(program, "iTime");

  const reducedMotion = prefersReducedMotion();
  const startTime = performance.now();
  let lastFrame = 0;
  let rafId: number | null = null;
  let isVisible = true;

  const draw = (elapsedSeconds: number) => {
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform2f(resolutionLoc, canvas.width, canvas.height);
    gl.uniform1f(timeLoc, elapsedSeconds);
    gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
  };

  const resize = () => {
    canvas.width = canvas.clientWidth;
    canvas.height = canvas.clientHeight;
    if (reducedMotion) draw(0);
  };
  resize();
  window.addEventListener("resize", resize);

  const loop = (now: number) => {
    if (!isVisible) {
      rafId = null;
      return;
    }
    rafId = requestAnimationFrame(loop);
    if (now - lastFrame < FRAME_INTERVAL_MS - 1) return;
    lastFrame = now;
    draw((now - startTime) / 1000);
  };

  const resume = () => {
    if (rafId === null && isVisible && !reducedMotion) rafId = requestAnimationFrame(loop);
  };
  const pause = () => {
    if (rafId !== null) cancelAnimationFrame(rafId);
    rafId = null;
  };

  const observer = new IntersectionObserver(
    ([entry]) => {
      isVisible = entry.isIntersecting;
      if (isVisible) resume();
      else pause();
    },
    { threshold: 0 },
  );
  observer.observe(canvas);

  const onVisibility = () => (document.hidden ? pause() : resume());
  document.addEventListener("visibilitychange", onVisibility);

  if (reducedMotion) draw(0);
  else resume();

  return () => {
    pause();
    observer.disconnect();
    document.removeEventListener("visibilitychange", onVisibility);
    window.removeEventListener("resize", resize);
    gl.deleteProgram(program);
    gl.deleteShader(vertexShader);
    gl.deleteShader(fragmentShader);
    gl.deleteBuffer(buffer);
  };
}
