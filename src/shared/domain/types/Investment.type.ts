import type { investmentSchema } from "@/shared/domain/types/investmentSchema.schema";
import type { z } from "zod";

export type Investment = z.infer<typeof investmentSchema>;
