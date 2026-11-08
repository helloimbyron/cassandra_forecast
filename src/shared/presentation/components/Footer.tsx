import { brandLabel } from "@/shared/presentation/constants/brand.constant";
import { copy } from "@/shared/presentation/constants/Footer.constant";

export function Footer() {
  return (
    <footer className="footer">
      <span>{brandLabel}</span>
      <a href="#inicio">{copy.volverArriba}</a>
    </footer>
  );
}
