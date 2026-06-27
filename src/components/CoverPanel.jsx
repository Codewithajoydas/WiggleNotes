import { useEffect, useRef, useState } from "react";

import { X, Layers, Sun, Image as ImageIcon, Palette } from "lucide-react";

import { unsplash } from "../api/unsplash";

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
      className="absolute top-14 right-4 z-50 w-80 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl shadow-black/60 overflow-hidden"
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
        <span className="text-sm font-semibold text-zinc-100 tracking-wide">
          Cover Settings
        </span>
        <button
          onClick={onClose}
          className="text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-800">
        {[
          { id: "gradient", icon: <Layers size={13} />, label: "Gradient" },
          { id: "solid", icon: <Sun size={13} />, label: "Solid" },
          { id: "image", icon: <ImageIcon size={13} />, label: "Image" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors ${
              tab === t.id
                ? "text-blue-400 border-b-2 border-blue-500"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      <div className="p-4">
        {/* Gradient tab */}
        {tab === "gradient" && (
          <div className="grid grid-cols-3 gap-2">
            {GRADIENTS.map((g) => (
              <button
                key={g.label}
                onClick={() => onChange({ type: "gradient", value: g.value })}
                className={`relative h-14 rounded-xl overflow-hidden ring-2 transition-all ${
                  cover?.value === g.value
                    ? "ring-blue-500 scale-95"
                    : "ring-transparent hover:ring-zinc-600"
                }`}
                style={{ background: g.value }}
                title={g.label}
              >
                <span className="absolute inset-x-0 bottom-0 pb-1 text-[10px] text-white/70 text-center font-medium">
                  {g.label}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Solid tab */}
        {tab === "solid" && (
          <div className="grid grid-cols-4 gap-2">
            {SOLID_COLORS.map((c) => (
              <button
                key={c.label}
                onClick={() => onChange({ type: "solid", value: c.value })}
                className={`h-12 rounded-xl ring-2 transition-all ${
                  cover?.value === c.value
                    ? "ring-blue-500 scale-95"
                    : "ring-transparent hover:ring-zinc-600"
                }`}
                style={{ background: c.value }}
                title={c.label}
              />
            ))}
            {/* Custom color picker */}
            <label
              className="h-12 rounded-xl ring-2 ring-transparent hover:ring-zinc-600 flex items-center justify-center cursor-pointer bg-zinc-800 transition-all"
              title="Custom color"
            >
              <Palette size={16} className="text-zinc-400" />
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
              className="w-full px-3 py-2 rounded-lg bg-zinc-800 border border-zinc-700 outline-none text-sm"
            />

            {loading && (
              <div className="text-center text-zinc-500 py-5">Loading...</div>
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
                  className="aspect-square overflow-hidden rounded-lg ring-2 ring-transparent hover:ring-blue-500"
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
            className="w-full py-2 rounded-xl text-xs text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition-colors border border-zinc-800"
          >
            Remove cover
          </button>
        </div>
      )}
    </div>
  );
}
