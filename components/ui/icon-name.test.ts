import { describe, expect, it } from "vitest";

import { resolveIconName } from "./icon-name";

describe("resolveIconName", () => {
  it("accepts valid Lucide names as-is", () => {
    expect(resolveIconName("WashingMachine", "Zap")).toBe("WashingMachine");
  });

  it("maps legacy lowercase values used by older content", () => {
    expect(resolveIconName("zap", "Cpu")).toBe("Zap");
    expect(resolveIconName("shovel", "Cpu")).toBe("Shovel");
  });

  it("converts kebab-case to PascalCase", () => {
    expect(resolveIconName("circuit-board", "Zap")).toBe("CircuitBoard");
  });

  it("falls back for unknown or empty values", () => {
    expect(resolveIconName("not-an-icon", "Zap")).toBe("Zap");
    expect(resolveIconName(undefined, "Award")).toBe("Award");
  });
});
