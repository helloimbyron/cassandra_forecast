import { brandLabel } from "@/shared/presentation/brand.constant";
import { copy } from "@/shared/presentation/Footer.constant";

export function Footer() {
  return (
    <footer className="footer">
      <span>{brandLabel}</span>
      <a href="#inicio">{copy.volverArriba}</a>
    </footer>
  );
}
