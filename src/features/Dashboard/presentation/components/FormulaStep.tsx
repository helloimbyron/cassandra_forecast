import * as veFormulaStepStyles from "./FormulaStep.css.ts";
import type { PropsWithChildren } from "react";

export function FormulaStep({ children }: PropsWithChildren) {
  return <li className={veFormulaStepStyles.formulaStep}>{children}</li>;
}
