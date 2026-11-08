import { describe, expect, it } from "vitest";
import { getVisibleInvestmentTotal } from "../../../../../src/features/Portfolio/presentation/utils/getVisibleInvestmentTotal.util";

describe("getVisibleInvestmentTotal", () => {
  const row = { investmentA: 1250.5, investmentB: 240, investmentC: 9, total: 1499.5 };

  it("sums the visible investments", () => {
    expect(getVisibleInvestmentTotal(row, ["investmentA", "investmentB", "investmentC"])).toBe(
      1499.5,
    );
  });

  it("recalculates the total for a visible subset", () => {
    expect(getVisibleInvestmentTotal(row, ["investmentA", "investmentC"])).toBe(1259.5);
  });

  it("returns zero when no investments are visible", () => {
    expect(getVisibleInvestmentTotal(row, [])).toBe(0);
  });

  it("ignores missing or non-numeric row values", () => {
    expect(
      getVisibleInvestmentTotal({ investmentA: 3, investmentB: "invalid" }, [
        "investmentA",
        "missing",
        "investmentB",
      ]),
    ).toBe(3);
  });
});
