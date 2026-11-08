import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";
import { readPortfolioFile } from "@/features/Portfolio/infrastructure/services/readPortfolioFile.service";
import { createPortfolioChartData } from "../../../../src/features/Portfolio/presentation/utils/createPortfolioChartData.util";
import { portfolioSchema } from "../../../../src/features/Portfolio";

const example = readFileSync(
  new URL("../../../../public/portfolio.example.json", import.meta.url),
  "utf8",
);

describe("portfolio import", () => {
  it("reads and validates the public example", async () => {
    const portfolio = await readPortfolioFile(
      new File([example], "portfolio.json", { type: "application/json" }),
    );
    expect(portfolio.investments).toHaveLength(8);
    expect(portfolio.schemaVersion).toBe(1);
    expect(portfolio.currency).toBe("USD");
    expect(portfolio.inflation.annualRatePct).toBe(2.1);
  });

  it("rejects the previous collection key instead of migrating it", () => {
    const legacyPortfolio: Record<string, unknown> = JSON.parse(example);
    const legacyCollectionKey = ["instru", "ments"].join("");
    legacyPortfolio[legacyCollectionKey] = legacyPortfolio.investments;
    delete legacyPortfolio.investments;

    expect(portfolioSchema.safeParse(legacyPortfolio).success).toBe(false);
  });

  it("rejects schema v2 and files without required inflation metadata", async () => {
    const v2 = JSON.parse(example);
    v2.schemaVersion = 2;
    await expect(readPortfolioFile(new File([JSON.stringify(v2)], "legacy.json"))).rejects.toThrow(
      "schemaVersion",
    );

    const withoutInflation = JSON.parse(example);
    delete withoutInflation.inflation;
    await expect(
      readPortfolioFile(new File([JSON.stringify(withoutInflation)], "missing-inflation.json")),
    ).rejects.toThrow("inflation");
  });

  it("rejects oversized and wrong-extension files before parsing", async () => {
    await expect(
      readPortfolioFile(new File(["x".repeat(1_000_001)], "large.json")),
    ).rejects.toThrow("más de 1 MB");
    await expect(readPortfolioFile(new File([example], "portfolio.txt"))).rejects.toThrow(
      "extensión .json",
    );
  });

  it("reports invalid JSON structure", async () => {
    await expect(readPortfolioFile(new File(["{}"], "invalid.json"))).rejects.toThrow(
      "schemaVersion",
    );
  });
});

describe("chart data transformation", () => {
  it("retains starting balance and end-of-year total", () => {
    const portfolio = portfolioSchema.parse(JSON.parse(example));
    const initialValue = portfolio.investments
      .flatMap((investment) => investment.holdings)
      .reduce((total, holding) => total + holding.currentValue, 0);
    const rows = createPortfolioChartData(portfolio, 1, initialValue);
    expect(rows).toHaveLength(2);
    expect(rows[0]?.year).toBe("Hoy");
    expect(rows[0]?.total).toBe(7_000);
    expect(rows[1]?.year).toBe("1 años");
    expect(Number(rows[1]?.total)).toBeGreaterThan(7_000);
    expect(rows[1]?.invested).toBeCloseTo(10_799.92, 8);
  });

  it("deflates every investment and the invested series when inflation mode is enabled", () => {
    const portfolio = portfolioSchema.parse(JSON.parse(example));
    const initialValue = portfolio.investments
      .flatMap((investment) => investment.holdings)
      .reduce((total, holding) => total + holding.currentValue, 0);
    const nominalRows = createPortfolioChartData(portfolio, 1, initialValue);
    const realRows = createPortfolioChartData(
      portfolio,
      1,
      initialValue,
      portfolio.inflation.annualRatePct,
    );
    expect(realRows[0]?.total).toBe(nominalRows[0]?.total);
    expect(Number(realRows[1]?.total)).toBeCloseTo(Number(nominalRows[1]?.total) / 1.021, 8);
    expect(Number(realRows[1]?.invested)).toBeLessThan(Number(nominalRows[1]?.invested));
  });
});
