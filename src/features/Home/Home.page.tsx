import { IntroSection } from "@/features/Home/IntroSection";
import { ImportSection } from "@/features/Home/ImportSection";
import type { PortfolioImportController } from "@/shared/presentation/types/PortfolioImportController.type";

export function HomePage({ model }: { model: PortfolioImportController }) {
  return (
    <>
      <IntroSection />
      <ImportSection model={model} />
    </>
  );
}

