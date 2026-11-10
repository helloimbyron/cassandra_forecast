import * as veThemeToggleStyles from "./ThemeToggle.css.ts";
import { themeToggleCopy } from "@/shared/presentation/copies/themeToggle.copy";
import { useState } from "react";
import { Button } from "@/libraries/shadcn/components/Button";
import { Sun } from "lucide-react";
import { Moon } from "lucide-react";
import { THEME_CONSTANTS } from "@/design-system/themes/themeConstants.constant";

// --- Constants ---

const { THEME_DARK, THEME_LIGHT, THEME_STORAGE_KEY } = THEME_CONSTANTS;

// --- Types ---

type Theme = typeof THEME_DARK | typeof THEME_LIGHT;

// --- Components ---

export function ThemeToggle() {
  // --- States ---

  const [theme, setTheme] = useState<Theme>(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains(THEME_DARK)
      ? THEME_DARK
      : THEME_LIGHT,
  );

  // --- Handlers ---

  function toggleTheme() {
    let next: Theme = theme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // Si el almacenamiento está bloqueado, conserva el tema oscuro predeterminado.
      next = THEME_DARK;
    }
    document.documentElement.classList.toggle(THEME_DARK, next === THEME_DARK);
    document.documentElement.classList.toggle(THEME_LIGHT, next === THEME_LIGHT);
    document
      .querySelector('meta[name="theme-color"]')
      ?.setAttribute(
        "content",
        getComputedStyle(document.documentElement).getPropertyValue("--background").trim(),
      );
    setTheme(next);
  }

  // --- Return ---

  return (
    <Button
      type="button"
      variant="outline"
      className={[veThemeToggleStyles.themeToggle, "theme-toggle"].filter(Boolean).join(" ")}
      data-testid="theme-toggle"
      onClick={toggleTheme}
      aria-label={
        theme === THEME_DARK ? themeToggleCopy.enableLightMode : themeToggleCopy.enableDarkMode
      }
      aria-pressed={theme === THEME_LIGHT}
    >
      {theme === THEME_DARK ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
    </Button>
  );
}
