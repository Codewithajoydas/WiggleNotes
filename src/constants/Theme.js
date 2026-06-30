/**
 * Resolves design-system color tokens for a given theme and accent color.
 *
 * @param {"dark" | "light" | "system"} theme - The active theme.
 *   - `"dark"`   → always dark tokens
 *   - `"light"`  → always light tokens
 *   - `"system"` → follows the OS `prefers-color-scheme` at call time
 * @param {"blue" | "purple" | "green" | "orange" | "pink"} [accent="blue"] - The accent palette to layer on top.
 *
 * @returns {{
 *   bgPrimary:    string,
 *   bgSecondary:  string,
 *   bgHover:      string,
 *   border:       string,
 *   textPrimary:  string,
 *   textSecondary:string,
 *   textMuted:    string,
 *   accent:       string,
 *   accentHover:  string,
 *   accentText:   string,
 * }} Flat object of resolved hex / rgba color values.
 *
 * @example
 * // Dark theme, default blue accent
 * const colors = getThemeColors("dark");
 * // { bgPrimary: "#000000", accent: "#3b82f6", accentText: "#60a5fa", ... }
 *
 * @example
 * // Light theme, purple accent
 * const colors = getThemeColors("light", "purple");
 * // { bgPrimary: "#ffffff", accent: "#7c3aed", accentText: "#6d28d9", ... }
 *
 * @example
 * // System theme — resolves at call time using window.matchMedia
 * const colors = getThemeColors("system", "orange");
 */
export function getThemeColors(theme, accent = "blue") {
    const isDark =
        theme === "dark" ||
        (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);

    const base = isDark
        ? {
            bgPrimary: "#000000",
            bgSecondary: "#18181b",
            bgHover: "rgba(255,255,255,0.08)",
            border: "rgba(255,255,255,0.12)",
            textPrimary: "#fafafa",
            textSecondary: "#d4d4d8",
            textMuted: "#71717a",
        }
        : {
            bgPrimary: "#ffffff",
            bgSecondary: "#f4f4f5",
            bgHover: "rgba(0,0,0,0.06)",
            border: "rgba(0,0,0,0.14)",
            textPrimary: "#000000",
            textSecondary: "#3f3f46",
            textMuted: "#71717a",
        };

    const accents = {
        blue: {
            accent: isDark ? "#3b82f6" : "#1d4ed8",
            accentHover: isDark ? "#60a5fa" : "#1e40af",
            accentText: isDark ? "#93c5fd" : "#1e3a8a",
        },
        purple: {
            accent: isDark ? "#8b5cf6" : "#7c3aed",
            accentHover: isDark ? "#a78bfa" : "#6d28d9",
            accentText: isDark ? "#c4b5fd" : "#5b21b6",
        },
        green: {
            accent: isDark ? "#22c55e" : "#15803d",
            accentHover: isDark ? "#4ade80" : "#166534",
            accentText: isDark ? "#86efac" : "#14532d",
        },
        orange: {
            accent: isDark ? "#f97316" : "#c2410c",
            accentHover: isDark ? "#fb923c" : "#9a3412",
            accentText: isDark ? "#fdba74" : "#7c2d12",
        },
        pink: {
            accent: isDark ? "#ec4899" : "#be185d",
            accentHover: isDark ? "#f472b6" : "#9d174d",
            accentText: isDark ? "#f9a8d4" : "#831843",
        },
    };

    return {
        ...base,
        ...(accents[accent] ?? accents.blue),
    };
}

/**
 * Applies the theme + accent as CSS classes on <html>.
 * Call this whenever settings change.
 *
 * @param {"dark" | "light" | "system"} theme
 * @param {"blue" | "purple" | "green" | "orange" | "pink"} [accent="blue"]
 */
export function applyTheme(theme, accent = "blue") {
    const root = document.documentElement;

    // ── Theme class ──
    root.classList.remove("theme-light", "theme-dark");
    const isDark =
        theme === "dark" ||
        (theme === "system" && window.matchMedia("(prefers-color-scheme: dark)").matches);
    if (!isDark) root.classList.add("theme-light");

    // ── Accent class ──
    root.classList.remove("accent-purple", "accent-green", "accent-orange", "accent-pink");
    if (accent !== "blue") root.classList.add(`accent-${accent}`);
}