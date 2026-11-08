import { z } from "zod";
import { investmentSchema } from "@/shared/domain/types/investmentSchema.schema";
import { PORTFOLIO_CONSTANTS } from "@/shared/domain/constants/portfolioConstants.constant";
import { portfolioMessages } from "@/shared/domain/types/portfolioMessages.constant";

// --- Constants ---

const {
  MAX_INFLATION_RATE_PCT,
  MIN_INFLATION_RATE_PCT,
  PORTFOLIO_CURRENCY,
  PORTFOLIO_SCHEMA_VERSION,
} = PORTFOLIO_CONSTANTS;

export const portfolioSchema = z
  .object({
    schemaVersion: z.literal(PORTFOLIO_SCHEMA_VERSION),
    currency: z.literal(PORTFOLIO_CURRENCY),
    asOf: z.string(),
    inflation: z.object({
      annualRatePct: z.number().min(MIN_INFLATION_RATE_PCT).max(MAX_INFLATION_RATE_PCT),
      note: z.string().min(1),
      source: z.object({
        url: z.url(),
        asOf: z.string().min(1),
      }),
    }),
    investments: z.array(investmentSchema).min(1),
  })
  .superRefine((portfolio, ctx) => {
    const investmentIds = new Set<string>();
    const holdingIds = new Set<string>();
    portfolio.investments.forEach((investment, investmentIndex) => {
      if (investmentIds.has(investment.id)) {
        ctx.addIssue({
          code: "custom",
          message: portfolioMessages.duplicateInvestment(investment.id),
          path: ["investments", investmentIndex, "id"],
        });
      }
      investmentIds.add(investment.id);
      investment.holdings.forEach((holding, holdingIndex) => {
        if (holdingIds.has(holding.id)) {
          ctx.addIssue({
            code: "custom",
            message: portfolioMessages.duplicateHolding(holding.id),
            path: ["investments", investmentIndex, "holdings", holdingIndex, "id"],
          });
        }
        holdingIds.add(holding.id);
      });
    });
  });
