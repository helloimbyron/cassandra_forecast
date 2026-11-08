import { t } from "@/libraries/i18n";
import { FINANCIAL_TERM_VALUES } from "@/features/Dashboard/domain/enums/financialTerm.enum";
export const positionCopy = {
  projectedValueFor: (name: string, real = false) =>
    t("dashboard.position.positionCopy.projectedValueFor.p1") +
    (real
      ? t("dashboard.position.positionCopy.projectedValueFor.p2") +
        FINANCIAL_TERM_VALUES.PROJECTED_BALANCE +
        t("dashboard.position.positionCopy.projectedValueFor.p3")
      : FINANCIAL_TERM_VALUES.PROJECTED_BALANCE) +
    t("dashboard.position.positionCopy.projectedValueFor.p4") +
    name +
    t("dashboard.position.positionCopy.projectedValueFor.p5"),
} as const;
