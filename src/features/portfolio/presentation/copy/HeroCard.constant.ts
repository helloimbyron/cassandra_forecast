import { FINANCIAL_TERM_VALUES } from "@/features/Portfolio/presentation/copy/financialTerm.enum";
import { labels } from "@/features/Portfolio/presentation/copy/labels.constant";

export const copy = {
  balances: "Balances",
  results: "Resultados",
  returnLabel: "Retorno",
  nominalValue: labels.projectedValueNominal,
  realValue: FINANCIAL_TERM_VALUES.PURCHASING_POWER,
  comparisonValues: "Poder de compra y saldo futuro",
  comparisonInfoTitle: "Por qué aparecen dos cantidades",
  comparisonInfoTrigger: "Entender la diferencia entre el saldo futuro y el poder de compra",
  comparisonInfoIntro:
    "Es el mismo saldo futuro visto de dos formas: el monto que podrías tener y lo que ese monto podría comprar después de descontar la inflación. No sumes ambas cifras.",
  contributionComparison: "Aportes futuros y su poder de compra",
  contributions: "Aportes",
  contributionsInfoTitle: "Cómo leer los aportes",
  contributionsInfoTrigger: "Entender los aportes y la inflación",
  contributionsInfoIntro: "No son dos grupos de aportes: es el mismo dinero visto de dos formas.",
  contributionsInfoExplanation:
    "La cifra de saldo futuro suma los dólares que aportarías. Poder de compra muestra cuánto podrían comprar esos mismos aportes después de descontar la inflación. No son aportes adicionales.",
  balanceComparisonExample: (nominal: string, real: string) =>
    `Por ejemplo, podrías tener ${nominal} al final; después de descontar la inflación, tendrían un poder de compra equivalente a ${real}. Es un escenario, no una promesa.`,
  contributionsComparisonExample: (nominal: string, real: string) =>
    `Si tus aportes futuros sumaran ${nominal}, su poder de compra actual equivaldría a ${real}. No sumes ambas cifras.`,
  nominalContributions: "Aportes que harías",
  nominalContributionsShort: "Total futuro",
  realContributionsShort: "Poder de compra",
  desgloseDeLaProyeccion: "De dónde sale el resultado",
  esLaDiferenciaEntreElValorFinal:
    "Al saldo futuro se le restan el saldo actual y los aportes que harías. Si el resultado es positivo, sería una ganancia; si es negativo, una pérdida.",
  growthExample: (final: string, current: string, contributions: string, result: string) =>
    `Con tus cifras: ${final} de saldo futuro menos ${current} de saldo actual y ${contributions} que aportarías da ${result}. Las cantidades mostradas están redondeadas.`,
  growthPercentExample: (result: string, current: string, percent: string) =>
    `Con tus cifras: ${result} de resultado frente a ${current} de saldo actual equivale a ${percent}. Los aportes futuros afectan la ganancia o pérdida, pero no se incluyen en la cantidad usada para dividir.`,
  separaElDineroQuePusisteDelValor:
    "Separa el saldo actual y los aportes futuros del saldo que podrías tener al final.",
  valorProyectadoMenosCapitalActualYAportes: `${labels.projectedValue} menos ${labels.currentCapital} y aportes futuros`,
  restaElCapitalActualYTodosLos: "Resta el saldo actual y todos los aportes futuros.",
  sustitucionDeValoresDelCrecimiento: "Con tus cantidades",
  mideElCrecimientoFrenteAlCapitalQue:
    "Compara la ganancia o pérdida con el saldo actual. Los aportes futuros afectan el resultado, pero no la cantidad usada para dividir.",
  usaElCapitalActualComoReferenciaNo:
    "Divide entre el saldo actual; no suma los aportes futuros en esa cantidad.",
  crecimientoDivididoParaCapitalActualPor100: `${labels.growth} ÷ ${labels.currentCapital} × 100`,
  sustituyeLosImportesYExpresaLaComparacion:
    "Sustituye los importes y expresa la comparación en porcentaje.",
  sustitucionDeValoresDelCrecimientoPorcentual: "Con tus cantidades, en porcentaje",
  anos: " años",
  plazoTotalAnos: "Plazo total, años",
  noCurrentCapital:
    "No hay capital actual: dividir entre cero no está definido, así que este porcentaje no se puede calcular.",
} as const;
