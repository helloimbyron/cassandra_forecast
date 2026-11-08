import type { holdingSchema } from "@/shared/domain/portfolio/holdingSchema.schema";
import type { z } from "zod";

export type Holding = z.infer<typeof holdingSchema>;
