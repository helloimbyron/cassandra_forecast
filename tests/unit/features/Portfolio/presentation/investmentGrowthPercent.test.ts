import { describe, expect, it } from "vitest";
import { getInvestmentGrowthPercent } from "../../../../../src/features/Portfolio/presentation/utils/getInvestmentGrowthPercent.util";

describe("getInvestmentGrowthPercent", () => {
  it("expresses positive, negative, and zero growth relative to current value", () => {
    expect(getInvestmentGrowthPercent(25, 100)).toBe(25);
    expect(getInvestmentGrowthPercent(-25, 100)).toBe(-25);
    expect(getInvestmentGrowthPercent(0, 100)).toBe(0);
  });

  it("returns null when there is no current value to use as the denominator", () => {
    expect(getInvestmentGrowthPercent(0, 0)).toBeNull();
    expect(getInvestmentGrowthPercent(25, 0)).toBeNull();
  });
});
