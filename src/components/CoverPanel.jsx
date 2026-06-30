import { useContext, useEffect, useMemo, useRef, useState } from "react";
import { X, Layers, Sun, Image as ImageIcon, Palette } from "lucide-react";
import { unsplash } from "../api/unsplash";
import { SettingsContext } from "../store/Settings.context";
import { getThemeColors } from "../constants/Theme";

// ─── Cover Presets ────────────────────────────────────────────────────────────
const SOLID_COLORS = [
  { label: "Slate", value: "#1e293b" },
  { label: "Midnight", value: "#0f172a" },
  { label: "Stone", value: "#292524" },
  { label: "Forest", value: "#14532d" },
  { label: "Navy", value: "#1e3a5f" },
  { label: "Plum", value: "#3b1f5e" },
  { label: "Rose", value: "#4c1130" },
  { label: "Rust", value: "#431407" },
];

const GRADIENTS = [
  {
    label: "Dusk",
    value: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
  },
  {
    label: "Aurora",
    value: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
  },
  {
    label: "Ember",
    value: "linear-gradient(135deg, #1a0533, #6b21a8, #db2777)",
  },
  {
    label: "Forest",
    value: "linear-gradient(135deg, #134e4a, #065f46, #166534)",
  },
  {
    label: "Sand",
    value: "linear-gradient(135deg, #451a03, #92400e, #d97706)",
  },
  {
    label: "Night",
    value: "linear-gradient(135deg, #020617, #0f172a, #1e1b4b)",
  },
];

export function CoverPanel({ cover, onChange, onClose, imageInputRef }) {
  const [tab, setTab] = useState("gradient");
  const panelRef = useRef(null);
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState("nature");
  const [loading, setLoading] = useState(false);
  const [removeHover, setRemoveHover] = useState(false);

  const categories = [
    "Nature",
    "Mountain",
    "Coding",
    "Books",
    "Office",
    "Technology",
    "Dark",
    "Abstract",
  ];

  const searchImages = async (search = query) => {
    setLoading(true);

    try {
      const { data } = await unsplash.get("/search/photos", {
        params: {
          query: search,
          per_page: 18,
        },
      });

      setImages(data.results);
    } finally {
      setLoading(false);
    }
  };

  const { settings } = useContext(SettingsContext);
  const COLORS = useMemo(
    () => getThemeColors(settings.theme, settings.accent_color),
    [settings.theme, settings.accent_color],
  );

  useEffect(() => {
    searchImages("nature");
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        onClose();
      }
    };

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  return (
    <div
      ref={panelRef}
      className="absolute top-14 right-4 z-50 w-80 rounded-2xl shadow-2xl shadow-black/60 overflow-hidden"
      style={{
        backgroundColor: COLORS.bgSecondary,
        border: `1px solid ${COLORS.border}`,
      }}
    >
      {/* Header */}
      <div
        className="flex items-center justify-between px-4 py-3 border-b"
        style={{ borderColor: COLORS.border }}
      >
        <span
          className="text-sm font-semibold tracking-wide"
          style={{ color: COLORS.textPrimary }}
        >
          Cover Settings
        </span>
        <button
          onClick={onClose}
          className="transition-colors"
          style={{ color: COLORS.textMuted }}
          onMouseEnter={(e) =>
            (e.currentTarget.style.color = COLORS.textPrimary)
          }
          onMouseLeave={(e) => (e.currentTarget.style.color = COLORS.textMuted)}
        >
          <X size={16} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b" style={{ borderColor: COLORS.border }}>
        {[
          { id: "gradient", icon: <Layers size={13} />, label: "Gradient" },
          { id: "solid", icon: <Sun size={13} />, label: "Solid" },
          { id: "image", icon: <ImageIcon size={13} />, label: "Image" },
        ].map((t) => {
          const isActive = tab === t.id;
          return (
            <button
              key={t.id}
              onClick={() => setTab(t.id)}
              className="flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors border-b-2"
              style={{
                color: isActive ? COLORS.accent : COLORS.textMuted,
                borderColor: isActive ? COLORS.accent : "transparent",
              }}
              onMouseEnter={(e) => {
                if (!isActive) e.currentTarget.style.color = COLORS.textPrimary;
              }}
              onMouseLeave={(e) => {
                if (!isActive) e.currentTarget.style.color = COLORS.textMuted;
              }}
            >
              {t.icon}
              {t.label}
            </button>
          );
        })}
      </div>

      <div className="p-4">
        {/* Gradient tab */}
        {tab === "gradient" && (
          <div className="grid grid-cols-3 gap-2">
            {GRADIENTS.map((g) => {
              const isSelected = cover?.value === g.value;
              return (
                <button
                  key={g.label}
                  onClick={() => onChange({ type: "gradient", value: g.value })}
                  className="relative h-14 rounded-xl overflow-hidden ring-2 transition-all"
                  style={{
                    background: g.value,
                    ringColor: isSelected ? COLORS.accent : "transparent",
                    transform: isSelected ? "scale(0.95)" : "scale(1)",
                  }}
                  title={g.label}
                >
                  <span className="absolute inset-x-0 bottom-0 pb-1 text-[10px] text-white/70 text-center font-medium">
                    {g.label}
                  </span>
                </button>
              );
            })}
          </div>
        )}

        {/* Solid tab */}
        {tab === "solid" && (
          <div className="grid grid-cols-4 gap-2">
            {SOLID_COLORS.map((c) => {
              const isSelected = cover?.value === c.value;
              return (
                <button
                  key={c.label}
                  onClick={() => onChange({ type: "solid", value: c.value })}
                  className="h-12 rounded-xl ring-2 transition-all"
                  style={{
                    background: c.value,
                    ringColor: isSelected ? COLORS.accent : "transparent",
                    transform: isSelected ? "scale(0.95)" : "scale(1)",
                  }}
                  title={c.label}
                />
              );
            })}
            {/* Custom color picker */}
            <label
              className="h-12 rounded-xl ring-2 ring-transparent flex items-center justify-center cursor-pointer transition-all"
              style={{ backgroundColor: COLORS.bgHover }}
              title="Custom color"
            >
              <Palette size={16} style={{ color: COLORS.textMuted }} />
              <input
                type="color"
                className="sr-only"
                onChange={(e) =>
                  onChange({ type: "solid", value: e.target.value })
                }
              />
            </label>
          </div>
        )}

        {/* Image tab */}
        {tab === "image" && (
          <div className="space-y-3">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  searchImages();
                }
              }}
              placeholder="Search photos..."
              className="w-full px-3 py-2 rounded-lg outline-none text-sm"
              style={{
                backgroundColor: COLORS.bgHover,
                border: `1px solid ${COLORS.border}`,
                color: COLORS.textPrimary,
              }}
            />

            {loading && (
              <div
                className="text-center py-5"
                style={{ color: COLORS.textMuted }}
              >
                Loading...
              </div>
            )}

            <div className="grid grid-cols-3 gap-2 max-h-72 overflow-y-auto">
              {images.map((image) => (
                <button
                  key={image.id}
                  onClick={() =>
                    onChange({
                      type: "image",
                      value: image.urls.regular,
                    })
                  }
                  className="aspect-square overflow-hidden rounded-lg ring-2 transition-all"
                  style={{ ringColor: "transparent" }}
                  onMouseEnter={(e) =>
                    e.currentTarget.style.setProperty(
                      "--tw-ring-color",
                      COLORS.accent,
                    )
                  }
                  onMouseLeave={(e) =>
                    e.currentTarget.style.setProperty(
                      "--tw-ring-color",
                      "transparent",
                    )
                  }
                >
                  <img
                    src={image.urls.small}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Remove cover */}
      {cover && (
        <div className="px-4 pb-4">
          <button
            onClick={() => onChange(null)}
            onMouseEnter={() => setRemoveHover(true)}
            onMouseLeave={() => setRemoveHover(false)}
            className="w-full py-2 rounded-xl text-xs transition-colors"
            style={{
              color: removeHover ? "#f87171" : COLORS.textMuted,
              border: `1px solid ${COLORS.border}`,
              backgroundColor: removeHover
                ? "rgba(248,113,113,0.08)"
                : "transparent",
            }}
          >
            Remove cover
          </button>
        </div>
      )}
    </div>
  );
}
