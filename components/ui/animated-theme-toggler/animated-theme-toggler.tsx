"use client";

import { useCallback, useSyncExternalStore } from "react";

import { cn } from "@/lib/utils";

function subscribe(callback: () => void) {
  const observer = new MutationObserver(callback);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
  return () => observer.disconnect();
}

function getSnapshot() {
  return !document.documentElement.classList.contains("light");
}

function getServerSnapshot() {
  return true;
}

export function AnimatedThemeToggler({ className }: { className?: string }) {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const toggle = useCallback(() => {
    const next = !isDark;
    if (document.startViewTransition) {
      document.startViewTransition(() => {
        document.documentElement.classList.toggle("light", !next);
      });
    } else {
      document.documentElement.classList.toggle("light", !next);
    }
  }, [isDark]);

  return (
    <button
      onClick={toggle}
      className={cn("group relative flex flex-col items-center select-none", className)}
      aria-label={isDark ? "Przełącz na tryb jasny" : "Przełącz na tryb ciemny"}
      title={isDark ? "Tryb jasny" : "Tryb ciemny"}
    >
      {/* ── Outer plate (wall plate) ── */}
      <div
        style={{
          width: 38,
          height: 52,
          borderRadius: 4,
          padding: 3,
          backgroundColor: isDark ? "#1c1c1c" : "#d8d2c8",
          boxShadow: isDark
            ? "0 2px 6px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.06)"
            : "0 2px 6px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.6)",
          border: isDark ? "1px solid #2e2e2e" : "1px solid #bab4aa",
          transition: "all 0.35s ease",
          perspective: 120,
        }}
      >
        {/* ── Rocker lever ── */}
        <div
          style={{
            width: "100%",
            height: "100%",
            borderRadius: 2,
            transformStyle: "preserve-3d",
            transform: isDark ? "rotateX(22deg)" : "rotateX(-22deg)",
            transition: "transform 0.28s cubic-bezier(0.34,1.56,0.64,1)",
            position: "relative",
            cursor: "pointer",
          }}
        >
          {/* Top half (I side) */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "50%",
              borderRadius: "2px 2px 0 0",
              backgroundColor: isDark ? "#C87722" : "#b0aa9e",
              boxShadow: isDark
                ? "inset 0 -1px 0 rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)"
                : "inset 0 -1px 0 rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.35s ease",
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontWeight: 900,
                letterSpacing: "0.05em",
                color: isDark ? "#0A0A0A" : "#888",
                fontFamily: "var(--font-lato), system-ui, sans-serif",
                lineHeight: 1,
                userSelect: "none",
              }}
            >
              I
            </span>
          </div>

          {/* Divider line */}
          <div
            style={{
              position: "absolute",
              top: "50%",
              left: 0,
              right: 0,
              height: 1,
              backgroundColor: isDark ? "rgba(0,0,0,0.5)" : "rgba(0,0,0,0.15)",
              zIndex: 2,
            }}
          />

          {/* Bottom half (O side) */}
          <div
            style={{
              position: "absolute",
              bottom: 0,
              left: 0,
              right: 0,
              height: "50%",
              borderRadius: "0 0 2px 2px",
              backgroundColor: isDark ? "#333" : "#C87722",
              boxShadow: isDark
                ? "inset 0 1px 0 rgba(0,0,0,0.4), inset 0 -1px 0 rgba(255,255,255,0.05)"
                : "inset 0 1px 0 rgba(0,0,0,0.15), inset 0 -1px 0 rgba(255,255,255,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.35s ease",
            }}
          >
            <span
              style={{
                fontSize: 10,
                fontWeight: 900,
                letterSpacing: "0.05em",
                color: isDark ? "#555" : "#0A0A0A",
                fontFamily: "var(--font-lato), system-ui, sans-serif",
                lineHeight: 1,
                userSelect: "none",
              }}
            >
              O
            </span>
          </div>
        </div>
      </div>

    </button>
  );
}
