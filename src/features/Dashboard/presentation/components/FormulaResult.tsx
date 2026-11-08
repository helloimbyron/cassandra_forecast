import { texText } from "@/features/Dashboard/presentation/utils/texText.util";
import { FormulaMath } from "@/features/Dashboard/presentation/components/FormulaMath";
import { formulaResultCopy } from "@/features/Dashboard/presentation/copies/formulaResult.copy";

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
      label={formulaResultCopy.label(name, value, rounded)}
      tex={`${texText(name)} ${rounded ? "\\approx" : "="} ${texText(value)}`}
    />
  );
}
