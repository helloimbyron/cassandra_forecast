import { labels } from "@/features/Portfolio/presentation/constants/labels.constant";

export const copy = {
  posicion: "posición",
  posiciones: "posiciones",
  text40: "40",
  questionMark: "?",
  rateSource: (asOf?: string | null) =>
    `Ver de dónde sale la ${labels.annualRate.toLowerCase()}${asOf ? ` · ${asOf}` : ""}`,
  rateNote: (name: string) => `Leer nota de la ${labels.annualRate.toLowerCase()} de ${name}`,
  chartFor: (name: string, years: number) => `Cómo podría cambiar ${name} durante ${years} años`,
  seriesFor: (name: string) => `Líneas del gráfico de ${name}`,
  horizonFor: (name: string) => `Plazo de ${name}, años`,
  positionsFor: (name: string) => `Posiciones de ${name}`,
  contributionFor: (name: string) => `Aporte mensual para ${name}`,
} as const;
