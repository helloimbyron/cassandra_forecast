import { FinancialTerm } from "./labels";

export const positionCopy = {
  projectedValueFor: (name: string, real = false) =>
    `${real ? `${FinancialTerm.ProjectedBalance} ajustado` : FinancialTerm.ProjectedBalance} en “${name}”`,
} as const;
