import { labels } from "@/features/Portfolio/presentation/constants/labels.constant";

export const copy = {
  seComparanLosCrecimientosDeTodosLos:
    "Compara cuánto ganarías en cada inversión. Solo se destaca una que muestre una ganancia positiva.",
  calculateEachInvestmentGrowthFirst:
    "En cada inversión, resta al saldo final el dinero que ya tenías y los aportes que harías.",
  eachInvestmentGrowthEqualsValue: `${labels.growth} de cada inversión = ${labels.projectedValue} − ${labels.currentValue} − ${labels.totalContributed}`,
  comparaLosResultadosSiDosParecenIguales:
    "Compara las ganancias. Si dos parecen iguales, se comparan sus cantidades sin redondear.",
  seEligeElMaximoEntreLosCrecimientos:
    "Se elige la ganancia positiva más alta entre las inversiones",
  positiveInvestmentGrowths: "Ganancias positivas de las inversiones",
  growthByInvestment: "Resultado por inversión",
  noInvestmentHasPositiveGrowth:
    "Ninguna inversión muestra una ganancia positiva; por eso no hay una que destacar.",
} as const;
