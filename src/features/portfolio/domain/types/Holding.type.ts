import { holdingSchema } from "@/features/Portfolio/domain/schemas/holdingSchema.schema";
import type { z } from "zod";

export type Holding = z.infer<typeof holdingSchema>;
