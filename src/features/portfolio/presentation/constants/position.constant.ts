import { FINANCIAL_TERM_VALUES } from "@/features/Portfolio/presentation/enums/financialTerm.enum";

export const positionCopy = {
  projectedValueFor: (name: string, real = false) =>
    `${real ? `${FINANCIAL_TERM_VALUES.PROJECTED_BALANCE} ajustado` : FINANCIAL_TERM_VALUES.PROJECTED_BALANCE} en “${name}”`,
} as const;
