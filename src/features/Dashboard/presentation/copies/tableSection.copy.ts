import { t } from "@/libraries/i18n";
export const tableSectionCopy = {
  evolucionAnoAAno: t("dashboard.tableSection.copy.evolucionAnoAAno.p1"),
  ano: t("dashboard.tableSection.copy.ano.p1"),
  total: t("dashboard.tableSection.copy.total.p1"),
  columnas: t("dashboard.tableSection.copy.columnas.p1"),
  seleccionarColumnas: t("dashboard.tableSection.copy.seleccionarColumnas.p1"),
  columnasVisibles: (visibles: number, total: number) =>
    t("dashboard.tableSection.copy.columnasVisibles.p1") +
    visibles +
    t("dashboard.tableSection.copy.columnasVisibles.p2") +
    total +
    t("dashboard.tableSection.copy.columnasVisibles.p3"),
  showInvestmentColumn: (nombre: string) =>
    t("dashboard.tableSection.copy.showInvestmentColumn.p1") +
    nombre +
    t("dashboard.tableSection.copy.showInvestmentColumn.p2"),
  tablaProyeccionAccesible: (projectedLabel: string) =>
    t("dashboard.tableSection.copy.tablaProyeccionAccesible.p1") +
    projectedLabel +
    t("dashboard.tableSection.copy.tablaProyeccionAccesible.p2"),
  yearNumber: (year: number) =>
    t("dashboard.tableSection.copy.yearNumber.p1") +
    year +
    t("dashboard.tableSection.copy.yearNumber.p2"),
} as const;
