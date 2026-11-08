export enum FinancialTerm {
  ProjectedBalance = "Saldo futuro",
  EffectiveAnnualReturn = "Tasa anual",
  PortfolioAnnualReturn = "Rendimiento anual de toda tu cartera",
  GainOnInvested = "Ganancia/Pérdida sobre lo invertido",
  PurchasingPower = "Poder de compra",
  CurrentCapital = "Saldo actual",
}

export const labels = {
  projectedValue: FinancialTerm.ProjectedBalance,
  projectedValueNominal: FinancialTerm.ProjectedBalance,
  projectedValueReal: `${FinancialTerm.ProjectedBalance} ajustado`,
  currentValue: FinancialTerm.CurrentCapital,
  currentValueUpper: FinancialTerm.CurrentCapital.toUpperCase(),
  totalInvested: "Saldo actual + aportes",
  growth: "Resultado",
  growthPercent: "Cambio frente al saldo actual (%)",
  currentCapital: FinancialTerm.CurrentCapital,
  plannedContributions: "Aportes que harías",
  monthlyContribution: "Aporte mensual",
  annualRate: FinancialTerm.EffectiveAnnualReturn,
  realAnnualRate: "Tasa anual ajustada",
  annualReturn: FinancialTerm.PortfolioAnnualReturn,
  realAnnualReturn: "Rendimiento anual ajustado",
  horizon: "Plazo",
  totalHorizon: "Plazo total",
  today: "Hoy",
  leadingGrowth: "Inversión con mayor ganancia",
  returnOnInvestment: FinancialTerm.GainOnInvested,
  position: "Posición",
  totalContributed: "Total aportado",
  projectionMonths: "Meses calculados",
  newBalance: "Saldo nuevo",
  previousBalance: "Saldo anterior",
  monthlyRate: "Tasa mensual",
  brand: "CASSANDRA",
  percentSymbol: "%",
  years: "años",
  months: "meses",
  etf: "Fondo cotizado (ETF)",
  crypto: "Criptomoneda",
  savings: "Ahorro",
  commodity: "Materia prima",
  cash: "Efectivo",
  policy: "Póliza",
  investment: "Inversión",
  other: "Otro",
  zeroToday: "0 · Hoy",
  fortyYears: "40 años",
} as const;

export function projectedBalanceLabel(real: boolean) {
  return real ? labels.projectedValueReal : labels.projectedValueNominal;
}

export function signedOutcomeLabel(value: number, context: "growth" | "invested" = "growth") {
  if (value > 0) return context === "invested" ? "Ganancia sobre lo invertido" : "Ganancia";
  if (value < 0) return context === "invested" ? "Pérdida sobre lo invertido" : "Pérdida";
  return "Resultado";
}
