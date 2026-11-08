import { labels } from "@/features/Portfolio/presentation/constants/labels.constant";
import { copy } from "@/features/Portfolio/presentation/constants/Footer.constant";

export function Footer() {

  return (
    <footer className="footer">
      <span>{labels.brand}</span>
      <a href="#inicio">{copy.volverArriba}</a>
    </footer>
  );
}
