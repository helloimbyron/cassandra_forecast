import { labels } from "../copy/labels";
import { copy } from "../copy/Footer";

export function Footer() {
  return (
    <footer className="footer">
      <span>{labels.brand}</span>
      <a href="#inicio">{copy.volverArriba}</a>
    </footer>
  );
}
