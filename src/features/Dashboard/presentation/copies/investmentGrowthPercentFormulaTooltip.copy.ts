import { t } from "@/libraries/i18n";
import { labels } from "@/features/Dashboard/presentation/copies/labels.copy";
export const investmentGrowthPercentFormulaTooltipCopy = {
  intro: t("dashboard.investmentGrowthPercentFormulaTooltip.copy.intro.p1"),
  description:
    t("dashboard.investmentGrowthPercentFormulaTooltip.copy.description.p1") +
    labels.currentCapital.toLowerCase() +
    t("dashboard.investmentGrowthPercentFormulaTooltip.copy.description.p2"),
  expressionLabel:
    t("dashboard.investmentGrowthPercentFormulaTooltip.copy.expressionLabel.p1") +
    labels.growth +
    t("dashboard.investmentGrowthPercentFormulaTooltip.copy.expressionLabel.p2") +
    labels.currentCapital +
    t("dashboard.investmentGrowthPercentFormulaTooltip.copy.expressionLabel.p3"),
  noCurrentValue:
    t("dashboard.investmentGrowthPercentFormulaTooltip.copy.noCurrentValue.p1") +
    labels.currentCapital.toLowerCase() +
    t("dashboard.investmentGrowthPercentFormulaTooltip.copy.noCurrentValue.p2"),
  substitutionDescription: t(
    "dashboard.investmentGrowthPercentFormulaTooltip.copy.substitutionDescription.p1",
  ),
  substitutionLabel: t("dashboard.investmentGrowthPercentFormulaTooltip.copy.substitutionLabel.p1"),
  example: (change: string, current: string, percent: string) =>
    t("dashboard.investmentGrowthPercentFormulaTooltip.copy.example.p1") +
    change +
    t("dashboard.investmentGrowthPercentFormulaTooltip.copy.example.p2") +
    current +
    t("dashboard.investmentGrowthPercentFormulaTooltip.copy.example.p3") +
    percent +
    t("dashboard.investmentGrowthPercentFormulaTooltip.copy.example.p4"),
} as const;
