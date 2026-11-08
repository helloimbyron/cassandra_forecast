import { labels } from "./labels";

export const copy = {
  indicadoresDeCartera: "Otras formas de entender el resultado",
  comparaElCrecimientoOLaPerdidaCon:
    "Compara la ganancia o pérdida con el saldo actual más los aportes futuros. No es una tasa anual ni el costo original de compra.",
  investedExample: (
    current: string,
    contributions: string,
    total: string,
    change: string,
    percent: string,
  ) =>
    `Con tus cifras, ${current} de saldo actual más ${contributions} de aportes futuros suman ${total}. Comparar la ganancia o pérdida de ${change} con esa suma da ${percent}. Esta referencia no es el costo original de compra. Las cifras están redondeadas.`,
  annualExample: (
    current: string,
    monthly: string,
    final: string,
    percent: string,
    real: boolean,
  ) =>
    `Con un saldo actual de ${current}, aportes de ${monthly} al mes y un saldo final${real ? " expresado en poder de compra" : ""} de ${final}, el rendimiento anual de toda la cartera sería ${percent}. También importa cuándo entra cada aporte${real ? "; este cálculo descuenta la inflación" : ""}.`,
  primeroSumaTodoElDineroQueHabras:
    "Suma el saldo actual y los aportes futuros. Esta referencia no es el costo original de compra.",
  totalInvertidoIgualACapitalActualMas: `${labels.totalInvested} = ${labels.currentCapital} + ${labels.plannedContributions}`,
  sustitucionDelTotalInvertido: "Con tus cantidades",
  comparaElCrecimientoConEseTotalY:
    "Después divide la ganancia o pérdida entre ese total y multiplícala por 100. Este porcentaje no compara con el precio que pagaste originalmente.",
  crecimientoDivididoParaTotalInvertidoPorCien: `${labels.growth} ÷ ${labels.totalInvested} × 100`,
  sustitucionDeValoresDeLaGananciaSobre: `Con tus cantidades: ${labels.returnOnInvestment.toLowerCase()}`,
  sumaDeAportesMensualesPorPosicion:
    "La suma de lo que agregarías cada mes a todas tus inversiones.",
  noCalculableHoy: "Todavía no hay tiempo transcurrido",
  anualizadoConAportesMensuales:
    "Muestra el ritmo anual de este escenario. Tiene en cuenta cuándo harías cada aporte; no es un promedio simple ni garantiza ganancias.",
  gananciaAcumuladaSobreInvertido: (years: number) =>
    years === 0
      ? "Cambio total hasta hoy; no es una tasa anual."
      : `Cambio total durante ${years} ${years === 1 ? "año" : "años"}; no es una tasa anual.`,
  saldoSignificaElValorDeTodaTu:
    "Esta cifra resume el cambio de toda tu cartera como si ocurriera a un ritmo anual constante. Considera cuándo entra cada aporte; no es el promedio de las tasas de tus inversiones ni una garantía.",
  saldoRealSignificaElValorDeTodaTu:
    "El rendimiento anual ajustado resume el ritmo anual de toda tu cartera después de descontar la inflación. Considera cuándo entra cada aporte; no es el promedio de las tasas de tus inversiones ni una garantía.",
  hoyNoHanTranscurridoMesesParaCalcular: "Hoy no han transcurrido meses para calcular una tasa.",
  expresaElHorizonteEnMesesCadaAno: "Expresa el plazo en meses: cada año tiene doce.",
  mesesDeProyeccionIgualAPlazoTotal: `Meses de proyección = ${labels.horizon} × 12`,
  meses: "Meses",
  sustitucionDelPlazoEnAnos: "Con el plazo que elegiste",
  alFinalDeCadaMesPrimeroSe:
    "Cada mes, primero cambia el saldo según la tasa y después se suma tu aporte. En el siguiente mes también cuenta el cambio del mes anterior.",
  realContributionStep:
    "Cada mes, el saldo cambia según la tasa y luego se suma el aporte ajustado por la inflación, para expresarlo en poder de compra.",
  reglaDelSaldoMensual: "Regla del saldo mensual",
  laAppPruebaYAjustaLaTasa: "La app busca un ritmo mensual que, después de ",
  mesesElSaldoCoincideConElValor: `meses, el ${labels.projectedValue.toLowerCase()} coincida con el saldo final.`,
  sigueElValorDeLaCarteraCada:
    "Sigue el saldo de la cartera: cada resultado inicia el mes siguiente. Entre los meses mostrados, se repite la misma operación. «≈» indica que los valores visibles están redondeados.",
  convierteEsaTasaMensualEnUnaTasa:
    "Muestra el ritmo de 12 meses seguidos. Cada mes parte del resultado del anterior: por eso no basta con multiplicar por 12.",
  formulaDeTasaAnualEquivalente: `Fórmula de ${labels.annualReturn}`,
  sustitucionDeTasaAnualEquivalente: `Con tus cifras: ${labels.annualReturn}`,
  sinCrecimientoPositivoEnEstePlazo: "Ninguna inversión muestra una ganancia positiva",
  noInvestedCapital:
    "El saldo actual más los aportes es cero: no se puede dividir entre cero, así que este porcentaje no se calcula.",
  noRateAvailable:
    "No hay datos suficientes para calcular la tasa: se necesita un saldo final positivo y un saldo actual o aportes.",
} as const;
