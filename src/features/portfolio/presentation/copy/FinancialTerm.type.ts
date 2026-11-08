import type { FINANCIAL_TERM_VALUES } from "./financialTerm.enum";

export type FinancialTerm = (typeof FINANCIAL_TERM_VALUES)[keyof typeof FINANCIAL_TERM_VALUES];
