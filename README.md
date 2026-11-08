# Cassandra · visualizador de inversiones

Sitio estático con Astro, React, shadcn/ui y Recharts para explorar proyecciones compuestas desde un JSON local.

## Ejecutar localmente

Requiere Node.js 22.23.4 o posterior.

```sh
pnpm install
pnpm dev
```

Abre la dirección local indicada por Astro. Para generar la web estática en `dist/`:

```sh
pnpm build
pnpm preview
```

## Importar tu cartera

Desde la pantalla inicial (`/`), selecciona tu propio JSON. Tras cargarlo, la aplicación abre `/dashboard`; la marca Cassandra vuelve a `/` y descarta la cartera. La ruta `/dashboard` abierta directamente muestra el JSON público de ejemplo, mientras que recargarla vuelve a `/`. Las carteras importadas solo viven en memoria y no se guardan en el navegador. El archivo inicial está en `data/portfolio.json`. **La carpeta `data/` está excluida de Git y ese archivo no se incluye en `dist/`.** No lo subas a un alojamiento público.

`public/portfolio.example.json` es un ejemplo ilustrativo para explorar la app o descargar el formato. «Mostrar Ejemplo» carga esa cartera en el dashboard; el enlace inferior descarga el JSON. Los rendimientos del ejemplo son supuestos para comparar escenarios, no ofertas ni recomendaciones financieras. Las notas de cada inversión enlazan fuentes públicas y aclaran si la cifra procede de un tarifario o es una hipótesis editable. Por ejemplo, el BCE publica un promedio de ahorro, no un rendimiento garantizado para cada cuenta; el 5% de Bitcoin es un supuesto fijo, no una predicción de su precio volátil. Los $8,33 mensuales de los plazos fijos suman $99,96 al año; el modelo no simula un depósito único anual de $100.

El selector del encabezado alterna entre **Sin inflación** (valores nominales; predeterminado) y **Con inflación** (USD de hoy). En el segundo modo, los rendimientos se convierten con la relación de Fisher y los aportes mensuales nominales fijos se descuentan según el mes en que ocurren. La inflación del archivo es 2,1%, basada en el promedio proyectado por el BCE para 2026; se mantiene constante solo como supuesto ilustrativo, no como pronóstico a largo plazo. El enlace «Inflación» abre esa fuente.

El formato v1 requiere:

- `schemaVersion: 1`, `currency: "USD"`, una fecha `asOf`, `inflation` y una lista `investments`. Las importaciones v2 o sin el objeto `inflation` se rechazan.
- `inflation` incluye `annualRatePct`, una nota explicativa y `source` con `url` y `asOf`.
- Cada inversión lleva `id`, `name`, categoría (`policy`, `business`, `savings`, `etf`, `commodity`, `crypto`, `cash` u `other`), `annualRatePct` y una o más posiciones en `holdings`.
- Cada posición tiene `id`, `label`, `currentValue` y `monthlyContribution` (opcional; por defecto 0).
- `rateSource` y `rateNote` son opcionales y sirven para documentar el supuesto de rentabilidad.

Cada inversión usa un supuesto de rendimiento efectivo anual nominal. El cálculo aplica su rendimiento mensual equivalente y agrega el aporte al final de cada mes. Los controles de tasa, aporte y plazo cambian solo el saldo proyectado; no modifican el JSON en disco. La sección de retiros usa saldos y rendimientos del modo seleccionado; en modo real, el retiro mantiene su poder adquisitivo en USD de hoy. El porcentaje anual de retiro se calcula sobre el saldo al iniciar los retiros y el monto mensual resultante permanece fijo. No se modelan impuestos, comisiones ni variaciones de mercado.

## Sistema visual

La interfaz usa una sola familia, **Geist Variable**, y parte del modo oscuro. El modo claro conserva
los mismos roles semánticos y puede elegirse desde el encabezado. Tailwind Preflight normaliza los
estilos del navegador; las reglas base de Cassandra se añaden encima, sin un segundo reset.

Las decisiones visuales se definen en `src/design-system/styles/tokens.css`: paletas, escala tipográfica,
espaciados, dimensiones de componentes, grosores, radios, movimiento y capas. Los estilos de
secciones y los componentes consumen esos tokens, no valores improvisados. Las únicas medidas
literales de las hojas de estilo son las condiciones de los cuatro breakpoints mobile-first
(30, 46, 66 y 74 rem), porque CSS no permite usar variables personalizadas dentro de media queries;
una prueba comprueba que coincidan con los tokens documentados. Las posiciones calculadas a partir
de datos de una gráfica no son decisiones del sistema visual.

Las pruebas comprueban el contraste de ambos temas y rechazan colores, medidas e iconos ad hoc
fuera del sistema. Valida también el diseño a 320 px, el foco de teclado y el aumento de texto.

## Comprobaciones

```sh
pnpm test
pnpm test:e2e
pnpm check
pnpm lint
pnpm lint:styles
pnpm build
```

La proyección es ilustrativa, no una garantía ni asesoramiento financiero. Las rentabilidades pasadas no predicen resultados futuros.
