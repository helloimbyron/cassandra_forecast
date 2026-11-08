export const copy = {
  hoyTodaviaNoTranscurreTiempoNiSe:
    "Si eliges hoy como fecha final, aún no pasó tiempo ni se sumaron aportes: el cambio es cero.",
  esLaDiferenciaEntreElValorFinal:
    "Para calcular la ganancia o pérdida, resta del saldo futuro el saldo actual de esta inversión y los aportes que harías.",
  restaElValorQueYaTenianSus:
    "Resta el saldo actual de todas sus posiciones y los aportes que harías después.",
  sustituyeLosImportesVisiblesElResultadoUsa:
    "Sustituye los importes visibles. El resultado usa valores sin redondear, por eso aparece ≈.",
  substituteInvestmentAmounts: "Usa las cantidades de esta inversión.",
  investmentGrowthSubstitution: "Con las cantidades de esta inversión",
  example: (final: string, current: string, contributions: string, result: string) =>
    `Con esta inversión: ${final} de saldo futuro menos ${current} de saldo actual y ${contributions} en aportes futuros da ${result}. Las cifras visibles están redondeadas.`,
  differenceLabel: (finalLabel: string) => `${finalLabel} menos valor actual y total aportado`,
} as const;
