import { t } from "@/libraries/i18n";
import { labels } from "@/features/Dashboard/presentation/copies/labels.copy";
export const investmentCardCopy = {
  position: t("dashboard.investmentCard.copy.posicion.p1"),
  positions: t("dashboard.investmentCard.copy.posiciones.p1"),
  text40: t("dashboard.investmentCard.copy.text40.p1"),
  questionMark: t("dashboard.investmentCard.copy.questionMark.p1"),
  rateSource: (asOf?: string | null) =>
    t("dashboard.investmentCard.copy.rateSource.p1") +
    labels.annualRate.toLowerCase() +
    t("dashboard.investmentCard.copy.rateSource.p2") +
    (asOf
      ? t("dashboard.investmentCard.copy.rateSource.p3") +
        asOf +
        t("dashboard.investmentCard.copy.rateSource.p4")
      : t("dashboard.investmentCard.copy.rateSource.p5")) +
    t("dashboard.investmentCard.copy.rateSource.p6"),
  rateNote: (name: string) =>
    t("dashboard.investmentCard.copy.rateNote.p1") +
    labels.annualRate.toLowerCase() +
    t("dashboard.investmentCard.copy.rateNote.p2") +
    name +
    t("dashboard.investmentCard.copy.rateNote.p3"),
  chartFor: (name: string, years: number) =>
    t("dashboard.investmentCard.copy.chartFor.p1") +
    name +
    t("dashboard.investmentCard.copy.chartFor.p2") +
    years +
    t("dashboard.investmentCard.copy.chartFor.p3"),
  seriesFor: (name: string) =>
    t("dashboard.investmentCard.copy.seriesFor.p1") +
    name +
    t("dashboard.investmentCard.copy.seriesFor.p2"),
  horizonFor: (name: string) =>
    t("dashboard.investmentCard.copy.horizonFor.p1") +
    name +
    t("dashboard.investmentCard.copy.horizonFor.p2"),
  positionsFor: (name: string) =>
    t("dashboard.investmentCard.copy.positionsFor.p1") +
    name +
    t("dashboard.investmentCard.copy.positionsFor.p2"),
  contributionFor: (name: string) =>
    t("dashboard.investmentCard.copy.contributionFor.p1") +
    name +
    t("dashboard.investmentCard.copy.contributionFor.p2"),
} as const;
