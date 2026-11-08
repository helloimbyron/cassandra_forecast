import { t } from "@/libraries/i18n";
export const formulaResultCopy = {
  label: (name: string, value: string, rounded: boolean) =>
    rounded
      ? t("dashboard.formulaResult.copy.label.p1") +
        name +
        t("dashboard.formulaResult.copy.label.p2") +
        value +
        t("dashboard.formulaResult.copy.label.p3")
      : t("dashboard.formulaResult.copy.label.p4") +
        name +
        t("dashboard.formulaResult.copy.label.p5") +
        value +
        t("dashboard.formulaResult.copy.label.p6"),
} as const;
