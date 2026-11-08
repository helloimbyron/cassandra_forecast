import { holdingSchema } from "./holdingSchema.schema";
import type { z } from "zod";

export type Holding = z.infer<typeof holdingSchema>;
