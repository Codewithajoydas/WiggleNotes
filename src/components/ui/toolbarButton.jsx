// ─── Toolbar Button ───────────────────────────────────────────────────────────
function ToolbarButton({
  onClick,
  active = false,
  disabled = false,
  label,
  children,
}) {
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
      className={`
        group relative shrink-0 flex flex-col items-center justify-center gap-0.5
        h-11 w-11 rounded-xl transition-all duration-150 select-none
        ${
          disabled
            ? "opacity-30 cursor-not-allowed"
            : active
              ? "bg-blue-500/20 text-blue-400"
              : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
        }
      `}
    >
      {children}
      {label && (
        <span
          className={`text-[9px] leading-none font-medium tracking-wide uppercase ${
            active ? "text-blue-400" : "text-zinc-600 group-hover:text-zinc-400"
          }`}
        >
          {label}
        </span>
      )}
    </button>
  );
}

export default ToolbarButton;