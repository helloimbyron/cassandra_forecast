import { t } from "@/libraries/i18n";
export const monthlyBalanceExamplesCopy = {
  ejemplosDelCalculoMesAMes: t(
    "dashboard.monthlyBalanceExamples.copy.ejemplosDelCalculoMesAMes.p1",
  ),
  meses: t("dashboard.monthlyBalanceExamples.copy.meses.p1"),
  al: t("dashboard.monthlyBalanceExamples.copy.al.p1"),
  seRepiteLaMismaOperacionUnoPor: t(
    "dashboard.monthlyBalanceExamples.copy.seRepiteLaMismaOperacionUnoPor.p1",
  ),
  mes: t("dashboard.monthlyBalanceExamples.copy.mes.p1"),
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
