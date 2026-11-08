export function signedOutcomeLabel(value: number, context: "growth" | "invested" = "growth") {
  if (value > 0) {
    return context === "invested" ? "Ganancia sobre lo invertido" : "Ganancia";
  }
  if (value < 0) {
    return context === "invested" ? "Pérdida sobre lo invertido" : "Pérdida";
  }

  return "Resultado";
}
