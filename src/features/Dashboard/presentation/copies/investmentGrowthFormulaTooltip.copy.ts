import { t } from "@/libraries/i18n";
export const investmentGrowthFormulaTooltipCopy = {
  investmentOutcomeLabel: (outcome: string, investmentName: string) =>
    t("dashboard.investmentGrowthFormulaTooltip.dynamic.investmentOutcomeLabel", {
      outcome,
      investmentName,
    }),
  hoyTodaviaNoTranscurreTiempoNiSe: t(
    "dashboard.investmentGrowthFormulaTooltip.copy.hoyTodaviaNoTranscurreTiempoNiSe.p1",
  ),
  esLaDiferenciaEntreElValorFinal: t(
    "dashboard.investmentGrowthFormulaTooltip.copy.esLaDiferenciaEntreElValorFinal.p1",
  ),
  restaElValorQueYaTenianSus: t(
    "dashboard.investmentGrowthFormulaTooltip.copy.restaElValorQueYaTenianSus.p1",
  ),
  sustituyeLosImportesVisiblesElResultadoUsa: t(
    "dashboard.investmentGrowthFormulaTooltip.copy.sustituyeLosImportesVisiblesElResultadoUsa.p1",
  ),
  substituteInvestmentAmounts: t(
    "dashboard.investmentGrowthFormulaTooltip.copy.substituteInvestmentAmounts.p1",
  ),
  investmentGrowthSubstitution: t(
    "dashboard.investmentGrowthFormulaTooltip.copy.investmentGrowthSubstitution.p1",
  ),
  example: (final: string, current: string, contributions: string, result: string) =>
    t("dashboard.investmentGrowthFormulaTooltip.copy.example.p1") +
    final +
    t("dashboard.investmentGrowthFormulaTooltip.copy.example.p2") +
    current +
    t("dashboard.investmentGrowthFormulaTooltip.copy.example.p3") +
    contributions +
    t("dashboard.investmentGrowthFormulaTooltip.copy.example.p4") +
    result +
    t("dashboard.investmentGrowthFormulaTooltip.copy.example.p5"),
  differenceLabel: (finalLabel: string) =>
    t("dashboard.investmentGrowthFormulaTooltip.copy.differenceLabel.p1") +
    finalLabel +
    t("dashboard.investmentGrowthFormulaTooltip.copy.differenceLabel.p2"),
} as const;
