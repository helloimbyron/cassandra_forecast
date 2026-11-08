import { portfolioSchema } from "@/features/Portfolio/domain/schemas/portfolioSchema.schema";
import type { z } from "zod";

export type Portfolio = z.infer<typeof portfolioSchema>;
