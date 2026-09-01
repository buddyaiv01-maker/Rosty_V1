import { createContext, useContext } from "react";
import type { StyleConfig } from "../data/styles";

export const ThemeContext = createContext<StyleConfig | null>(null);

export function useTheme(): StyleConfig {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error("useTheme must be used within ThemeContext.Provider");
  return ctx;
}

export function cssVars(style: StyleConfig): Record<string, string> {
  const t = style.tokens;
  return {
    "--r-bg": t.bg,
    "--r-bg-image": t.bgImage ?? "none",
    "--r-surface": t.surface,
    "--r-surface-alt": t.surfaceAlt,
    "--r-text": t.text,
    "--r-text-muted": t.textMuted,
    "--r-accent": t.accent,
    "--r-accent-2": t.accent2,
    "--r-border": t.border,
    "--r-radius": t.radius,
    "--r-radius-lg": t.radiusLg,
    "--r-shadow": t.shadow,
    "--r-shadow-lg": t.shadowLg,
    "--r-font-heading": t.fontHeading,
    "--r-font-body": t.fontBody,
    "--r-tracking-heading": t.trackingHeading,
    "--r-card-aspect": t.cardAspect,
    "--r-hero-height": t.heroHeight,
    "--r-blur": t.blur ?? "0px",
  } as Record<string, string>;
}
