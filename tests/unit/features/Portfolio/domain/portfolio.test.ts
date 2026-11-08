import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { threeInvestmentPortfolio } from "../fixtures/threeInvestmentPortfolio";
import { PORTFOLIO_CONSTANTS } from "@/features/Portfolio/domain/constants/portfolioConstants.constant";
import { formatInflationRate } from "../../../../../src/features/Portfolio/presentation/utils/formatInflationRate.util";
import {
  getPortfolioSummaryInsights,
  portfolioInitialValue,
  portfolioSchema,
  projectHolding,
  projectInvestment,
  projectPortfolio,
  type Holding,
  type Portfolio,
  type Investment,
} from "../../../../../src/features/Portfolio";
const { INFLATION_RATE_STEP_PCT, MAX_INFLATION_RATE_PCT, MIN_INFLATION_RATE_PCT } =
  PORTFOLIO_CONSTANTS;

const examplePortfolio = portfolioSchema.parse(
  JSON.parse(
    readFileSync(new URL("../../../../../public/portfolio.example.json", import.meta.url), "utf8"),
  ),
);

describe("public example portfolio", () => {
  it("validates the stable example and sums its balances", () => {
    expect(examplePortfolio.investments).toHaveLength(8);
    expect(portfolioInitialValue(examplePortfolio)).toBe(7_000);
    expect(examplePortfolio.investments.map((investment) => investment.category)).toEqual([
      "policy",
      "policy",
      "savings",
      "etf",
      "etf",
      "commodity",
      "crypto",
      "cash",
    ]);
    expect(examplePortfolio.inflation).toMatchObject({
      annualRatePct: 2.1,
      source: { asOf: "2026-09-15" },
    });
  });

  it("accepts crypto and other categories", () => {
    const exampleBitcoin = examplePortfolio.investments.find(({ id }) => id === "bitcoin");
    expect(exampleBitcoin).toBeDefined();
    if (!exampleBitcoin) {

      return;
    }

    for (const category of ["crypto", "commodity", "cash", "savings", "other"] as const) {
      const parsed = portfolioSchema.safeParse({
        ...examplePortfolio,
        investments: [{ ...exampleBitcoin, category }],
      });
      expect(parsed.success).toBe(true);
    }
  });

  it("keeps distinct example investments and contributions", () => {
    expect(examplePortfolio.investments.map((investment) => investment.id)).toEqual([
      "plazo-fijo-banco-ecuador",
      "plazo-fijo-cooperativa-ecuador",
      "cuenta-ahorro-ecuador",
      "ftse-all-world",
      "sp500",
      "oro",
      "bitcoin",
      "dinero-efectivo",
    ]);
    expect(examplePortfolio.investments[0]?.holdings[0]).toMatchObject({
      currentValue: 1000,
      monthlyContribution: 8.33,
    });
    expect(examplePortfolio.investments[1]?.holdings[0]).toMatchObject({
      currentValue: 1000,
      monthlyContribution: 8.33,
    });
    expect(examplePortfolio.investments[2]?.holdings[0]).toMatchObject({
      currentValue: 1000,
      monthlyContribution: 0,
    });
    expect(
      examplePortfolio.investments[3]?.holdings.map(({ currentValue, monthlyContribution }) => ({
        currentValue,
        monthlyContribution,
      })),
    ).toEqual([
      { currentValue: 1000, monthlyContribution: 0 },
      { currentValue: 0, monthlyContribution: 100 },
    ]);
    expect(examplePortfolio.investments[5]?.holdings[0]).toMatchObject({
      currentValue: 1000,
      monthlyContribution: 0,
    });
    expect(examplePortfolio.investments[6]?.holdings[0]).toMatchObject({
      currentValue: 0,
      monthlyContribution: 100,
    });
    expect(examplePortfolio.investments[7]?.holdings[0]).toMatchObject({
      currentValue: 1000,
      monthlyContribution: 0,
    });
    expect(examplePortfolio.investments.map((investment) => investment.annualRatePct)).toEqual([
      4, 6, 1, 5, 5, 2, 5, 0,
    ]);
  });
});

describe("compound-interest projection", () => {
  const holding: Holding = {
    id: "test",
    label: "Prueba",
    currentValue: 100,
    monthlyContribution: 0,
  };

  it("applies the effective annual rate exactly for one year with no deposits", () => {
    expect(projectHolding(holding, 12, 1).finalValue).toBeCloseTo(112, 8);
  });

  it("adds contributions at each month-end and reports total deposits", () => {
    const result = projectHolding({ ...holding, monthlyContribution: 10 }, 0, 1);
    expect(result.finalValue).toBeCloseTo(220, 8);
    expect(result.totalContributions).toBe(120);
    expect(result.points[1]?.growth).toBeCloseTo(0, 8);
  });

  it("derives annualized money-weighted return from the projected monthly cash flows", () => {
    const investment = projectInvestment(
      {
        id: "annual-return",
        name: "Rendimiento anual",
        category: "etf",
        annualRatePct: 12,
        holdings: [{ ...holding, monthlyContribution: 10 }],
      },
      1,
    );
    const insights = getPortfolioSummaryInsights(
      100,
      investment.finalValue,
      investment.totalContributions,
      [investment],
      1,
    );

    expect(insights.monthlyReturnPct).toBeCloseTo((Math.pow(1.12, 1 / 12) - 1) * 100, 8);
    expect(insights.annualizedReturnPct).toBeCloseTo(12, 8);
    expect(insights.growthPctOfCurrent).toBeCloseTo((investment.growth / 100) * 100, 8);
  });

  it("shows current balances at zero years and projects the maximum horizon", () => {
    const current = projectHolding({ ...holding, monthlyContribution: 10 }, 12, 0);
    expect(current.finalValue).toBe(100);
    expect(current.totalContributions).toBe(0);
    expect(current.points).toEqual([{ year: 0, balance: 100, contributions: 0, growth: 0 }]);
    expect(projectHolding(holding, 0, 40).points).toHaveLength(41);
    expect(() => projectHolding(holding, 5, -1)).toThrow(RangeError);
    expect(() => projectHolding(holding, 5, 41)).toThrow(RangeError);
    expect(() => projectHolding(holding, 5, 1.5)).toThrow(RangeError);
  });

  it("sums holdings under one investment and investments in a portfolio", () => {
    const investment: Investment = {
      id: "two",
      name: "Dos posiciones",
      category: "etf",
      annualRatePct: 5,
      holdings: [holding, { ...holding, id: "test-2", currentValue: 50 }],
    };
    expect(projectInvestment(investment, 1).initialValue).toBe(150);
    const currentInvestment = projectInvestment(
      {
        ...investment,
        holdings: investment.holdings.map((item) => ({ ...item, monthlyContribution: 10 })),
      },
      0,
    );
    expect(currentInvestment.initialValue).toBe(150);
    expect(currentInvestment.finalValue).toBe(150);
    expect(currentInvestment.totalContributions).toBe(0);
    expect(currentInvestment.growth).toBe(0);
    expect(currentInvestment.points).toEqual([
      { year: 0, balance: 150, contributions: 0, growth: 0 },
    ]);
    const portfolio: Portfolio = {
      schemaVersion: 1,
      currency: "USD",
      asOf: "2026-01-01",
      inflation: {
        annualRatePct: 2.1,
        note: "Prueba",
        source: { url: "https://example.com", asOf: "2026-01-01" },
      },
      investments: [
        investment,
        { ...investment, id: "other", name: "Otro", holdings: [{ ...holding, id: "test-3" }] },
      ],
    };
    expect(projectPortfolio(portfolio, 1)).toHaveLength(2);
    const currentPortfolio = projectPortfolio(portfolio, 0);
    expect(currentPortfolio.map((projection) => projection.finalValue)).toEqual([150, 100]);
    expect(
      currentPortfolio.every(
        (projection) =>
          projection.totalContributions === 0 &&
          projection.growth === 0 &&
          projection.points.length === 1,
      ),
    ).toBe(true);
    expect(portfolioInitialValue(portfolio)).toBe(250);
  });

  it("derives cumulative gain on all invested capital and monthly contributions", () => {
    const winner = projectInvestment(
      {
        id: "winner",
        name: "Mayor",
        category: "etf",
        annualRatePct: 12,
        holdings: [{ ...holding, monthlyContribution: 10 }],
      },
      1,
    );
    const second = projectInvestment(
      {
        id: "second",
        name: "Segundo",
        category: "etf",
        annualRatePct: 5,
        holdings: [{ ...holding, id: "second-holding", currentValue: 50, monthlyContribution: 5 }],
      },
      1,
    );
    const loss = projectInvestment(
      {
        id: "loss",
        name: "Pérdida",
        category: "etf",
        annualRatePct: -5,
        holdings: [{ ...holding, id: "loss-holding", currentValue: 25 }],
      },
      1,
    );
    const projections = [winner, second, loss];
    const initial = projections.reduce((sum, projection) => sum + projection.initialValue, 0);
    const contributions = projections.reduce(
      (sum, projection) => sum + projection.totalContributions,
      0,
    );
    const finalValue = projections.reduce((sum, projection) => sum + projection.finalValue, 0);
    const insights = getPortfolioSummaryInsights(
      initial,
      finalValue,
      contributions,
      projections,
      1,
    );

    expect(insights.totalGrowth).toBeCloseTo(
      projections.reduce((sum, projection) => sum + projection.growth, 0),
      8,
    );
    expect(insights.growthPctOfCurrent).toBeCloseTo((insights.totalGrowth / initial) * 100, 8);
    expect(insights.gainPctOfInvested).toBeCloseTo(
      (insights.totalGrowth / (initial + contributions)) * 100,
      8,
    );
    expect(insights.monthlyContributionTotal).toBe(15);
    expect(insights.leadingGrowthInvestment?.investment.id).toBe("winner");
  });

  it("preserves negative cumulative gain and omits non-positive growth investments", () => {
    const loss = projectInvestment(
      {
        id: "loss",
        name: "Pérdida",
        category: "etf",
        annualRatePct: -10,
        holdings: [holding],
      },
      1,
    );
    const insights = getPortfolioSummaryInsights(100, loss.finalValue, 0, [loss], 1);
    expect(insights.totalGrowth).toBeCloseTo(-10, 8);
    expect(insights.growthPctOfCurrent).toBeCloseTo(-10, 8);
    expect(insights.gainPctOfInvested).toBeCloseTo(-10, 8);
    expect(insights.annualizedReturnPct).toBeCloseTo(-10, 8);
    expect(insights.leadingGrowthInvestment).toBeNull();
  });

  it("returns no cumulative percentage when total invested capital is zero", () => {
    const insights = getPortfolioSummaryInsights(0, 0, 0, []);
    expect(insights.totalGrowth).toBe(0);
    expect(insights.growthPctOfCurrent).toBeNull();
    expect(insights.gainPctOfInvested).toBeNull();
    expect(insights.monthlyReturnPct).toBeNull();
    expect(insights.annualizedReturnPct).toBeNull();
    expect(insights.monthlyContributionTotal).toBe(0);
  });

  it("uses contributions in the invested-capital denominator when no starting balance exists", () => {
    const investment = projectInvestment(
      {
        id: "only-contributions",
        name: "Solo aportes",
        category: "etf",
        annualRatePct: 12,
        holdings: [{ ...holding, currentValue: 0, monthlyContribution: 10 }],
      },
      1,
    );
    const insights = getPortfolioSummaryInsights(
      0,
      investment.finalValue,
      investment.totalContributions,
      [investment],
      1,
    );
    expect(insights.totalGrowth).toBeCloseTo(investment.growth, 8);
    expect(insights.growthPctOfCurrent).toBeNull();
    expect(insights.gainPctOfInvested).toBeCloseTo(
      (investment.growth / investment.totalContributions) * 100,
      8,
    );
    expect(insights.annualizedReturnPct).toBeCloseTo(12, 8);
  });

  it("keeps configured monthly contributions when the horizon is zero", () => {
    const currentInvestment = projectInvestment(
      {
        id: "current",
        name: "Actual",
        category: "etf",
        annualRatePct: 12,
        holdings: [{ ...holding, monthlyContribution: 10 }],
      },
      0,
    );
    const insights = getPortfolioSummaryInsights(100, 100, 0, [currentInvestment], 0);
    expect(insights.totalGrowth).toBe(0);
    expect(insights.growthPctOfCurrent).toBe(0);
    expect(insights.gainPctOfInvested).toBe(0);
    expect(insights.monthlyReturnPct).toBeNull();
    expect(insights.annualizedReturnPct).toBeNull();
    expect(insights.monthlyContributionTotal).toBe(10);
    expect(insights.leadingGrowthInvestment).toBeNull();
  });

  it("returns no leading investment when every investment has zero or negative growth", () => {
    const projections = [
      projectInvestment(
        { id: "flat", name: "Estable", category: "etf", annualRatePct: 0, holdings: [holding] },
        1,
      ),
      projectInvestment(
        { id: "loss", name: "Pérdida", category: "etf", annualRatePct: -5, holdings: [holding] },
        1,
      ),
    ];
    expect(
      getPortfolioSummaryInsights(
        200,
        projections.reduce((sum, item) => sum + item.finalValue, 0),
        0,
        projections,
      ).leadingGrowthInvestment,
    ).toBeNull();
  });

  it("rejects missing investments, duplicate IDs, and unsupported currencies", () => {
    expect(
      portfolioSchema.safeParse({
        schemaVersion: 1,
        currency: "USD",
        asOf: "today",
        investments: [],
      }).success,
    ).toBe(false);
    const withoutInflation = structuredClone(examplePortfolio);
    delete (withoutInflation as Partial<Portfolio>).inflation;
    expect(portfolioSchema.safeParse(withoutInflation).success).toBe(false);
    expect(portfolioSchema.safeParse({ ...examplePortfolio, currency: "EUR" }).success).toBe(false);
    const duplicate = structuredClone(examplePortfolio);
    duplicate.investments[1]!.id = duplicate.investments[0]!.id;
    expect(portfolioSchema.safeParse(duplicate).success).toBe(false);
  });

  it("accepts inflation endpoints and precise JSON values but rejects values outside the slider range", () => {
    expect(
      portfolioSchema.safeParse({
        ...examplePortfolio,
        inflation: { ...examplePortfolio.inflation, annualRatePct: 0.05 },
      }).success,
    ).toBe(true);
    expect(
      portfolioSchema.safeParse({
        ...examplePortfolio,
        inflation: { ...examplePortfolio.inflation, annualRatePct: 10 },
      }).success,
    ).toBe(true);
    expect(
      portfolioSchema.safeParse({
        ...examplePortfolio,
        inflation: { ...examplePortfolio.inflation, annualRatePct: 2.123456 },
      }).success,
    ).toBe(true);
    expect(
      portfolioSchema.safeParse({
        ...examplePortfolio,
        inflation: { ...examplePortfolio.inflation, annualRatePct: 0.049 },
      }).success,
    ).toBe(false);
    expect(
      portfolioSchema.safeParse({
        ...examplePortfolio,
        inflation: { ...examplePortfolio.inflation, annualRatePct: 10.001 },
      }).success,
    ).toBe(false);
  });

  it("uses the requested inflation slider range and displays a fixed two-decimal rate", () => {
    expect([MIN_INFLATION_RATE_PCT, MAX_INFLATION_RATE_PCT, INFLATION_RATE_STEP_PCT]).toEqual([
      0.05, 10, 0.05,
    ]);
    expect(formatInflationRate(4)).toBe("4.00");
    expect(formatInflationRate(4.9)).toBe("4.90");
  });

  it("preserves rate notes as text, blank strings, or null", () => {
    const withNotes = threeInvestmentPortfolio(examplePortfolio);
    withNotes.investments[0] = { ...withNotes.investments[0]!, rateNote: null };
    withNotes.investments[1] = { ...withNotes.investments[1]!, rateNote: "" };
    withNotes.investments[2] = { ...withNotes.investments[2]!, rateNote: "Nota de prueba" };

    const parsed = portfolioSchema.safeParse(withNotes);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.investments.slice(0, 3).map((investment) => investment.rateNote)).toEqual([
        null,
        "",
        "Nota de prueba",
      ]);
    }
  });

  it("accepts null or empty values for optional rate-source fields", () => {
    const withNulls = threeInvestmentPortfolio(examplePortfolio);
    withNulls.investments[0] = {
      ...withNulls.investments[0]!,
      rateSource: { url: null, asOf: null },
    };
    withNulls.investments[1] = { ...withNulls.investments[1]!, rateSource: null };
    withNulls.investments[2] = { ...withNulls.investments[2]!, rateSource: { url: "", asOf: "" } };

    const parsed = portfolioSchema.safeParse(withNulls);
    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.investments[0]?.rateSource).toEqual({ url: null, asOf: null });
      expect(parsed.data.investments[1]?.rateSource).toBeNull();
      expect(parsed.data.investments[2]?.rateSource).toEqual({ url: "", asOf: "" });
    }
  });

  it("shows every investment field handled by the app in the example JSON", () => {
    const example = JSON.parse(
      readFileSync(
        new URL("../../../../../public/portfolio.example.json", import.meta.url),
        "utf8",
      ),
    );
    const parsed = portfolioSchema.safeParse(example);

    expect(parsed.success).toBe(true);
    if (parsed.success) {
      expect(parsed.data.investments[0]?.rateNote).toContain("tarifario de Banco Pichincha");
      expect(parsed.data.investments[0]?.rateSource?.url).toContain("pichincha.com");
      expect(parsed.data.investments[1]?.rateNote).toContain("No es una oferta");
      expect(parsed.data.investments[1]?.rateSource?.url).toContain("cacel.com.ec");
      expect(parsed.data.investments[2]?.rateSource?.url).toContain("bce.fin.ec");
      expect(parsed.data.investments[3]?.rateSource?.url).toContain("vanguard.com");
      expect(parsed.data.investments[6]?.rateSource?.url).toContain("investor.gov");
      expect(parsed.data.investments[7]?.rateSource).toBeNull();
    }
  });

  it("projects real values and monthly contributions in today's dollars", () => {
    const holdingWithContribution = { ...holding, currentValue: 1000, monthlyContribution: 100 };
    const inflation = 2.1;
    const real = projectHolding(holdingWithContribution, 0, 1, inflation);
    const expectedContributions = Array.from(
      { length: 12 },
      (_, index) => 100 / Math.pow(1 + inflation / 100, (index + 1) / 12),
    ).reduce((sum, value) => sum + value, 0);
    expect(real.points[0]?.balance).toBe(1000);
    expect(real.totalContributions).toBeCloseTo(expectedContributions, 8);
    expect(real.finalValue).toBeCloseTo((1000 + 1200) / (1 + inflation / 100), 8);
    const cashReal = projectHolding(
      { ...holdingWithContribution, monthlyContribution: 0 },
      0,
      1,
      inflation,
    );
    expect(cashReal.finalValue).toBeCloseTo(1000 / (1 + inflation / 100), 8);
    expect(projectHolding(holdingWithContribution, 0, 1).finalValue).toBeCloseTo(2200, 8);
  });

  it("converts the money-weighted return with the Fisher relation in real mode", () => {
    const inflation = 2.1;
    const nominal = projectInvestment(
      {
        id: "fisher",
        name: "Fisher",
        category: "etf",
        annualRatePct: 5,
        holdings: [{ ...holding, currentValue: 1000, monthlyContribution: 100 }],
      },
      1,
    );
    const real = projectInvestment(nominal.investment, 1, inflation);
    const insights = getPortfolioSummaryInsights(
      real.initialValue,
      real.finalValue,
      real.totalContributions,
      [real],
      1,
      inflation,
    );
    expect(insights.annualizedReturnPct).toBeCloseTo((1.05 / 1.021 - 1) * 100, 8);
  });

  it("matches nominal and real purchasing-power checkpoints for monthly deposits", () => {
    const monthlyContribution = 100;
    const horizonYears = 20;
    const inflation = 2.1;
    const holdingWithContribution = {
      ...holding,
      currentValue: 1000,
      monthlyContribution,
    };

    const nominal = projectHolding(holdingWithContribution, 5, horizonYears);
    const real = projectHolding(holdingWithContribution, 5, horizonYears, inflation);

    expect(nominal.finalValue).toBeCloseTo(43_233.74623692505, 6);
    expect(real.finalValue).toBeCloseTo(28_530.410958121585, 6);
    expect(real.finalValue).toBeCloseTo(
      nominal.finalValue / Math.pow(1 + inflation / 100, horizonYears),
      8,
    );
    expect(monthlyContribution * 12).toBe(1200);
    expect(8.33 * 12).toBeCloseTo(99.96, 8);
  });

  it("shows cash losing Ecuadorian purchasing power under constant inflation", () => {
    const cash = projectHolding({ ...holding, currentValue: 1000 }, 0, 20, 2.1);
    expect(cash.finalValue).toBeCloseTo(659.9106818496061, 6);
  });
});
