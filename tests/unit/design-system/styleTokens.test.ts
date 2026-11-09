import { readFileSync } from "node:fs";
import { describe, expect, it } from "vitest";

const css = readFileSync(
  new URL("../../../src/design-system/styles/tokens.css", import.meta.url),
  "utf8",
);

function palettes() {
  const blocks = [...css.matchAll(/:root(\.light)?\s*\{([\s\S]*?)\}/g)];
  const read = (body: string) =>
    Object.fromEntries(
      [...body.matchAll(/(--[\w-]+):\s*(#(?:[\da-fA-F]{3}|[\da-fA-F]{6}))\s*;/g)].map((match) => [
        match[1],
        match[2].length === 4
          ? `#${[...match[2].slice(1)].map((digit) => digit + digit).join("")}`
          : match[2],
      ]),
    );
  const dark = read(blocks.find((block) => !block[1])?.[2] ?? "");
  const light = { ...dark, ...read(blocks.find((block) => block[1])?.[2] ?? "") };

  return { light, dark };
}

function luminance(hex: string) {
  const channels = hex
    .slice(1)
    .match(/.{2}/g)!
    .map((channel) => {
      const value = parseInt(channel, 16) / 255;

      return value <= 0.04045 ? value / 12.92 : ((value + 0.055) / 1.055) ** 2.4;
    });

  return channels[0]! * 0.2126 + channels[1]! * 0.7152 + channels[2]! * 0.0722;
}

function contrast(first: string, second: string) {
  const a = luminance(first);
  const b = luminance(second);

  return (Math.max(a, b) + 0.05) / (Math.min(a, b) + 0.05);
}

describe.each(Object.entries(palettes()))("%s palette", (_theme, tokens) => {
  it.each([
    ["--foreground", "--background"],
    ["--foreground", "--popover"],
    ["--card-foreground", "--card"],
    ["--popover-foreground", "--popover"],
    ["--secondary-foreground", "--secondary"],
    ["--muted-foreground", "--background"],
    ["--muted-foreground", "--card"],
    ["--primary-foreground", "--primary"],
    ["--accent-foreground", "--accent"],
    ["--destructive", "--card"],
    ["--text-soft", "--card"],
    ["--text-muted", "--card"],
    ["--primary", "--card"],
    ["--hero-text", "--hero-bg"],
    ["--hero-muted", "--hero-bg"],
    ["--chart-axis", "--card"],
  ])("keeps text %s on %s at or above 4.5:1", (foreground, background) => {
    expect(tokens[foreground]).toBeDefined();
    expect(tokens[background]).toBeDefined();
    expect(contrast(tokens[foreground]!, tokens[background]!)).toBeGreaterThanOrEqual(4.5);
  });

  it.each([
    ["--input", "--card"],
    ["--border", "--card"],
    ["--focus-ring", "--background"],
    ["--focus-ring", "--card"],
    ["--hero-track", "--hero-bg"],
    ["--hero-accent", "--hero-bg"],
    ["--chart-1", "--card"],
    ["--chart-2", "--card"],
    ["--chart-3", "--card"],
    ["--chart-4", "--card"],
    ["--chart-5", "--card"],
    ["--chart-6", "--card"],
    ["--chart-invested", "--card"],
  ])("keeps essential graphics %s on %s at or above 3:1", (foreground, background) => {
    expect(tokens[foreground]).toBeDefined();
    expect(tokens[background]).toBeDefined();
    expect(contrast(tokens[foreground]!, tokens[background]!)).toBeGreaterThanOrEqual(3);
  });

  it("avoids pure white and black palette values", () => {
    expect(Object.values(tokens)).not.toContain("#ffffff");
    expect(Object.values(tokens)).not.toContain("#000000");
  });

  it.each(["--hero-gradient-start", "--hero-gradient-mid", "--hero-gradient-end"])(
    "keeps hero text readable over %s",
    (stop) => {
      expect(contrast(tokens["--hero-text"]!, tokens[stop]!)).toBeGreaterThanOrEqual(4.5);
      expect(contrast(tokens["--hero-muted"]!, tokens[stop]!)).toBeGreaterThanOrEqual(4.5);
      expect(contrast(tokens["--hero-accent"]!, tokens[stop]!)).toBeGreaterThanOrEqual(3);
      expect(contrast(tokens["--hero-track"]!, tokens[stop]!)).toBeGreaterThanOrEqual(3);
    },
  );
});

it("avoids pure white and black in shadows and scrims", () => {
  expect(css).not.toMatch(/#(?:fff|ffffff|000|000000)\b|rgb\(0 0 0\s*\//i);
});
