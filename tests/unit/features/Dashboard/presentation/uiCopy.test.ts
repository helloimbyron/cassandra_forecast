import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import ts from "typescript";
import { describe, expect, it } from "vitest";
import { FINANCIAL_TERM_VALUES } from "@/features/Dashboard/presentation/enums/financialTerm.enum";
import { labels } from "@/features/Dashboard/presentation/constants/labels.constant";
import { projectedBalanceLabel } from "../../../../../src/features/Dashboard/presentation/utils/projectedBalanceLabel.util";
import { signedOutcomeLabel } from "../../../../../src/features/Dashboard/presentation/utils/signedOutcomeLabel.util";
import { copy as heroCopy } from "@/features/Dashboard/presentation/constants/HeroCard.constant";
import { copy as headerCopy } from "@/shared/presentation/constants/Header.constant";
import { copy as distributionCopy } from "@/features/Dashboard/presentation/constants/DistributionSection.constant";
import { copy as formulaResultCopy } from "@/features/Dashboard/presentation/constants/FormulaResult.constant";
import { copy as tableCopy } from "@/features/Dashboard/presentation/constants/TableSection.constant";
import { projectedPositionLabel } from "../../../../../src/features/Dashboard/presentation/utils/projectedPositionLabel.util";

function collectTypeScriptFiles(directory: string): string[] {
  return readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const path = join(directory, entry.name);
    if (entry.isDirectory()) {
      return collectTypeScriptFiles(path);
    }

    return /\.tsx?$/.test(entry.name) ? [path] : [];
  });
}

function resolveTypeScriptImport(importer: string, modulePath: string) {
  const base = resolve(dirname(importer), modulePath);

  return [base, `${base}.ts`, `${base}.tsx`, join(base, "index.ts"), join(base, "index.tsx")].find(
    (path) => existsSync(path),
  );
}

function findUnusedCopyCatalogKeys(copyCatalogPaths: string[], consumerPaths: string[]) {
  const references = new Map<string, Set<string>>();
  for (const path of consumerPaths) {
    const source = ts.createSourceFile(
      path,
      readFileSync(path, "utf8"),
      ts.ScriptTarget.Latest,
      true,
      path.endsWith(".tsx") ? ts.ScriptKind.TSX : ts.ScriptKind.TS,
    );
    const aliases = new Map<string, string>();
    for (const statement of source.statements) {
      if (!ts.isImportDeclaration(statement) || !ts.isStringLiteral(statement.moduleSpecifier)) {
        continue;
      }
      const resolvedPath = resolveTypeScriptImport(path, statement.moduleSpecifier.text);
      if (!resolvedPath || !statement.importClause || !statement.importClause.namedBindings) {
        continue;
      }
      const namedBindings = statement.importClause.namedBindings;
      if (!ts.isNamedImports(namedBindings)) {
        continue;
      }
      for (const element of namedBindings.elements) {
        if (
          element.propertyName?.text === "copy" ||
          (!element.propertyName && element.name.text === "copy")
        ) {
          aliases.set(element.name.text, resolvedPath);
        }
      }
    }
    const visit = (node: ts.Node) => {
      if (
        ts.isPropertyAccessExpression(node) &&
        ts.isIdentifier(node.expression) &&
        aliases.has(node.expression.text)
      ) {
        const target = aliases.get(node.expression.text)!;
        const usedKeys = references.get(target) ?? new Set<string>();
        usedKeys.add(node.name.text);
        references.set(target, usedKeys);
      }
      ts.forEachChild(node, visit);
    };
    visit(source);
  }

  return copyCatalogPaths.flatMap((path) => {
    const source = ts.createSourceFile(
      path,
      readFileSync(path, "utf8"),
      ts.ScriptTarget.Latest,
      true,
      ts.ScriptKind.TS,
    );
    const keys: string[] = [];
    const visit = (node: ts.Node) => {
      if (
        ts.isVariableDeclaration(node) &&
        ts.isIdentifier(node.name) &&
        node.name.text === "copy" &&
        node.initializer &&
        ts.isObjectLiteralExpression(node.initializer)
      ) {
        for (const property of node.initializer.properties) {
          if (ts.isPropertyAssignment(property) || ts.isMethodDeclaration(property)) {
            const name = property.name;
            if (ts.isIdentifier(name) || ts.isStringLiteral(name)) {
              keys.push(name.text);
            }
          }
        }
      }
      ts.forEachChild(node, visit);
    };
    visit(source);
    const usedKeys = references.get(path) ?? new Set<string>();

    return keys.filter((key) => !usedKeys.has(key)).map((key) => `${path}:${key}`);
  });
}

const componentDirs = [
  new URL("../../../../../src/features/Dashboard/presentation/components/", import.meta.url),
  new URL("../../../../../src/features/Dashboard/presentation/components/money/", import.meta.url),
];
const visibleAttributes = new Set([
  "aria-label",
  "title",
  "label",
  "intro",
  "note",
  "name",
  "placeholder",
]);

describe("UI copy catalogs", () => {
  it("uses clear labels for the inflation toggle and explains both display modes", () => {
    expect(headerCopy.withoutInflation).toBe("Sin inflación");
    expect(headerCopy.withInflation).toBe("Con inflación");
    expect(headerCopy.inflationHelp).toContain("La inflación sigue existiendo");
    expect(headerCopy.inflationHelp).toContain("solo cambia cómo se muestran las cifras");
    expect(headerCopy.inflationHelp).toContain("saldo futuro");
    expect(headerCopy.inflationHelp).toContain("poder de compra");
  });

  it("keeps static visible text outside component markup", () => {
    const violations: string[] = [];
    for (const dir of componentDirs) {
      for (const file of readdirSync(dir).filter((name) => name.endsWith(".tsx"))) {
        const source = ts.createSourceFile(
          file,
          readFileSync(join(fileURLToPath(dir), file), "utf8"),
          ts.ScriptTarget.Latest,
          true,
          ts.ScriptKind.TSX,
        );
        const visit = (node: ts.Node) => {
          if (ts.isJsxText(node) && node.getText(source).trim()) {
            violations.push(`${file}: JSX text`);
          }
          if (
            ts.isJsxAttribute(node) &&
            visibleAttributes.has(node.name.getText(source)) &&
            node.initializer &&
            ts.isStringLiteral(node.initializer)
          ) {
            violations.push(`${file}: ${node.name.getText(source)}`);
          }
          ts.forEachChild(node, visit);
        };
        visit(source);
      }
    }
    expect(violations).toEqual([]);
  });

  it("uses one canonical vocabulary for financial terms and projection modes", () => {
    expect(labels.projectedValue).toBe(FINANCIAL_TERM_VALUES.PROJECTED_BALANCE);
    expect(labels.projectedValueNominal).toBe("Saldo futuro");
    expect(labels.projectedValueReal).toBe("Saldo futuro ajustado");
    expect(projectedBalanceLabel(false)).toBe(labels.projectedValueNominal);
    expect(projectedBalanceLabel(true)).toBe(labels.projectedValueReal);
    expect(labels.annualRate).toBe(FINANCIAL_TERM_VALUES.EFFECTIVE_ANNUAL_RETURN);
    expect(labels.annualRate).toBe("Tasa anual");
    expect(labels.annualReturn).toBe("Rendimiento anual de toda tu cartera");
    expect(labels.realAnnualReturn).toBe("Rendimiento anual ajustado");
    expect(labels.totalInvested).toBe("Saldo actual + aportes");
    expect(labels.returnOnInvestment).toBe(FINANCIAL_TERM_VALUES.GAIN_ON_INVESTED);
    expect(labels.returnOnInvestment).toBe("Ganancia/Pérdida sobre lo invertido");
    expect(heroCopy.nominalValue).toBe(labels.projectedValueNominal);
    expect(heroCopy.realValue).toBe(FINANCIAL_TERM_VALUES.PURCHASING_POWER);
    expect(distributionCopy.annualReturn).toBe(labels.annualRate);
    expect(distributionCopy.realAnnualReturn).toBe(labels.realAnnualRate);
    expect(distributionCopy.initialTotalLabel).toBe(labels.projectedValue);
    expect(distributionCopy.annualRate).toContain("saldo futuro");
    expect(distributionCopy.percentNote).toContain("mismo monto cada mes");
    expect(distributionCopy.realMonthlyWithdrawal).toBe("Retiro mensual ajustado");
    expect(distributionCopy.chartTitle(false)).toBe("Saldo futuro después de los retiros");
    expect(distributionCopy.chartTitle(true)).toContain("Saldo futuro ajustado");
    expect(headerCopy.withoutInflation).toBe("Sin inflación");
    expect(headerCopy.withInflation).toBe("Con inflación");
    expect(headerCopy.inflationHelp).toContain("La inflación sigue existiendo");
    expect(headerCopy.inflationHelp).toContain("solo cambia cómo se muestran las cifras");
    expect(headerCopy.inflationHelp).toContain("saldo futuro");
    expect(headerCopy.inflationHelp).toContain("poder de compra");
    expect(tableCopy.tablaProyeccionAccesible(labels.projectedValueNominal)).toContain(
      labels.projectedValueNominal,
    );
    expect(projectedPositionLabel("Ahorro", true)).toBe("Saldo futuro ajustado en “Ahorro”");
    expect(signedOutcomeLabel(1)).toBe("Ganancia");
    expect(signedOutcomeLabel(-1)).toBe("Pérdida");
    expect(signedOutcomeLabel(0)).toBe("Resultado");
    expect(signedOutcomeLabel(-1, "invested")).toBe("Pérdida sobre lo invertido");
    expect(signedOutcomeLabel(0, "invested")).toBe("Resultado");
    expect(distributionCopy.annualRate).toBe("Retiro anual del saldo futuro (%)");
    expect(labels.realAnnualRate).toBe("Tasa anual ajustada");
  });

  it("avoids approximate and estimated wording in first-party interface copy", () => {
    const copyPaths = readdirSync(
      fileURLToPath(
        new URL("../../../../../src/features/Dashboard/presentation/constants/", import.meta.url),
      ),
    )
      .filter((name) => name.endsWith(".ts"))
      .map((name) =>
        join(
          fileURLToPath(
            new URL(
              "../../../../../src/features/Dashboard/presentation/constants/",
              import.meta.url,
            ),
          ),
          name,
        ),
      );
    const auditedPaths = [
      ...copyPaths,
      fileURLToPath(new URL("../../../../../src/app/copy/site.constant.ts", import.meta.url)),
      fileURLToPath(
        new URL(
          "../../../../../src/shared/infrastructure/constants/importMessages.constant.ts",
          import.meta.url,
        ),
      ),
      fileURLToPath(
        new URL(
          "../../../../../src/shared/domain/types/portfolioMessages.constant.ts",
          import.meta.url,
        ),
      ),
    ];
    const contents = auditedPaths.map((path) => readFileSync(path, "utf8"));
    const allText = contents.join("\n");
    expect(allText.match(/(?:aproxim\p{L}*|estim\p{L}*)/giu)).toBeNull();
    expect(allText).not.toMatch(/dinero de hoy|resultado frente a todo lo invertido/iu);
    expect(allText).not.toMatch(
      /(?:una sola parte|(?:tus|sus|todas las) partes|partes de una inversión)/iu,
    );
    expect(formulaResultCopy.label("Saldo que podrías tener", "$100", true)).toContain(
      "cifras visibles están redondeadas",
    );
    expect(formulaResultCopy.label("Saldo que podrías tener", "$100", true)).not.toContain(
      "aproximadamente",
    );
  });

  it("uses live scenario figures in beginner examples without promising a result", () => {
    expect(headerCopy.inflationHelpExample("2%", "$98,04")).toContain("$100");
    expect(headerCopy.inflationHelpExample("2%", "$98,04")).toContain("$98,04");
    expect(heroCopy.growthExample("$900", "$1.000", "$0", "-$100")).toContain("-$100");
    expect(distributionCopy.monthlyExample("$12.000", "4%", "$40")).toContain("$40");
    expect(distributionCopy.durationExample("$40", "El dinero duraría hasta 2 años")).toContain(
      "No es una garantía",
    );
  });

  it("keeps every first-party copy catalog entry in use", () => {
    const copyRoot = fileURLToPath(
      new URL("../../../../../src/features/Dashboard/presentation/constants/", import.meta.url),
    );
    const copyPaths = readdirSync(copyRoot)
      .filter((name) => name.endsWith(".ts"))
      .map((name) => join(copyRoot, name));
    const sourcePaths = [
      ...collectTypeScriptFiles(fileURLToPath(new URL("../../../../../src/", import.meta.url))),
      ...collectTypeScriptFiles(fileURLToPath(new URL("./", import.meta.url))),
    ];
    expect(findUnusedCopyCatalogKeys(copyPaths, sourcePaths)).toEqual([]);
  });
});
