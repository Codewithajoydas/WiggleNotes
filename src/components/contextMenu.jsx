import { useContext, useEffect, useMemo, useRef } from "react";
import { SettingsContext } from "../store/Settings.context";
import { getThemeColors } from "../constants/Theme";

export default function ContextMenu({ x, y, visible, onClose, items, h }) {
  const menuRef = useRef(null);

  const { settings } = useContext(SettingsContext);

  const COLORS = useMemo(
    () => getThemeColors(settings.theme, settings.accent_color),
    [settings.theme, settings.accent_color],
  );

  useEffect(() => {
    if (!visible) return;

    document.body.style.pointerEvents = "none";

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.body.style.pointerEvents = "";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [visible, onClose]);

  if (!visible) return null;

  const MENU_WIDTH = 220;
  const MENU_HEIGHT = h || 500;

  const posX =
    x + MENU_WIDTH > window.innerWidth ? window.innerWidth - MENU_WIDTH - 8 : x;

  const posY =
    y + MENU_HEIGHT > window.innerHeight
      ? window.innerHeight - MENU_HEIGHT - 8
      : y;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-40"
        onClick={onClose}
        style={{ pointerEvents: "auto" }}
      />

      {/* Menu */}
      <div
        ref={menuRef}
        onContextMenu={(e) => e.preventDefault()}
        className="fixed z-50 min-w-[220px] max-h-125 overflow-y-auto rounded-xl border shadow-xl"
        style={{
          pointerEvents: "auto",
          top: posY,
          left: posX,
          backgroundColor: COLORS.bgSecondary,
          borderColor: COLORS.border,
          color: COLORS.textPrimary,
          boxShadow: "0 12px 30px rgba(0,0,0,.25)",
        }}
      >
        {items.map((item, index) =>
          item.separator ? (
            <div
              key={index}
              className="my-1 border-t"
              style={{
                borderColor: COLORS.border,
              }}
            />
          ) : (
            <button
              key={index}
              disabled={item.disabled}
              onClick={() => {
                item.action?.();
                onClose();
              }}
              className="flex w-full items-center gap-3 px-3 py-2 text-left text-[12px] transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50"
              style={{
                backgroundColor: "transparent",
                color: item.danger ? "#ef4444" : COLORS.textPrimary,
              }}
              onMouseEnter={(e) => {
                if (item.disabled) return;

                e.currentTarget.style.backgroundColor = item.danger
                  ? "rgba(239,68,68,.10)"
                  : COLORS.bgHover;

                e.currentTarget.style.color = item.danger
                  ? "#ef4444"
                  : COLORS.textPrimary;
              }}
              onMouseLeave={(e) => {
                if (item.disabled) return;

                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = item.danger
                  ? "#ef4444"
                  : COLORS.textPrimary;
              }}
            >
              <span
                style={{
                  color: item.danger ? "#ef4444" : COLORS.textMuted,
                }}
              >
                {item.icon}
              </span>

              <span>{item.label}</span>
            </button>
          ),
        )}
      </div>
    </>
  );
}
