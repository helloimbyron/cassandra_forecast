import { texText } from "../utils/texText";
import { FormulaMath } from "./FormulaMath";
import { copy } from "../copy/FormulaResult";

export function FormulaResult({
  name,
  value,
  rounded = false,
}: {
  name: string;
  value: string;
  rounded?: boolean;
}) {
  return (
    <FormulaMath
      className="formula-math-result"
      label={copy.label(name, value, rounded)}
      tex={`${texText(name)} ${rounded ? "\\approx" : "="} ${texText(value)}`}
    />
  );
}
