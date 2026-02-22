"use client";

import { Moon, Sun } from "lucide-react";
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
      className={cn(
        "text-foreground hover:bg-accent inline-flex h-9 w-9 items-center justify-center rounded-md transition-colors",
        className,
      )}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
    </button>
  );
}
