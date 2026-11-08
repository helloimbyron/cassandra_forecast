export const copy = {
  headerActions: "Acciones del encabezado",
  cambiarJson: "Cambiar archivo de inversiones",
  cassandraInicio: "Cassandra, inicio",
  inflationMode: "Cómo mostrar el efecto de la inflación",
  withoutInflation: "Sin inflación",
  withInflation: "Con inflación",
  inflationSlider: "Inflación anual",
  inflationHelpTitle: "¿Qué cambia al descontar la inflación?",
  inflationHelpTrigger: "Explicar qué significa poder de compra",
  inflationHelp:
    "La inflación hace que una misma cantidad compre menos con el tiempo. «Sin inflación» muestra el saldo futuro sin descontar ese efecto. «Con inflación» muestra el poder de compra de esos mismos dólares después de descontarlo. La inflación sigue existiendo: solo cambia cómo se muestran las cifras. No cambia tus aportes. La inflación es un supuesto y el resultado no está garantizado.",
  inflationHelpExample: (rate: string, todayValue: string) =>
    `Ejemplo con la tasa actual: si la inflación fuera ${rate}, $100 dentro de un año tendrían el poder de compra actual de ${todayValue}.`,
  inflationSliderAriaLabel: "Inflación anual, porcentaje",
  inflationSourceAriaLabel: (rate: number) =>
    `Fuente de inflación inicial del JSON (${rate.toFixed(2)}%). Abrir fuente`,
} as const;
