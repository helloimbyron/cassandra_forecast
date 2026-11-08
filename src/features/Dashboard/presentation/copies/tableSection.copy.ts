import { t } from "@/libraries/i18n";
export const tableSectionCopy = {
  yearByYearProgression: t("dashboard.tableSection.copy.evolucionAnoAAno.p1"),
  year: t("dashboard.tableSection.copy.ano.p1"),
  total: t("dashboard.tableSection.copy.total.p1"),
  columns: t("dashboard.tableSection.copy.columnas.p1"),
  selectColumns: t("dashboard.tableSection.copy.seleccionarColumnas.p1"),
  visibleColumnsSummary: (visibleCount: number, total: number) =>
    t("dashboard.tableSection.copy.columnasVisibles.p1") +
    visibleCount +
    t("dashboard.tableSection.copy.columnasVisibles.p2") +
    total +
    t("dashboard.tableSection.copy.columnasVisibles.p3"),
  showInvestmentColumn: (name: string) =>
    t("dashboard.tableSection.copy.showInvestmentColumn.p1") +
    name +
    t("dashboard.tableSection.copy.showInvestmentColumn.p2"),
  accessibleProjectionTable: (projectedLabel: string) =>
    t("dashboard.tableSection.copy.tablaProyeccionAccesible.p1") +
    projectedLabel +
    t("dashboard.tableSection.copy.tablaProyeccionAccesible.p2"),
  yearNumber: (year: number) =>
    t("dashboard.tableSection.copy.yearNumber.p1") +
    year +
    t("dashboard.tableSection.copy.yearNumber.p2"),
} as const;
