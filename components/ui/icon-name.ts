import { icons } from "lucide-react";

export type IconName = keyof typeof icons;

const LEGACY_ICON_ALIASES: Record<string, IconName> = {
  zap: "Zap",
  wrench: "Wrench",
  cpu: "Cpu",
  shovel: "Shovel",
  phone: "Phone",
  mail: "Mail",
};

function toPascalCase(value: string): string {
  return value
    .split(/[-_\s]+/)
    .filter(Boolean)
    .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
    .join("");
}

/**
 * Resolves a CMS-provided icon string to a valid Lucide icon name.
 * Accepts PascalCase names ("WashingMachine"), kebab/lower-case
 * ("washing-machine", "zap") and falls back when nothing matches.
 */
export function resolveIconName(value: string | null | undefined, fallback: IconName): IconName {
  if (!value) return fallback;
  const trimmed = value.trim();
  if (trimmed in icons) return trimmed as IconName;
  const alias = LEGACY_ICON_ALIASES[trimmed.toLowerCase()];
  if (alias) return alias;
  const pascal = toPascalCase(trimmed);
  return pascal in icons ? (pascal as IconName) : fallback;
}
