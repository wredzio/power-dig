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

/** Rocker-switch colours per theme. Light values follow the light-blue palette. */
const SWITCH_COLORS = {
  dark: {
    plate: "#1c1c1c",
    plateBorder: "#2e2e2e",
    leverOff: "#333",
    leverOn: "#C87722",
    glyphOff: "#555",
    glyphOn: "#0A0A0A",
  },
  light: {
    plate: "#cfe6ef",
    plateBorder: "#9ccbdd",
    leverOff: "#a9d2e2",
    leverOn: "#C87722",
    glyphOff: "#2f6f87",
    glyphOn: "#0A0A0A",
  },
} as const;

export function AnimatedThemeToggler({ className }: { className?: string }) {
  const isDark = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const colors = SWITCH_COLORS[isDark ? "dark" : "light"];

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
          backgroundColor: colors.plate,
          boxShadow: isDark
            ? "0 2px 6px rgba(0,0,0,0.9), inset 0 1px 0 rgba(255,255,255,0.06)"
            : "0 2px 6px rgba(0,0,0,0.35), inset 0 1px 0 rgba(255,255,255,0.6)",
          border: `1px solid ${colors.plateBorder}`,
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
              backgroundColor: isDark ? colors.leverOn : colors.leverOff,
              boxShadow: isDark
                ? "inset 0 -1px 0 rgba(0,0,0,0.4), inset 0 1px 0 rgba(255,255,255,0.2)"
                : "inset 0 -1px 0 rgba(0,0,0,0.15), inset 0 1px 0 rgba(255,255,255,0.5)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.35s ease",
            }}
          >
            {/* "I" glyph drawn as a bar so the button has no visible text */}
            <span
              aria-hidden="true"
              style={{
                display: "block",
                width: 2,
                height: 9,
                borderRadius: 1,
                backgroundColor: isDark ? colors.glyphOn : colors.glyphOff,
                transition: "background-color 0.35s ease",
              }}
            />
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
              backgroundColor: isDark ? colors.leverOff : colors.leverOn,
              boxShadow: isDark
                ? "inset 0 1px 0 rgba(0,0,0,0.4), inset 0 -1px 0 rgba(255,255,255,0.05)"
                : "inset 0 1px 0 rgba(0,0,0,0.15), inset 0 -1px 0 rgba(255,255,255,0.3)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "background-color 0.35s ease",
            }}
          >
            {/* "O" glyph drawn as a ring so the button has no visible text */}
            <span
              aria-hidden="true"
              style={{
                display: "block",
                width: 8,
                height: 8,
                borderRadius: "50%",
                border: `2px solid ${isDark ? colors.glyphOff : colors.glyphOn}`,
                transition: "border-color 0.35s ease",
              }}
            />
          </div>
        </div>
      </div>
    </button>
  );
}
