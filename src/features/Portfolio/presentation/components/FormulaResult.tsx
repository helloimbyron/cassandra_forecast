import { texText } from "@/features/Portfolio/presentation/utils/texText.util";
import { FormulaMath } from "@/features/Portfolio/presentation/components/FormulaMath";
import { copy } from "@/features/Portfolio/presentation/constants/FormulaResult.constant";

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
