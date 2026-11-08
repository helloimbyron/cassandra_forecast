export const portfolioMessages = {
  horizonRange: "El plazo debe ser de 0 a 40 años.",
  annualRateRange: "La tasa anual no puede ser -100 % ni menor.",
  duplicateInvestment: (id: string) => `Hay dos inversiones con el mismo ID: ${id}`,
  duplicateHolding: (id: string) => `Hay dos posiciones de una inversión con el mismo ID: ${id}`,
} as const;
