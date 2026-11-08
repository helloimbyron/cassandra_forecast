import type { FINANCIAL_TERM_VALUES } from "@/features/Dashboard/domain/enums/financialTerm.enum";

export type FinancialTerm = (typeof FINANCIAL_TERM_VALUES)[keyof typeof FINANCIAL_TERM_VALUES];
