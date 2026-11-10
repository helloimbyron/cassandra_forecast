import { brandSymbol } from "./BrandMark.css.ts";
import { PiggyBank } from "lucide-react";

export function BrandMark() {
  return <PiggyBank className={brandSymbol} aria-hidden="true" />;
}
