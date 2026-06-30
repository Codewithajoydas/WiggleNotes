import { useContext, useMemo } from "react";
import { SettingsContext } from "../../store/Settings.context";
import { getThemeColors } from "../../constants/Theme";

// ─── Toolbar Button ───────────────────────────────────────────────────────────
function ToolbarButton({
  onClick,
  active = false,
  disabled = false,
  label,
  children,
}) {
  const { settings } = useContext(SettingsContext);
  const COLORS = useMemo(() => getThemeColors(settings.theme), [settings.theme]);
  return (
    <button
      type="button"
      disabled={disabled}
      title={label}
      onMouseDown={(e) => {
        e.preventDefault();
        e.stopPropagation();

        if (!disabled) onClick?.();
      }}
      className="group relative shrink-0 flex flex-col items-center justify-center gap-0.5 h-11 w-11 rounded-xl transition-all duration-150 select-none"
      style={{
        opacity: disabled ? 0.3 : 1,
        cursor: disabled ? "not-allowed" : "pointer",
        color: active ? COLORS.accentText : COLORS.textMuted,
        backgroundColor: active ? `${COLORS.accent}18` : "transparent",
      }}
      onMouseEnter={(e) => {
        if (disabled || active) return;

        e.currentTarget.style.backgroundColor = COLORS.bgHover;
        e.currentTarget.style.color = COLORS.textPrimary;
      }}
      onMouseLeave={(e) => {
        if (disabled || active) return;

        e.currentTarget.style.backgroundColor = "transparent";
        e.currentTarget.style.color = COLORS.textMuted;
      }}
    >
      {children}

      {label && (
        <span
          className="text-[9px] leading-none font-medium tracking-wide  transition-colors duration-150"
          style={{
            color: active ? COLORS.accentText : COLORS.textMuted,
            fontSize: "9px !important",
          }}
        >
          {label}
        </span>
      )}
    </button>
  );
}

export default ToolbarButton;
