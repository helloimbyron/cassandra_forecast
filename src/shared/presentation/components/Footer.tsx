import * as veFooterStyles from "./Footer.css.ts";
import { brandLabel } from "@/shared/presentation/copies/brand.copy";
import { footerCopy } from "@/shared/presentation/copies/footer.copy";

export function Footer() {
  return (
    <footer className={[veFooterStyles.footer, "footer"].filter(Boolean).join(" ")}>
      <span>{brandLabel}</span>
      <a href="#inicio">{footerCopy.backToTop}</a>
    </footer>
  );
}
