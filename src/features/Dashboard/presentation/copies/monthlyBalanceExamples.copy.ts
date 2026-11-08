import { t } from "@/libraries/i18n";
export const monthlyBalanceExamplesCopy = {
  monthByMonthCalculationExamples: t(
    "dashboard.monthlyBalanceExamples.copy.ejemplosDelCalculoMesAMes.p1",
  ),
  months: t("dashboard.monthlyBalanceExamples.copy.meses.p1"),
  to: t("dashboard.monthlyBalanceExamples.copy.al.p1"),
  repeatCalculationOneAtATime: t(
    "dashboard.monthlyBalanceExamples.copy.seRepiteLaMismaOperacionUnoPor.p1",
  ),
  month: t("dashboard.monthlyBalanceExamples.copy.mes.p1"),
  lastMonth: t("dashboard.monthlyBalanceExamples.copy.lastMonth.p1"),
  calculationForMonth: (month: number) =>
    t("dashboard.monthlyBalanceExamples.copy.calculationForMonth.p1") +
    month +
    t("dashboard.monthlyBalanceExamples.copy.calculationForMonth.p2"),
  valueAtMonth: (month: number) =>
    t("dashboard.monthlyBalanceExamples.copy.valueAtMonth.p1") +
    month +
    t("dashboard.monthlyBalanceExamples.copy.valueAtMonth.p2"),
} as const;
