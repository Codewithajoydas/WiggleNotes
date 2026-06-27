import { useEffect, useRef } from "react";

export default function ContextMenu({ x, y, visible, onClose, items, h }) {
  const menuRef = useRef(null);
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
  const MENU_HEIGHT = h || 500; // approximate

  const posX =
    x + MENU_WIDTH > window.innerWidth ? window.innerWidth - MENU_WIDTH : x;

  const posY =
    y + MENU_HEIGHT > window.innerHeight ? window.innerHeight - MENU_HEIGHT : y;
  return (
    <>
      <div className="fixed  z-40" onClick={onClose} />

      <div
        onContextMenu={(e) => e.stopPropagation()}
        ref={menuRef}
        className="fixed z-50 min-w-fit max-h-125 overflow-hidden overflow-y-auto rounded-xl border border-zinc-800 bg-zinc-900/50 backdrop-blur-xl shadow-xl"
        style={{
          pointerEvents: "auto",
          top: posY,
          left: posX,
        }}
      >
        {items.map((item, index) =>
          item.separator ? (
            <div key={index} className="my-1 border-t border-zinc-800" />
          ) : (
            <button
              disabled={item.disabled}
              key={index}
              onClick={() => {
                item.action();
                onClose();
              }}
              className={`flex w-full items-center gap-3 px-3 py-2 text-left text-[12px] hover:bg-zinc-950 ${
                item.danger ? "text-red-500" : ""
              } disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:bg-zinc-900`}
            >
              {item.icon}
              {item.label}
            </button>
          ),
        )}
      </div>
    </>
  );
}
