import { z } from "zod";
import { holdingSchema } from "@/shared/domain/schemas/holdingSchema.schema";
import { INVESTMENT_CATEGORY_VALUES } from "@/shared/domain/types/investmentCategory.enum";
import { PORTFOLIO_CONSTANTS } from "@/shared/domain/constants/portfolioConstants.constant";

// --- Constants ---

const { MAX_ANNUAL_RATE_PCT, MIN_ANNUAL_RATE_PCT } = PORTFOLIO_CONSTANTS;

export const investmentSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  category: z.enum(INVESTMENT_CATEGORY_VALUES),
  annualRatePct: z.number().gt(MIN_ANNUAL_RATE_PCT).lte(MAX_ANNUAL_RATE_PCT),
  rateNote: z.string().nullable().optional(),
  rateSource: z
    .object({
      url: z.url().or(z.literal("")).nullable().optional(),
      asOf: z.string().nullable().optional(),
    })
    .nullable()
    .optional(),
  holdings: z.array(holdingSchema).min(1),
});
