import * as veHeaderStyles from "./Header.css.ts";
import { brandLabel } from "@/shared/presentation/copies/brand.copy";
import { headerCopy } from "@/shared/presentation/copies/header.copy";
import { Upload } from "lucide-react";
import { BrandMark } from "@/shared/presentation/components/BrandMark";
import { ThemeToggle } from "@/shared/presentation/components/ThemeToggle";
import { Button } from "@/libraries/shadcn/components/Button";
import type { MouseEvent, ReactNode } from "react";

// --- Components ---

export function Header({
  onNavigateHome,
  homeHref,
  onChangeJson,
  projectionControls,
}: {
  onNavigateHome: () => void;
  homeHref: string;
  onChangeJson?: () => void;
  projectionControls?: ReactNode;
}) {
  // --- Handlers ---

  function handleBrandClick(event: MouseEvent<HTMLAnchorElement>) {
    if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) {
      return;
    }
    event.preventDefault();
    onNavigateHome();
  }

  // --- Return ---

  return (
    <header
      className={[
        veHeaderStyles.topbar,
        `topbar${projectionControls ? " has-projection-controls" : ""}`,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      <div className={[veHeaderStyles.brandGroup, "brand-group"].filter(Boolean).join(" ")}>
        <a
          className={[veHeaderStyles.brand, "brand"].filter(Boolean).join(" ")}
          href={homeHref}
          onClick={handleBrandClick}
          aria-label={headerCopy.cassandraHome}
        >
          <span className={veHeaderStyles.brandMark}>
            <BrandMark />
          </span>
          <span>{brandLabel}</span>
        </a>
      </div>
      {projectionControls}
      <div
        className={veHeaderStyles.topbarActions}
        role="group"
        aria-label={headerCopy.headerActions}
      >
        {onChangeJson && (
          <Button
            type="button"
            variant="outline"
            size="icon"
            className={veHeaderStyles.changeJsonToggle}
            onClick={onChangeJson}
            aria-label={headerCopy.changePortfolioFile}
            title={headerCopy.changePortfolioFile}
          >
            <Upload aria-hidden="true" />
          </Button>
        )}
        <ThemeToggle />
      </div>
    </header>
  );
}
