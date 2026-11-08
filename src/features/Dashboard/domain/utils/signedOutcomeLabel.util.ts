import { t } from "@/libraries/i18n";

export function signedOutcomeLabel(value: number, context: "growth" | "invested" = "growth") {
  if (value > 0) {
    return context === "invested"
      ? t("dashboard.outcomes.gainOnInvested")
      : t("dashboard.outcomes.gain");
  }
  if (value < 0) {
    return context === "invested"
      ? t("dashboard.outcomes.lossOnInvested")
      : t("dashboard.outcomes.loss");
  }

  return t("dashboard.outcomes.result");
}
