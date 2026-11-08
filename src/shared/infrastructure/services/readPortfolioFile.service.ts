import { portfolioSchema } from "@/shared/domain/schemas/portfolioSchema.schema";
import type { Portfolio } from "@/shared/domain/types/Portfolio.type";
import { PORTFOLIO_CONSTANTS } from "@/shared/domain/constants/portfolioConstants.constant";
import { importMessages } from "@/shared/infrastructure/copies/importMessages.copy";

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
    const message = first?.code === "custom" ? first.message : importMessages.invalidShape;

    throw new Error(`${message}${where}`);
  }

  return result.data;
}
