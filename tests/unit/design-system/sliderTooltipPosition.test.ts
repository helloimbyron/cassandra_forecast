import { afterEach, describe, expect, it, vi } from "vitest";
import { sliderTooltipPosition } from "../../../src/design-system/utils/sliderTooltipPosition.util";

afterEach(() => vi.unstubAllGlobals());

describe("sliderTooltipPosition", () => {
  it("keeps the current 20px-thumb offsets at each end and in the middle", () => {
    vi.stubGlobal("document", { documentElement: {} });
    vi.stubGlobal("getComputedStyle", () => ({
      getPropertyValue: () => "1.25rem",
      fontSize: "16px",
    }));

    expect(sliderTooltipPosition(0)).toBe("calc(0% + 10px)");
    expect(sliderTooltipPosition(0.5)).toBe("calc(50% + 0px)");
    expect(sliderTooltipPosition(1)).toBe("calc(100% + -10px)");
  });

  it("tracks a changed root font size without a second authored size", () => {
    vi.stubGlobal("document", { documentElement: {} });
    vi.stubGlobal("getComputedStyle", () => ({
      getPropertyValue: () => "1.25rem",
      fontSize: "20px",
    }));

    expect(sliderTooltipPosition(0)).toBe("calc(0% + 12.5px)");
    expect(sliderTooltipPosition(1)).toBe("calc(100% + -12.5px)");
  });
});
