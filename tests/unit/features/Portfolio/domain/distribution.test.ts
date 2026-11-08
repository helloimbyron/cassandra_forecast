import { describe, expect, it } from "vitest";
import {
  estimateAdditionalDepletionMonths,
  estimateAdditionalPortfolioDepletionMonths,
  simulateDistribution,
  simulatePortfolioDistribution,
} from "../../../../../src/features/Portfolio";
import { distributionAssetsWithReturn } from "@/features/Portfolio/domain/utils/distributionAssetsWithReturn.util";
import { annualRateForMonthlyWithdrawal } from "@/features/Portfolio/domain/utils/annualRateForMonthlyWithdrawal.util";
import { monthlyWithdrawalForAnnualRate } from "@/features/Portfolio/domain/utils/monthlyWithdrawalForAnnualRate.util";
import { selectedDistributionAnnualReturnPct } from "@/features/Portfolio/domain/utils/selectedDistributionAnnualReturnPct.util";
import { weightedEffectiveAnnualReturnPct } from "@/features/Portfolio/domain/utils/weightedEffectiveAnnualReturnPct.util";
import { withdrawalRateSliderMax } from "@/features/Portfolio/domain/utils/withdrawalRateSliderMax.util";
import { copy } from "@/features/Portfolio/presentation/constants/DistributionSection.constant";

describe("retirement distribution projection", () => {
  it("returns only the starting balance when the selected horizon is zero", () => {
    expect(simulateDistribution(1_000, 50, 6.13, 0)).toEqual({
      points: [{ year: 0, balance: 1_000 }],
      finalBalance: 1_000,
      depletionMonth: null,
    });
  });

  it("marks a zero starting balance as depleted from the start", () => {
    expect(simulateDistribution(0, 0, 0, 1)).toMatchObject({
      points: [
        { year: 0, balance: 0 },
        { year: 1, balance: 0 },
      ],
      finalBalance: 0,
      depletionMonth: 0,
    });
  });

  it("compounds the effective annual return when there are no withdrawals", () => {
    const result = simulateDistribution(1_000, 0, 12, 1);
    expect(result.finalBalance).toBeCloseTo(1_120, 8);
    expect(result.points).toHaveLength(2);
    expect(result.depletionMonth).toBeNull();
  });

  it("applies a negative annual return over the selected period", () => {
    const result = simulateDistribution(1_000, 0, -20, 1);
    expect(result.finalBalance).toBeCloseTo(800, 8);
  });

  it("applies fixed monthly withdrawals after growth and returns the year-end balance", () => {
    const result = simulateDistribution(1_000, 50, 0, 1);
    expect(result.points).toEqual([
      { year: 0, balance: 1_000 },
      { year: 1, balance: 400 },
    ]);
    expect(result.finalBalance).toBe(400);
    expect(result.depletionMonth).toBeNull();
  });

  it("clamps the balance to zero and records the first depletion month", () => {
    const result = simulateDistribution(100, 30, 0, 2);
    expect(result.depletionMonth).toBe(4);
    expect(result.points).toEqual([
      { year: 0, balance: 100 },
      { year: 1, balance: 0 },
      { year: 2, balance: 0 },
    ]);
    expect(result.finalBalance).toBe(0);
  });

  it("rejects invalid balances, rates, withdrawals, and horizons", () => {
    expect(() => simulateDistribution(-1, 0, 0, 1)).toThrow(RangeError);
    expect(() => simulateDistribution(100, -1, 0, 1)).toThrow(RangeError);
    expect(() => simulateDistribution(100, 0, -100, 1)).toThrow(RangeError);
    expect(() => simulateDistribution(100, 0, 0, 1.5)).toThrow(RangeError);
    expect(() => simulateDistribution(100, 0, 0, 41)).toThrow(RangeError);
  });
});

describe("position-level retirement distribution", () => {
  it("applies each investment's own effective annual return before proportional withdrawals", () => {
    const assets = [
      { balance: 1_000, annualReturnPct: 0 },
      { balance: 1_000, annualReturnPct: 12 },
    ];
    let expectedBalances = [1_000, 1_000];
    const monthlyWithdrawal = 100;

    for (let month = 1; month <= 12; month += 1) {
      const grownBalances = [expectedBalances[0]!, expectedBalances[1]! * Math.pow(1.12, 1 / 12)];
      const available = grownBalances.reduce((sum, balance) => sum + balance, 0);
      const remainingShare = (available - monthlyWithdrawal) / available;
      expectedBalances = grownBalances.map((balance) => balance * remainingShare);
    }

    const result = simulatePortfolioDistribution(assets, monthlyWithdrawal, 1);
    expect(result.finalBalance).toBeCloseTo(
      expectedBalances.reduce((sum, value) => sum + value, 0),
      8,
    );
    expect(result.finalAssets[0]?.balance).toBeCloseTo(expectedBalances[0]!, 8);
    expect(result.finalAssets[1]?.balance).toBeCloseTo(expectedBalances[1]!, 8);
    expect(result.depletionMonth).toBeNull();
  });

  it("preserves each effective annual return when no withdrawals are made", () => {
    const result = simulatePortfolioDistribution(
      [
        { balance: 1_000, annualReturnPct: 0 },
        { balance: 1_000, annualReturnPct: 12 },
      ],
      0,
      1,
    );

    expect(result.finalBalance).toBeCloseTo(2_120, 8);
    expect(result.finalAssets[0]?.balance).toBeCloseTo(1_000, 8);
    expect(result.finalAssets[1]?.balance).toBeCloseTo(1_120, 8);
  });

  it("finds depletion month across positions and estimates additional months", () => {
    const assets = [
      { balance: 100, annualReturnPct: 0 },
      { balance: 0, annualReturnPct: 12 },
    ];
    const result = simulatePortfolioDistribution(assets, 30, 1);

    expect(result.depletionMonth).toBe(4);
    expect(estimateAdditionalPortfolioDepletionMonths(assets, 30)).toBe(4);
  });

  it("rejects invalid position balances, returns, withdrawals, and horizons", () => {
    expect(() =>
      simulatePortfolioDistribution([{ balance: -1, annualReturnPct: 0 }], 0, 1),
    ).toThrow(RangeError);
    expect(() =>
      simulatePortfolioDistribution([{ balance: 1, annualReturnPct: -100 }], 0, 1),
    ).toThrow(RangeError);
    expect(() => simulatePortfolioDistribution([], -1, 1)).toThrow(RangeError);
    expect(() => simulatePortfolioDistribution([], 0, 41)).toThrow(RangeError);
  });
});

describe("additional distribution duration", () => {
  it("estimates additional months after the selected horizon", () => {
    expect(estimateAdditionalDepletionMonths(1_000, 50, 0)).toBe(20);
  });

  it("includes growth when estimating the additional duration", () => {
    const result = estimateAdditionalDepletionMonths(1_000, 50, 6.13);
    expect(result).toBeGreaterThan(20);

    let balance = 1_000;
    const monthlyRate = Math.pow(1 + 6.13 / 100, 1 / 12) - 1;
    let month = 0;
    while (balance > 0 && month < 1_000) {
      balance = Math.max(0, balance * (1 + monthlyRate) - 50);
      month += 1;
    }
    expect(result).toBe(month);
  });

  it("returns no finite duration when withdrawals are zero or growth sustains them", () => {
    expect(estimateAdditionalDepletionMonths(1_000, 0, -10)).toBeNull();
    expect(estimateAdditionalDepletionMonths(1_000, 10, 20)).toBeNull();
  });

  it("handles zero balance and invalid parameters", () => {
    expect(estimateAdditionalDepletionMonths(0, 10, 5)).toBe(0);
    expect(() => estimateAdditionalDepletionMonths(-1, 0, 5)).toThrow(RangeError);
    expect(() => estimateAdditionalDepletionMonths(100, -1, 5)).toThrow(RangeError);
    expect(() => estimateAdditionalDepletionMonths(100, 1, -100)).toThrow(RangeError);
  });
});

describe("withdrawal mode conversions", () => {
  it("converts a fixed monthly amount into its equivalent annual percentage", () => {
    expect(annualRateForMonthlyWithdrawal(100, 30_000)).toBe(4);
  });

  it("converts an annual percentage into its equivalent monthly amount", () => {
    expect(monthlyWithdrawalForAnnualRate(4, 30_000)).toBe(100);
  });

  it("preserves a monthly amount when switching modes if the selected rate is representable", () => {
    const selectedMonthlyAmount = 500;
    const total = 50_000;
    const annualRate = annualRateForMonthlyWithdrawal(selectedMonthlyAmount, total);
    expect(monthlyWithdrawalForAnnualRate(annualRate, total)).toBe(selectedMonthlyAmount);
  });

  it("uses zero rate when no projected capital exists", () => {
    expect(annualRateForMonthlyWithdrawal(500, 0)).toBe(0);
    expect(monthlyWithdrawalForAnnualRate(4, 0)).toBe(0);
  });

  it("keeps 20 percent as the usual slider maximum, expanding to preserve a higher equivalent rate", () => {
    expect(withdrawalRateSliderMax(6.13)).toBe(20);
    expect(withdrawalRateSliderMax(20.1)).toBe(20.25);
  });
});

describe("retirement return assumption", () => {
  it("uses the portfolio annualized return for the active nominal or real mode", () => {
    const nominalTir = 5.25;
    const realTir = 2.61;

    expect(selectedDistributionAnnualReturnPct(nominalTir, null)).toBe(nominalTir);
    expect(selectedDistributionAnnualReturnPct(realTir, null)).toBe(realTir);
  });

  it("uses the same selected TIR or manual rate for every investment in the distribution", () => {
    const positions = [{ balance: 1_000 }, { balance: 3_000 }];
    const defaultReturn = selectedDistributionAnnualReturnPct(2.61, null);
    const manualReturn = selectedDistributionAnnualReturnPct(2.61, 4.5);

    expect(distributionAssetsWithReturn(positions, defaultReturn)).toEqual([
      { balance: 1_000, annualReturnPct: 2.61 },
      { balance: 3_000, annualReturnPct: 2.61 },
    ]);
    expect(distributionAssetsWithReturn(positions, manualReturn)).toEqual([
      { balance: 1_000, annualReturnPct: 4.5 },
      { balance: 3_000, annualReturnPct: 4.5 },
    ]);
  });

  it("falls back to zero when no portfolio TIR can be calculated", () => {
    expect(selectedDistributionAnnualReturnPct(null, null)).toBe(0);
    expect(copy.noCalculatedReturn).toContain("0 %");
  });

  it("explains the current percentage for calculated and manual distribution returns", () => {
    expect(copy.portfolioReturnExplanation("2,61 %", 20, true)).toContain(
      "La tasa anual es 2,61 %, porque corresponde a la rentabilidad anualizada (TIR) de toda tu cartera durante 20 años",
    );
    expect(copy.portfolioReturnExplanation("5,25 %", 1, false)).not.toContain(
      "descuenta la inflación",
    );
    expect(copy.manualReturnExplanation("4,50 %")).toContain(
      "La tasa anual es 4,50 %, porque la elegiste para este escenario de retiro",
    );
  });

  it("weights the starting retirement return by projected position balances", () => {
    expect(
      weightedEffectiveAnnualReturnPct([
        { balance: 1_000, annualReturnPct: 0 },
        { balance: 3_000, annualReturnPct: 8 },
      ]),
    ).toBe(6);
    expect(weightedEffectiveAnnualReturnPct([{ balance: 0, annualReturnPct: 8 }])).toBeNull();
  });

  it("rejects invalid return positions", () => {
    expect(() => weightedEffectiveAnnualReturnPct([{ balance: -1, annualReturnPct: 5 }])).toThrow(
      RangeError,
    );
    expect(() => weightedEffectiveAnnualReturnPct([{ balance: 1, annualReturnPct: -100 }])).toThrow(
      RangeError,
    );
  });
});
