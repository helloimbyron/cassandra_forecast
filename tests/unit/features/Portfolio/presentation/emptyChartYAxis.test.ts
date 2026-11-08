import { describe, expect, it } from "vitest";
import { getEmptyYAxisProps } from "../../../../../src/features/Portfolio/presentation/utils/getEmptyYAxisProps.util";
import { areChartSeriesHidden } from "../../../../../src/features/Portfolio/presentation/utils/areChartSeriesHidden.util";

describe("empty chart Y axis props", () => {
  it("uses a fixed zero tick and allows the literal domain without visible data", () => {
    expect(getEmptyYAxisProps(true)).toEqual({
      allowDataOverflow: true,
      domain: [0, 1],
      ticks: [0],
    });
  });

  it("leaves Recharts automatic domain and ticks unchanged when a series is visible", () => {
    expect(getEmptyYAxisProps(false)).toEqual({});
  });
});

describe("areChartSeriesHidden", () => {
  it("returns true when all keys used by the chart controls are hidden", () => {
    const keys = ["summary:total", "summary:invested", "investment:a", "investment:b"];

    expect(areChartSeriesHidden(new Set(keys), keys)).toBe(true);
  });

  it("keeps the chart non-empty as soon as one series becomes visible", () => {
    const keys = ["summary:total", "summary:invested", "investment:a", "investment:b"];

    expect(areChartSeriesHidden(new Set(keys.slice(1)), keys)).toBe(false);
  });
});
