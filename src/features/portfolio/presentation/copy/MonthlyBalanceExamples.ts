export const copy = {
  ejemplosDelCalculoMesAMes: "Mira cómo cambia el saldo en distintos meses",
  meses: "Meses ",
  al: "al ",
  seRepiteLaMismaOperacionUnoPor: ": el cálculo continúa mes a mes aunque no se muestren todos.",
  mes: "Mes ",
  lastMonth: " · último mes",
  calculationForMonth: (month: number) =>
    `Mes ${month}: el saldo anterior cambia según la tasa mensual y después se suma tu aporte`,
  valueAtMonth: (month: number) => `Valor al terminar el mes ${month}`,
} as const;
