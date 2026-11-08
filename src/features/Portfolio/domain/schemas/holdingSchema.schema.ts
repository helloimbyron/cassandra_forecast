import { z } from "zod";

export const holdingSchema = z.object({
  id: z.string().min(1),
  label: z.string().min(1),
  currentValue: z.number().nonnegative(),
  monthlyContribution: z.number().nonnegative().default(0),
});
