export type AppTheme = "light" | "dark";

export type ThemePalette = {
  background: string;
  surface: string;
  mutedSurface: string;
  cardBorder: string;
  text: string;
  secondaryText: string;
  accent: string;
  accentSoft: string;
  success: string;
  warning: string;
  gradient: [string, string, string];
};

export const palettes: Record<AppTheme, ThemePalette> = {
  light: {
    background: "#eef1f5",
    surface: "#ffffff",
    mutedSurface: "#f6f7fb",
    cardBorder: "#e4e8f0",
    text: "#151b2f",
    secondaryText: "#66748b",
    accent: "#1f6fff",
    accentSoft: "#e8f0ff",
    success: "#19b58d",
    warning: "#f59e0b",
    gradient: ["#0f172a", "#2563eb", "#2dd4bf"]
  },
  dark: {
    background: "#0b1220",
    surface: "#111827",
    mutedSurface: "#182336",
    cardBorder: "#293548",
    text: "#f8fafc",
    secondaryText: "#9cb0c8",
    accent: "#7ab2ff",
    accentSoft: "#1a2946",
    success: "#34d399",
    warning: "#fbbf24",
    gradient: ["#020617", "#1d4ed8", "#0f766e"]
  }
};
