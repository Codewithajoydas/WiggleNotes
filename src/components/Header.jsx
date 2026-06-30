import { ArrowLeft } from "lucide-react";
import React, { useContext, useMemo } from "react";
import { useNavigate } from "react-router-dom";
import { SettingsContext } from "../store/Settings.context";
import { getThemeColors } from "../constants/Theme";

export default function Header({ children, title }) {
  const navigate = useNavigate();
  const { settings } = useContext(SettingsContext);

  /** @type {ReturnType<typeof getThemeColors>} */
  const COLORS = useMemo(
    () => getThemeColors(settings.theme, settings.accent_color),
    [settings.theme, settings.accent_color],
  );

  return (
    <header
      className="sticky top-0 z-50 h-16 backdrop-blur-xl border-b"
      style={{
        backgroundColor: COLORS.bgSecondary,
        borderColor: COLORS.border,
        color: COLORS.textPrimary,
        WebkitAppRegion: "drag",
      }}
    >
      <div className="h-full px-5 flex items-center justify-between pr-37.5">
        {/* ── Left: back button + title ── */}
        <div
          className="flex items-center gap-3"
          style={{ WebkitAppRegion: "no-drag" }}
        >
          <button
            onClick={() => navigate(-1)}
            className="h-9 w-9 rounded-xl flex items-center justify-center transition-all duration-200"
            style={{ color: COLORS.textMuted }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = COLORS.bgHover;
              e.currentTarget.style.color = COLORS.accentText;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
              e.currentTarget.style.color = COLORS.textMuted;
            }}
          >
            <ArrowLeft size={18} />
          </button>

          <div>
            <h4
              className="font-semibold text-sm tracking-wide"
              style={{ color: COLORS.textPrimary }}
            >
              {title}
            </h4>
            <p className="text-xs" style={{ color: COLORS.textSecondary }}>
              Wigglenote
            </p>
          </div>
        </div>

        {/* ── Right: action buttons (passed as children) ── */}
        <div
          className="flex items-center gap-2"
          style={{ WebkitAppRegion: "no-drag" }}
        >
          {children}
        </div>
      </div>
    </header>
  );
}
