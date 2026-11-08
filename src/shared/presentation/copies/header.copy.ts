import { t } from "@/libraries/i18n";

export const headerCopy = {
  headerActions: t("shared.header.copy.headerActions.p1"),
  cambiarJson: t("shared.header.copy.cambiarJson.p1"),
  cassandraInicio: t("shared.header.copy.cassandraInicio.p1"),
  inflationMode: t("shared.header.copy.inflationMode.p1"),
  withoutInflation: t("shared.header.copy.withoutInflation.p1"),
  withInflation: t("shared.header.copy.withInflation.p1"),
  inflationSlider: t("shared.header.copy.inflationSlider.p1"),
  inflationHelpTitle: t("shared.header.copy.inflationHelpTitle.p1"),
  inflationHelpTrigger: t("shared.header.copy.inflationHelpTrigger.p1"),
  inflationHelp: t("shared.header.copy.inflationHelp.p1"),
  inflationHelpExample: (rate: string, todayValue: string) =>
    t("shared.header.copy.inflationHelpExample.p1") +
    rate +
    t("shared.header.copy.inflationHelpExample.p2") +
    todayValue +
    t("shared.header.copy.inflationHelpExample.p3"),
  inflationSliderAriaLabel: t("shared.header.copy.inflationSliderAriaLabel.p1"),
  inflationSourceAriaLabel: (rate: number) =>
    t("shared.header.copy.inflationSourceAriaLabel.p1") +
    rate.toFixed(2) +
    t("shared.header.copy.inflationSourceAriaLabel.p2"),
} as const;
