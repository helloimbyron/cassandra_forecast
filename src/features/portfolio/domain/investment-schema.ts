import { z } from "zod";
import { holdingSchema } from "./holding-schema";
import { INVESTMENT_CATEGORIES } from "./investment-category";
import { MAX_ANNUAL_RATE_PCT, MIN_ANNUAL_RATE_PCT } from "./portfolio-constants";

export const investmentSchema = z.object({
  id: z.string().min(1),
  name: z.string().min(1),
  category: z.enum(INVESTMENT_CATEGORIES),
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

export type Investment = z.infer<typeof investmentSchema>;
