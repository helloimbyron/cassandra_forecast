import { labels } from "@/features/Portfolio/presentation/copy/labels.constant";

export const copy = {
  intro: `Compara la ganancia o pérdida de esta inversión con su saldo actual. Los aportes futuros afectan el resultado, pero no la cantidad usada para dividir.`,
  description: `Divide la ganancia o pérdida entre el ${labels.currentCapital.toLowerCase()} y multiplica por 100.`,
  expressionLabel: `${labels.growth} ÷ ${labels.currentCapital} × 100`,
  noCurrentValue: `No se puede calcular porque el ${labels.currentCapital.toLowerCase()} de esta inversión es cero.`,
  substitutionDescription: "Usa las cantidades de esta inversión.",
  substitutionLabel: "Con las cantidades de esta inversión",
  example: (change: string, current: string, percent: string) =>
    `Con esta inversión: ${change} de resultado frente a ${current} de saldo actual da ${percent}. Los aportes futuros afectan el resultado, pero no se incluyen en la cantidad usada para dividir.`,
} as const;
