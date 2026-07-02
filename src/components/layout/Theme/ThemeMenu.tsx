import { ThemeSwitcher } from "./ThemeSwitcher";

/** The theme control as it appears inside the mobile menu — a labelled row. */
export function ThemeMenu() {
  return (
    <div className="flex items-center justify-between gap-4">
      <span className="text-sm font-medium text-rr-text-secondary">Appearance</span>
      <ThemeSwitcher size="lg" />
    </div>
  );
}
