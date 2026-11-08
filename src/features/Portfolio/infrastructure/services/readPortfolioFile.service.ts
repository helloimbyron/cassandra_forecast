import { portfolioSchema } from "@/features/Portfolio/domain/schemas/portfolioSchema.schema";
import type { Portfolio } from "@/features/Portfolio/domain/types/Portfolio.type";
import { PORTFOLIO_CONSTANTS } from "@/features/Portfolio/domain/constants/portfolioConstants.constant";
import { importMessages } from "@/features/Portfolio/infrastructure/constants/importMessages.constant";

// --- Constants ---

const { MAX_IMPORT_BYTES } = PORTFOLIO_CONSTANTS;

// --- Utils ---

export async function readPortfolioFile(file: File): Promise<Portfolio> {
  if (file.size > MAX_IMPORT_BYTES) {
    throw new Error(importMessages.tooLarge);
  }
  if (!file.name.toLowerCase().endsWith(".json")) {
    throw new Error(importMessages.wrongExtension);
  }
  const parsed: unknown = JSON.parse(await file.text());
  const result = portfolioSchema.safeParse(parsed);
  if (!result.success) {
    const first = result.error.issues[0];
    const where = first?.path.length ? ` (${first.path.join(" → ")})` : "";

    throw new Error(`${first?.message ?? importMessages.invalidShape}${where}`);
  }

  return result.data;
}
