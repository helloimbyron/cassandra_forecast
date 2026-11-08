import { t } from "@/libraries/i18n";
import { labels } from "@/features/Dashboard/presentation/copies/labels.copy";
export const leadingGrowthFormulaTooltipCopy = {
  seComparanLosCrecimientosDeTodosLos: t(
    "dashboard.leadingGrowthFormulaTooltip.copy.seComparanLosCrecimientosDeTodosLos.p1",
  ),
  calculateEachInvestmentGrowthFirst: t(
    "dashboard.leadingGrowthFormulaTooltip.copy.calculateEachInvestmentGrowthFirst.p1",
  ),
  eachInvestmentGrowthEqualsValue:
    t("dashboard.leadingGrowthFormulaTooltip.copy.eachInvestmentGrowthEqualsValue.p1") +
    labels.growth +
    t("dashboard.leadingGrowthFormulaTooltip.copy.eachInvestmentGrowthEqualsValue.p2") +
    labels.projectedValue +
    t("dashboard.leadingGrowthFormulaTooltip.copy.eachInvestmentGrowthEqualsValue.p3") +
    labels.currentValue +
    t("dashboard.leadingGrowthFormulaTooltip.copy.eachInvestmentGrowthEqualsValue.p4") +
    labels.totalContributed +
    t("dashboard.leadingGrowthFormulaTooltip.copy.eachInvestmentGrowthEqualsValue.p5"),
  comparaLosResultadosSiDosParecenIguales: t(
    "dashboard.leadingGrowthFormulaTooltip.copy.comparaLosResultadosSiDosParecenIguales.p1",
  ),
  seEligeElMaximoEntreLosCrecimientos: t(
    "dashboard.leadingGrowthFormulaTooltip.copy.seEligeElMaximoEntreLosCrecimientos.p1",
  ),
  positiveInvestmentGrowths: t(
    "dashboard.leadingGrowthFormulaTooltip.copy.positiveInvestmentGrowths.p1",
  ),
  growthByInvestment: t("dashboard.leadingGrowthFormulaTooltip.copy.growthByInvestment.p1"),
  noInvestmentHasPositiveGrowth: t(
    "dashboard.leadingGrowthFormulaTooltip.copy.noInvestmentHasPositiveGrowth.p1",
  ),
} as const;
