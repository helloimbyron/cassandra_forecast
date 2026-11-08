import { portfolioSchema } from "./portfolioSchema.schema";
import type { z } from "zod";

export type Portfolio = z.infer<typeof portfolioSchema>;
