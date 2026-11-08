export const moneyCopy = {
  fullAmount: (full: string) => `Cantidad completa: ${full}`,
  abbreviatedAmount: (abbreviated: string, full: string) =>
    `Se muestra ${abbreviated}; la cantidad completa es ${full}`,
  abbreviatedValue: (abbreviated: string, full: string) =>
    `Se muestra ${abbreviated}; el valor completo es ${full}`,
} as const;
