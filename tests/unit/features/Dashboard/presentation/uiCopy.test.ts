import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { describe, expect, it } from "vitest";
import es from "@/libraries/i18n/es.json";
import { i18n, t } from "@/libraries/i18n";
import { formatMonths } from "@/features/Dashboard/domain/utils/formatMonths.util";
import { formatYears } from "@/features/Dashboard/domain/utils/formatYears.util";
import { readPortfolioFile } from "@/shared/infrastructure/services/readPortfolioFile.service";
import { projectedValueFormulaTooltipCopy } from "@/features/Dashboard/presentation/copies/projectedValueFormulaTooltip.copy";
import { investmentGrowthFormulaTooltipCopy } from "@/features/Dashboard/presentation/copies/investmentGrowthFormulaTooltip.copy";
import { distributionSectionCopy } from "@/features/Dashboard/presentation/copies/distributionSection.copy";

describe("centralized Spanish catalog", () => {
  it("initializes i18next with Spanish as the only supported locale", () => {
    expect(i18n.language).toBe("es");
    expect(i18n.options.supportedLngs).toContain("es");
    expect(i18n.options.supportedLngs).not.toContain("en");
  });

  it("keeps site metadata and financial vocabulary in the catalog", () => {
    expect(es.site.title).toBe("Cassandra · Explora cómo podría cambiar tu dinero");
    expect(es.site.description).toBe(
      "Prueba escenarios para tus inversiones y mira qué podría pasar con el tiempo.",
    );
    expect(es.dashboard.financialTerm.FINANCIAL_TERM_VALUES.PROJECTED_BALANCE.p1).toBe(
      "Saldo futuro",
    );
    expect(es.dashboard.financialTerm.FINANCIAL_TERM_VALUES.EFFECTIVE_ANNUAL_RETURN.p1).toBe(
      "Tasa anual",
    );
  });

  it("uses interpolation and Spanish plural forms for dynamic copy", () => {
    expect(t("dashboard.moneyCopy.fullAmount", { full: "$1.000" })).toBe(
      "Cantidad completa: $1.000",
    );
    expect(t("dashboard.distributionSection.copy.yearCount", { count: 1 })).toBe("1 año");
    expect(t("dashboard.distributionSection.copy.yearCount", { count: 4 })).toBe("4 años");
    expect(formatYears(1)).toBe("1 año");
    expect(formatYears(2)).toBe("2 años");
    expect(formatMonths(1)).toBe("1 mes");
    expect(formatMonths(2)).toBe("2 meses");
  });

  it("keeps connective phrases for formula labels in the catalog", () => {
    expect(projectedValueFormulaTooltipCopy.positionsLabel("Saldo futuro")).toBe(
      "Saldo futuro de las posiciones",
    );
    expect(
      investmentGrowthFormulaTooltipCopy.investmentOutcomeLabel("Ganancia", "Fondo indexado"),
    ).toBe("Ganancia de Fondo indexado");
    expect(distributionSectionCopy.additionalDepletionMonthsUnit).toBe(" meses");
  });

  it("centralizes import and validation error messages", () => {
    expect(es.shared.importMessages.importMessages.invalidShape.p1).toContain(
      "El archivo no tiene el formato esperado",
    );
    expect(es.shared.portfolioMessages.portfolioMessages.duplicateInvestment.p1).toContain(
      "mismo ID",
    );
    expect(es.dashboard.errors.inflationMinimum).toBe(
      "La inflación anual debe ser mayor que -100 %.",
    );
    expect(es.dashboard.projectedValueFormulaTooltip.dynamic.positionsLabel).toBe(
      "{{projectedLabel}} de las posiciones",
    );
    expect(es.dashboard.investmentGrowthFormulaTooltip.dynamic.investmentOutcomeLabel).toBe(
      "{{outcome}} de {{investmentName}}",
    );
  });

  it("shows the catalog's Spanish fallback instead of Zod's default-language messages", async () => {
    const file = new File(["{}"], "invalid.json", { type: "application/json" });

    await expect(readPortfolioFile(file)).rejects.toThrow(
      "El archivo no tiene el formato esperado.",
    );
  });

  it("uses catalog values as the only source for document metadata", () => {
    const html = readFileSync(
      fileURLToPath(new URL("../../../../../index.html", import.meta.url)),
      "utf8",
    );
    const viteConfig = readFileSync(
      fileURLToPath(new URL("../../../../../vite.config.ts", import.meta.url)),
      "utf8",
    );

    expect(html).toContain("__APP_TITLE__");
    expect(html).toContain("__APP_DESCRIPTION__");
    expect(viteConfig).toContain("messages.site.title");
    expect(viteConfig).toContain("messages.site.description");
  });

  it("keeps copy adapters beside their feature and consuming layer", () => {
    const root = fileURLToPath(new URL("../../../../../src/", import.meta.url));
    const movedModules = [
      "features/Dashboard/presentation/constants/labels.constant.ts",
      "features/Dashboard/presentation/constants/position.constant.ts",
      "features/Dashboard/presentation/enums/financialTerm.enum.ts",
      "features/Dashboard/presentation/constants/categoryLabels.constant.ts",
      "features/Dashboard/presentation/utils/formatYears.util.ts",
      "features/Dashboard/presentation/utils/formatMonths.util.ts",
      "features/Home/IntroSection.constant.ts",
      "shared/presentation/constants/Header.constant.ts",
      "shared/infrastructure/constants/importMessages.constant.ts",
      "features/Dashboard/presentation/constants/moneyCopy.constant.ts",
    ];

    for (const relativePath of movedModules) {
      expect(() => readFileSync(`${root}${relativePath}`, "utf8")).toThrow();
    }
    expect(
      readFileSync(`${root}features/Dashboard/presentation/copies/labels.copy.ts`, "utf8"),
    ).toContain("dashboard.labels");
    expect(
      readFileSync(`${root}features/Home/presentation/copies/introSection.copy.ts`, "utf8"),
    ).toContain("home.introSection");
    expect(readFileSync(`${root}shared/presentation/copies/header.copy.ts`, "utf8")).toContain(
      "shared.header",
    );
    expect(
      readFileSync(`${root}shared/infrastructure/copies/importMessages.copy.ts`, "utf8"),
    ).toContain("shared.importMessages");
  });
});
