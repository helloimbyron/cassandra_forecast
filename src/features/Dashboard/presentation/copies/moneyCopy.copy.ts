import { t } from "@/libraries/i18n";

export const moneyCopy = {
  fullAmount: (full: string) => t("dashboard.moneyCopy.fullAmount", { full }),
  abbreviatedAmount: (abbreviated: string, full: string) =>
    t("dashboard.moneyCopy.abbreviatedAmount", { abbreviated, full }),
  abbreviatedValue: (abbreviated: string, full: string) =>
    t("dashboard.moneyCopy.abbreviatedValue", { abbreviated, full }),
} as const;
