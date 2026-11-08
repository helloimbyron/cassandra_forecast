import { labels } from "@/features/Portfolio/presentation/copy/labels.constant";
import { copy } from "@/features/Portfolio/presentation/copy/Footer.constant";

export function Footer() {

  return (
    <footer className="footer">
      <span>{labels.brand}</span>
      <a href="#inicio">{copy.volverArriba}</a>
    </footer>
  );
}
