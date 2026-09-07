"use client";

import type { CSSProperties, ReactNode } from "react";
import { useEffect, useRef } from "react";

import { BORDER_OFFSET, MAX_DPR } from "./electric-draw";
import { createElectricRenderer } from "./electric-renderer";

interface ElectricBorderProps {
  children: ReactNode;
  color?: string;
  speed?: number;
  chaos?: number;
  borderRadius?: number;
  className?: string;
  style?: CSSProperties;
}

function prefersReducedMotion(): boolean {
  return (
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches
  );
}

function currentDpr(): number {
  return Math.min(window.devicePixelRatio || 1, MAX_DPR);
}

export function ElectricBorder({
  children,
  color = "#5227FF",
  speed = 1,
  chaos = 0.12,
  borderRadius = 24,
  className,
  style,
}: ElectricBorderProps) {
  const canvasHostRef = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const host = canvasHostRef.current;
    const container = containerRef.current;
    if (!host || !container) return;

    // The canvas is created per effect run: once a canvas has been handed to
    // a worker (transferControlToOffscreen) it cannot be reused, and React's
    // StrictMode re-runs effects in development.
    const canvas = document.createElement("canvas");
    canvas.style.display = "block";
    canvas.style.willChange = "transform";
    host.appendChild(canvas);

    const measure = () => {
      const rect = container.getBoundingClientRect();
      const width = rect.width + BORDER_OFFSET * 2;
      const height = rect.height + BORDER_OFFSET * 2;
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      return { width, height, dpr: currentDpr() };
    };

    const renderer = createElectricRenderer(canvas, {
      ...measure(),
      color,
      speed,
      chaos,
      borderRadius,
      static: prefersReducedMotion(),
    });
    if (!renderer) {
      host.removeChild(canvas);
      return;
    }

    let isVisible = true;
    const sync = () => (isVisible && !document.hidden ? renderer.resume() : renderer.pause());

    const resizeObserver = new ResizeObserver(() => {
      const { width, height, dpr } = measure();
      renderer.resize(width, height, dpr);
    });
    resizeObserver.observe(container);

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        sync();
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(container);
    document.addEventListener("visibilitychange", sync);

    return () => {
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", sync);
      renderer.dispose();
      host.removeChild(canvas);
    };
  }, [color, speed, chaos, borderRadius]);

  const containerStyle: CSSProperties = {
    position: "relative",
    borderRadius,
    overflow: "visible",
    isolation: "isolate",
    ...style,
  };

  return (
    <div ref={containerRef} className={className} style={containerStyle}>
      <div
        ref={canvasHostRef}
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      <div
        style={{ position: "absolute", inset: 0, borderRadius, pointerEvents: "none", zIndex: 0 }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius,
            border: `2px solid ${color}99`,
            filter: "blur(1px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius,
            border: `2px solid ${color}`,
            filter: "blur(4px)",
          }}
        />
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius,
            zIndex: -1,
            transform: "scale(1.1)",
            filter: "blur(32px)",
            opacity: 0.25,
            background: `linear-gradient(-30deg, ${color}, transparent, ${color}66)`,
          }}
        />
      </div>

      <div style={{ position: "relative", borderRadius, zIndex: 1, height: "100%" }}>
        {children}
      </div>
    </div>
  );
}
