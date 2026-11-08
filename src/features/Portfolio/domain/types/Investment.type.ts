import { investmentSchema } from "@/features/Portfolio/domain/schemas/investmentSchema.schema";
import type { z } from "zod";

export type Investment = z.infer<typeof investmentSchema>;
