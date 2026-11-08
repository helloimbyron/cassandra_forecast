import { copy } from "../copy/ThemeToggle";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Sun } from "lucide-react";
import { Moon } from "lucide-react";
import { THEME_DARK, THEME_LIGHT, THEME_STORAGE_KEY } from "@/shared/theme/theme-constants";

type Theme = typeof THEME_DARK | typeof THEME_LIGHT;

export function ThemeToggle() {
  const [theme, setTheme] = useState<Theme>(() =>
    typeof document !== "undefined" && document.documentElement.classList.contains(THEME_DARK)
      ? THEME_DARK
      : THEME_LIGHT,
  );

  function toggleTheme() {
    let next: Theme = theme === THEME_DARK ? THEME_LIGHT : THEME_DARK;
    try {
      localStorage.setItem(THEME_STORAGE_KEY, next);
    } catch {
      // If persistence is blocked, retain the dark default.
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

  return (
    <Button
      type="button"
      variant="outline"
      className="theme-toggle"
      onClick={toggleTheme}
      aria-label={theme === THEME_DARK ? copy.activarModoClaro : copy.activarModoOscuro}
      aria-pressed={theme === THEME_LIGHT}
    >
      {theme === THEME_DARK ? <Sun aria-hidden="true" /> : <Moon aria-hidden="true" />}
    </Button>
  );
}
