import type { investmentSchema } from "@/shared/domain/portfolio/investmentSchema.schema";
import type { z } from "zod";

export type Investment = z.infer<typeof investmentSchema>;
