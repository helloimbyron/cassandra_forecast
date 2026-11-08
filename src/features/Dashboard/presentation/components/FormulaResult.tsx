import { texText } from "@/features/Dashboard/presentation/utils/texText.util";
import { FormulaMath } from "@/features/Dashboard/presentation/components/FormulaMath";
import { copy } from "@/features/Dashboard/presentation/constants/FormulaResult.constant";

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
