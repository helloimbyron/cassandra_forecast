import { labels } from "@/features/Portfolio/presentation/copy/labels.constant";

export const copy = {
  estaPosicion: "esta posición",
  positionExample: (
    current: string,
    contribution: string,
    years: number,
    final: string,
    real: boolean,
  ) =>
    `Con un saldo actual de ${current} y aportes de ${contribution} al mes durante ${years} ${years === 1 ? "año" : "años"}, este escenario daría ${final}${real ? " de poder de compra, tras descontar la inflación" : " de saldo futuro"}. La tasa usada puede no cumplirse.`,
  partsExample: (parts: string, total: string) =>
    `Con las cifras de tus posiciones (${parts}), el total sería ${total}. Las cantidades visibles están redondeadas.`,
  singlePositionInvestmentExplanation: `Esta inversión tiene una sola posición. Su total es el ${labels.projectedValue.toLowerCase()} de esa posición.`,
  noHayOtrasPosicionesQueSumar: "No hay otras posiciones que sumar.",
  investmentTotalCombinesPositionValues: `Para saber cuánto podrías tener en esta inversión, suma el saldo de todas sus posiciones.`,
  sumaElValorProyectadoDeCadaPosicion: `Suma el saldo futuro de cada posición.`,
  sustituyeLosImportesMostradosElTotalUsa:
    "Sustituye los importes mostrados; el total usa valores sin redondear.",
  sustituyeCadaPosicionPorSuImporteProyectado: "Usa la cantidad calculada para cada posición.",
  saldoSignificaElValorDeEstaPosicion:
    "Este saldo futuro es lo que podrías tener en esta posición. Cada mes primero se aplica la tasa anual convertida a mensual y después se suma tu aporte.",
  saldoRealSignificaElValorDeEstaPosicion: `El ${labels.projectedValueReal.toLowerCase()} muestra cuánto podría valer esta posición en poder de compra, después de descontar la inflación. Cada aporte se ajusta según la inflación acumulada hasta el mes en que se suma.`,
  buscaLaTasaMensualQueAplicadaDurante: `Convierte la tasa anual en una tasa para cada mes. Como cada mes parte del saldo anterior, no basta con dividirla entre 12.`,
  tasaMensualEquivalenteAPartirDeLa: `Tasa mensual equivalente a partir del ${labels.annualRate.toLowerCase()}`,
  tasaMensualEquivalente: "Tasa usada cada mes",
  sustitucionDeLaTasaAnualParaObtener: `Con la ${labels.annualRate.toLowerCase()} de esta inversión`,
  convierteElPlazoEnMesesParaSaber:
    "Convierte el plazo en meses para saber cuántas veces se aplicará la regla.",
  mesesDeProyeccionAPartirDelPlazo: "Meses que se calculan según el plazo",
  sustitucionDelPlazoParaObtenerLosMeses: "Con los años que elegiste",
  realAnnualRate: labels.realAnnualRate,
  fisherSubstitution: `Tasa anual ajustada, después de descontar inflación`,
  nominalContributionRule: "Así cambia el saldo cada mes",
  realContributionRule: "Así cambia el saldo en poder de compra cada mes",
  inflationAdjustedMonthlyContribution:
    "Ajusta cada aporte mensual por la inflación antes de sumarlo, para expresarlo en poder de compra.",
  nominalMonthlyContribution: "Suma el mismo aporte en dólares al final de cada mes.",
  miraComoElResultadoDeUnMes:
    "El saldo de cada mes inicia el siguiente. Los meses intermedios se calculan igual, aunque no aparezcan todos aquí. «≈» indica que los valores visibles están redondeados.",
} as const;
