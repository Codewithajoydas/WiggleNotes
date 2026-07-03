import { useMemo, useState, useContext } from "react";
import { templates } from "../../public/templates";
import {
  Search,
  Copy,
  Check,
  LayoutTemplate,
  LayoutGrid,
  List,
  FileText,
  Tag,
  Image as ImageIcon,
} from "lucide-react";
import { SettingsContext } from "../store/Settings.context";
import { getThemeColors } from "../constants/Theme";
import Header from "../components/Header";
import { useNavigate } from "react-router-dom";

const CAT_COLORS = {
  Personal: "#818cf8",
  Planning: "#38bdf8",
  Dev: "#34d399",
  Meeting: "#fb923c",
  Writing: "#e879f9",
  Finance: "#facc15",
  Research: "#60a5fa",
  Health: "#f472b6",
  Ideas: "#a78bfa",
  Learning: "#4ade80",
  Business: "#fb7185",
};

const ALL_CATEGORIES = ["All", ...Object.keys(CAT_COLORS)];

function catColor(cat) {
  return CAT_COLORS[cat] || "#71717a";
}

export default function Templates() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [activeCategory, setActiveCategory] = useState("All");
  const [copiedId, setCopiedId] = useState(null);
  const { settings } = useContext(SettingsContext);

  const COLORS = useMemo(
    () => getThemeColors(settings.theme, settings.accent_color),
    [settings.theme, settings.accent_color],
  );

  // Respect a stored view preference if the app tracks one (e.g. settings.default_view),
  // otherwise default to grid.
  const [view, setView] = useState(
    settings?.default_view === "list" ? "list" : "grid",
  ); // "grid" | "list"

  const filtered = useMemo(() => {
    const q = search.toLowerCase();
    return templates.filter((t) => {
      const matchSearch =
        !q ||
        t.title.toLowerCase().includes(q) ||
        t.category.toLowerCase().includes(q) ||
        t.description.toLowerCase().includes(q);
      const matchCat =
        activeCategory === "All" || t.category === activeCategory;
      return matchSearch && matchCat;
    });
  }, [search, activeCategory]);

  const handleCopy = (t) => {
    navigator.clipboard?.writeText(t.content);
    setCopiedId(t.id);
    setTimeout(() => setCopiedId((id) => (id === t.id ? null : id)), 1500);
  };

  return (
    <div
      className="h-screen flex flex-col overflow-hidden"
      style={{ backgroundColor: COLORS.bgPrimary, color: COLORS.textPrimary }}
    >
      <Header title="Templates">
        {/* View toggle */}
        <div
          className="flex items-center rounded-lg p-0.5"
          style={{
            backgroundColor: COLORS.bgHover,
            border: `1px solid ${COLORS.border}`,
          }}
        >
          <button
            onClick={() => setView("grid")}
            aria-label="Grid view"
            className="p-1.5 rounded-md transition-colors"
            style={{
              backgroundColor: view === "grid" ? COLORS.accent : "transparent",
              color: view === "grid" ? "#fff" : COLORS.textMuted,
            }}
          >
            <LayoutGrid size={15} />
          </button>
          <button
            onClick={() => setView("list")}
            aria-label="List view"
            className="p-1.5 rounded-md transition-colors"
            style={{
              backgroundColor: view === "list" ? COLORS.accent : "transparent",
              color: view === "list" ? "#fff" : COLORS.textMuted,
            }}
          >
            <List size={15} />
          </button>
        </div>
      </Header>

      {/* ── Filter bar: search + categories ───────────────────── */}
      <div
        className="px-6 py-3 border-b flex flex-wrap items-center gap-3 flex-shrink-0"
        style={{ borderColor: COLORS.border }}
      >
        <div className="relative w-64">
          <Search
            size={15}
            className="absolute left-3 top-1/2 -translate-y-1/2"
            style={{ color: COLORS.textMuted }}
          />
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search templates..."
            className="w-full rounded-xl pl-9 pr-3 py-2 text-sm outline-none transition-colors"
            style={{
              backgroundColor: COLORS.bgSecondary,
              border: `1px solid ${COLORS.border}`,
              color: COLORS.textPrimary,
            }}
          />
        </div>

        <div className="flex flex-wrap gap-1.5">
          {ALL_CATEGORIES.map((cat) => {
            const active = activeCategory === cat;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className="text-xs px-2.5 py-1 rounded-lg border transition-all"
                style={{
                  backgroundColor: active ? COLORS.accent : "transparent",
                  borderColor: active ? COLORS.accent : COLORS.border,
                  color: active ? "#fff" : COLORS.textSecondary,
                }}
              >
                {cat}
              </button>
            );
          })}
        </div>

        <span className="ml-auto text-xs" style={{ color: COLORS.textMuted }}>
          {templates.length} reusable notes
        </span>
      </div>

      {/* ── Content ────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto p-6">
        {filtered.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <FileText
              size={36}
              style={{ color: COLORS.textMuted }}
              className="mb-3"
            />
            <p
              className="text-sm font-medium"
              style={{ color: COLORS.textSecondary }}
            >
              No templates found
            </p>
            <p className="text-xs mt-1" style={{ color: COLORS.textMuted }}>
              Try a different search or category
            </p>
          </div>
        ) : view === "grid" ? (
          <div className="grid grid-cols-[repeat(auto-fill,minmax(260px,1fr))] gap-4">
            {filtered.map((t) => (
              <div
                key={t.id}
                className="flex flex-col rounded-2xl overflow-hidden transition-colors"
                style={{
                  backgroundColor: COLORS.bgSecondary,
                  border: `1px solid ${COLORS.border}`,
                }}
              >
                {/* Cover image */}
                <div
                  className="h-32 w-full flex-shrink-0 overflow-hidden"
                  style={{ backgroundColor: COLORS.bgHover }}
                >
                  {t.cover ? (
                    <img
                      src={t.cover}
                      alt={t.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ color: COLORS.textMuted }}
                    >
                      <ImageIcon size={22} />
                    </div>
                  )}
                </div>

                <div className="flex flex-col flex-1 p-5">
                  <span
                    className="self-start inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg mb-3"
                    style={{
                      background: `${catColor(t.category)}22`,
                      color: catColor(t.category),
                      border: `1px solid ${catColor(t.category)}44`,
                    }}
                  >
                    <Tag size={11} />
                    {t.category}
                  </span>

                  <p
                    className="text-sm font-medium truncate"
                    style={{ color: COLORS.textPrimary }}
                  >
                    {t.title}
                  </p>
                  <p
                    className="text-xs mt-1.5 line-clamp-2 flex-1"
                    style={{ color: COLORS.textMuted }}
                  >
                    {t.description}
                  </p>

                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => navigate(`/create-note?id=${t.id}`)}
                      className="flex-1 flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs font-medium transition-colors"
                      style={{ backgroundColor: COLORS.accent, color: "#fff" }}
                      onMouseEnter={(e) =>
                        (e.currentTarget.style.backgroundColor =
                          COLORS.accentHover)
                      }
                      onMouseLeave={(e) =>
                        (e.currentTarget.style.backgroundColor = COLORS.accent)
                      }
                    >
                      <LayoutTemplate size={13} />
                      Use Template
                    </button>
                    <button
                      onClick={() => handleCopy(t)}
                      className="flex items-center justify-center gap-1.5 rounded-lg px-3 py-2 text-xs transition-colors"
                      style={{
                        border: `1px solid ${COLORS.border}`,
                        color: COLORS.textMuted,
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = COLORS.bgHover;
                        e.currentTarget.style.color = COLORS.textPrimary;
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = "transparent";
                        e.currentTarget.style.color = COLORS.textMuted;
                      }}
                    >
                      {copiedId === t.id ? (
                        <Check size={13} className="text-green-400" />
                      ) : (
                        <Copy size={13} />
                      )}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div
            className="flex flex-col rounded-2xl overflow-hidden"
            style={{ border: `1px solid ${COLORS.border}` }}
          >
            {filtered.map((t, i) => (
              <div
                key={t.id}
                className="flex items-center gap-4 px-5 py-4 transition-colors"
                style={{
                  backgroundColor: COLORS.bgSecondary,
                  borderTop: i === 0 ? "none" : `1px solid ${COLORS.border}`,
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.backgroundColor = COLORS.bgHover)
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.backgroundColor = COLORS.bgSecondary)
                }
              >
                {/* Cover thumbnail */}
                <div
                  className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0"
                  style={{ backgroundColor: COLORS.bgHover }}
                >
                  {t.cover ? (
                    <img
                      src={t.cover}
                      alt={t.title}
                      loading="lazy"
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div
                      className="w-full h-full flex items-center justify-center"
                      style={{ color: COLORS.textMuted }}
                    >
                      <ImageIcon size={14} />
                    </div>
                  )}
                </div>

                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: catColor(t.category) }}
                />

                <div className="flex-1 min-w-0">
                  <p
                    className="text-sm font-medium truncate"
                    style={{ color: COLORS.textPrimary }}
                  >
                    {t.title}
                  </p>
                  <p
                    className="text-xs truncate"
                    style={{ color: COLORS.textMuted }}
                  >
                    {t.description}
                  </p>
                </div>

                <span
                  className="hidden sm:inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg flex-shrink-0"
                  style={{
                    background: `${catColor(t.category)}22`,
                    color: catColor(t.category),
                    border: `1px solid ${catColor(t.category)}44`,
                  }}
                >
                  <Tag size={11} />
                  {t.category}
                </span>

                <div className="flex gap-2 flex-shrink-0">
                  <button
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs font-medium transition-colors"
                    style={{ backgroundColor: COLORS.accent, color: "#fff" }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor =
                        COLORS.accentHover)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = COLORS.accent)
                    }
                  >
                    <LayoutTemplate size={13} />
                    Use Template
                  </button>
                  <button
                    onClick={() => handleCopy(t)}
                    className="flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-xs transition-colors"
                    style={{
                      border: `1px solid ${COLORS.border}`,
                      color: COLORS.textMuted,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = COLORS.bgHover;
                      e.currentTarget.style.color = COLORS.textPrimary;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = "transparent";
                      e.currentTarget.style.color = COLORS.textMuted;
                    }}
                  >
                    {copiedId === t.id ? (
                      <>
                        <Check size={13} className="text-green-400" />
                        <span className="text-green-400">Copied</span>
                      </>
                    ) : (
                      <>
                        <Copy size={13} />
                        Copy
                      </>
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
