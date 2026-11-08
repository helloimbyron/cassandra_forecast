import { t } from "@/libraries/i18n";

export const portfolioMessages = {
  horizonRange: t("shared.portfolioMessages.portfolioMessages.horizonRange.p1"),
  annualRateRange: t("shared.portfolioMessages.portfolioMessages.annualRateRange.p1"),
  duplicateInvestment: (id: string) =>
    t("shared.portfolioMessages.portfolioMessages.duplicateInvestment.p1") +
    id +
    t("shared.portfolioMessages.portfolioMessages.duplicateInvestment.p2"),
  duplicateHolding: (id: string) =>
    t("shared.portfolioMessages.portfolioMessages.duplicateHolding.p1") +
    id +
    t("shared.portfolioMessages.portfolioMessages.duplicateHolding.p2"),
} as const;
