import { t } from "@/libraries/i18n";
export const formulaTooltipCopy = {
  cerrarFormula: t("dashboard.formulaTooltip.copy.cerrarFormula.p1"),
  formulaFor: (label: string) =>
    t("dashboard.formulaTooltip.copy.formulaFor.p1") +
    label +
    t("dashboard.formulaTooltip.copy.formulaFor.p2"),
} as const;
