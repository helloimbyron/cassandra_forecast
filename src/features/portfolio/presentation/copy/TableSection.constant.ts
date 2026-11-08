export const copy = {
  evolucionAnoAAno: "Tu dinero, año por año",
  ano: "Año",
  total: "Total",
  columnas: "Inversiones",
  seleccionarColumnas: "Elegir qué inversiones aparecen en la tabla",
  columnasVisibles: (visibles: number, total: number) => `${visibles} de ${total}`,
  showInvestmentColumn: (nombre: string) => `Mostrar columna ${nombre}`,
  tablaProyeccionAccesible: (projectedLabel: string) =>
    `${projectedLabel}, año por año, en cada inversión y en total.`,
  yearNumber: (year: number) => `Año ${year}`,
} as const;
