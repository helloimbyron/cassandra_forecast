import { labels } from "@/features/Portfolio/presentation/constants/labels.constant";

// --- Constants ---

const withdrawalRateLabel = "Retiro anual del saldo futuro (%)";
const annualWithdrawalLabel = "Lo que retirarías en un año";
const durationLabel = "¿Cuánto duraría el dinero?";

export const copy = {
  title: "¿Cuánto podrías retirar?",
  chartTitle: (adjusted: boolean) =>
    adjusted
      ? "Saldo futuro ajustado después de los retiros"
      : "Saldo futuro después de los retiros",
  chartDescription: (adjusted: boolean) =>
    adjusted
      ? "El saldo que quedaría al final de cada año, expresado en poder de compra después de descontar la inflación."
      : "El saldo que quedaría al final de cada año después de tus retiros.",
  insightsAriaLabel: "Resultados de los retiros",
  balance: "Saldo restante",
  year: (year: number) => (year === 0 ? "Inicio" : `Año ${year}`),
  controls: "Prueba distintos retiros",
  horizon: "Durante cuántos años retirarías",
  withdrawal: "¿Cuánto retirarás cada mes?",
  withdrawalMode: "Cómo elegir el retiro",
  monthlyMode: "Elegir un monto mensual fijo",
  percentageMode: withdrawalRateLabel,
  assumptionAriaLabel: "Información sobre esta proyección",
  annualReturn: labels.annualRate,
  realAnnualReturn: labels.realAnnualRate,
  realMonthlyWithdrawal: "Retiro mensual ajustado",
  zeroYears: "0 años",
  fortyYears: "40 años",
  noCalculatedReturn: `No hay saldo para calcular una tasa conjunta; se usa 0 % como punto de partida.`,
  assumption:
    "Este es solo un ejemplo de lo que podría pasar: supone un retiro fijo y tasas que no cambian. No reproduce contratos ni incluye inflación, impuestos, comisiones o cambios del mercado.",
  realWithdrawalNominalEquivalent: (amount: string, years: number) =>
    `Si empiezas a retirar dentro de ${years} ${years === 1 ? "año" : "años"}, necesitarías ${amount} al mes para mantener el poder de compra del monto elegido. La simulación descuenta la inflación supuesta.`,
  realAssumption:
    "Los importes se muestran según su poder de compra, después de descontar la inflación. El retiro busca conservar ese poder de compra y se reparte entre las inversiones según su saldo. Se usan tasas supuestas; no incluye impuestos, comisiones, cambios del mercado ni restricciones para retirar dinero.",
  portfolioReturnExplanation: (rate: string, years: number, adjusted: boolean) =>
    `La tasa anual es ${rate}, porque corresponde a la rentabilidad anualizada (TIR) de toda tu cartera durante ${years} ${years === 1 ? "año" : "años"} de acumulación; incluye el saldo inicial y los aportes${adjusted ? " y descuenta la inflación" : ""}. Se aplica por igual a todas las inversiones para simular los retiros. Es un supuesto: el rendimiento futuro puede ser distinto.`,
  manualReturnExplanation: (rate: string) =>
    `La tasa anual es ${rate}, porque la elegiste para este escenario de retiro. Reemplaza por igual las tasas de todas las inversiones. El rendimiento futuro puede ser distinto.`,
  annualWithdrawal: annualWithdrawalLabel,
  annualRate: withdrawalRateLabel,
  equivalentMonthlyWithdrawal: "Retiro mensual",
  equivalentMonthlyNote: `El monto mensual que resulta del porcentaje elegido sobre el saldo al empezar los retiros.`,
  endingBalance: "Saldo restante al final",
  duration: durationLabel,
  planned: "Retiro de un mes × 12",
  percentNote:
    "Se calcula una sola vez con el saldo al empezar los retiros. Después retiras el mismo monto cada mes, no un porcentaje nuevo del saldo restante.",
  endingNote: (years: number) =>
    years === 0 ? "Sin periodo de retiros" : `Después de ${years} ${years === 1 ? "año" : "años"}`,
  depletedAtStart: "Agotado al inicio",
  noCapital: "No hay dinero para retirar",
  noHorizon: "Sin periodo seleccionado",
  lastsFullHorizon: (years: number) =>
    `El dinero alcanzaría para ${years} ${years === 1 ? "año" : "años"}`,
  lastsAtLeast: (years: number) =>
    `El saldo no se agota durante los ${years} ${years === 1 ? "año" : "años"} que elegiste.`,
  surplusDuration: (duration: string) => `Duraría ${duration} más`,
  surplusNote: (years: number) =>
    `Este tiempo adicional se cuenta después de los ${years} ${years === 1 ? "año" : "años"} que elegiste.`,
  noAdditionalDepletion: "No se agotaría",
  noAdditionalDepletionNote:
    "Con estos retiros y tasas supuestas, la simulación no encuentra un momento en que llegue a cero. No es una garantía.",
  depletionDuration: (duration: string) => `El dinero duraría hasta ${duration}`,
  depletionAt: (years: number, months: number) => {
    if (years === 0) {
      return `${months} ${months === 1 ? "mes" : "meses"}`;
    }

    return months === 0
      ? `${years} ${years === 1 ? "año" : "años"}`
      : `${years} ${years === 1 ? "año" : "años"}, ${months} ${months === 1 ? "mes" : "meses"}`;
  },
  depletedNote:
    "El saldo llega a $0,00 al terminar ese mes; el tiempo indicado es desde el inicio.",
  annualFormulaIntro: "Suma lo que sacarías en 12 meses si retiras el mismo monto cada mes.",
  annualExample: (monthly: string, annual: string) =>
    `Con tu elección, sacarías ${monthly} cada mes; en 12 meses serían ${annual}.`,
  percentExample: (annual: string, initial: string, percent: string) =>
    `Con tu elección, retirar ${annual} en un año equivale a ${percent} de los ${initial} con los que empezarías. El monto mensual queda fijo.`,
  monthlyExample: (initial: string, percent: string, monthly: string) =>
    `Con ${initial} al empezar y ${percent} para todo el año, podrías retirar ${monthly} al mes durante 12 meses. Después el monto mensual queda fijo.`,
  endingExample: (initial: string, withdrawal: string, years: number, final: string) =>
    `Empezarías con ${initial}, retirarías ${withdrawal} al mes durante ${years} ${years === 1 ? "año" : "años"} y quedarían ${final} según las tasas supuestas. No está garantizado.`,
  durationExample: (withdrawal: string, duration: string) =>
    `Con retiros de ${withdrawal} al mes, la simulación muestra: ${duration}. No es una garantía.`,
  percentFormulaIntro: `Compara lo que retirarías en 12 meses con el saldo que tendrías al empezar los retiros. El porcentaje se fija una sola vez.`,
  endingFormulaIntro:
    "Cada mes el saldo cambia por la tasa supuesta y luego se descuenta lo que retiras. Así se obtiene lo que quedaría al final.",
  durationFormulaIntro:
    "La app avanza mes a mes hasta que el dinero llegue a cero. Si todavía queda saldo al terminar los años elegidos, continúa con los mismos supuestos.",
  annualFormulaStep: "Multiplica el retiro de un mes por los 12 meses del año.",
  percentFormulaStep: `Divide el retiro de 12 meses entre el ${labels.projectedValue.toLowerCase()} y multiplica por 100.`,
  equivalentMonthlyFormulaIntro:
    "Toma el porcentaje elegido del saldo al empezar los retiros y lo reparte en 12 pagos mensuales iguales.",
  equivalentMonthlyFormulaStep: `Multiplica el ${labels.projectedValue.toLowerCase()} por el porcentaje elegido y divide el resultado entre 12.`,
  balanceFormulaStep: `Cada inversión cambia según su ${labels.annualRate.toLowerCase()}. Al final del mes, el retiro sale de todas según cuánto dinero queda en cada una.`,
  individualReturnsStep: `La TIR anualizada de toda la cartera se aplica por igual a cada inversión durante esta simulación de retiro.`,
  manualReturnStep:
    "La tasa que elegiste reemplaza las tasas de todas las inversiones solo en este escenario.",
  grownBalanceFormulaLabel: "Saldo de cada inversión después del cambio del mes",
  proRataWithdrawalFormulaLabel: "El retiro se reparte según el saldo de cada inversión",
  balanceAfterWithdrawalFormulaLabel: "Saldo de cada inversión después de retirar",
  withdrawalSubstitutionLabel: "Retiro mensual seleccionado",
  durationDepletedFormulaStep:
    "Cuenta desde el inicio hasta el primer mes en que el saldo llega a $0.",
  additionalDurationFormulaStep:
    "Parte del dinero que queda al terminar los años elegidos y sigue mes a mes con las mismas tasas y retiros hasta llegar a $0.",
  noAdditionalDepletionFormulaStep:
    "La simulación no encuentra un mes en que el saldo llegue a $0 con estos valores.",
  balanceAtSelectedHorizonLabel: "Saldo al final del plazo elegido",
  additionalDurationResultLabel: "Meses adicionales hasta agotar el saldo",
  durationLastsFormulaStep:
    "El saldo se mantiene por encima de cero durante el plazo seleccionado.",
  durationNoHorizonFormulaStep: "No hay meses de retiro seleccionados que evaluar.",
  noCapitalForPercent: `Sin ${labels.projectedValue.toLowerCase()} no se puede calcular un porcentaje.`,
  yearsLabel: "Años",
  annualWithdrawalLabel: "Retiro anual",
  initialTotalLabel: labels.projectedValue,
  annualRateLabel: labels.annualRate,
  monthlyRateLabel: "Tasa usada cada mes",
  balanceLabel: "Saldo",
  depletionCalculationLabel: "Primer mes de agotamiento",
  monthlyWithdrawalLabel: "Retiro mensual",
  annualWithdrawalRateLabel: withdrawalRateLabel,
  finalBalanceLabel: "Saldo final",
  durationLabel,
} as const;
