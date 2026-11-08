import { investmentSchema } from "./investmentSchema.schema";
import type { z } from "zod";

export type Investment = z.infer<typeof investmentSchema>;
