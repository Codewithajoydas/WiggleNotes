import { useMemo, useState, useEffect } from "react";
import { templates } from "../../public/templates";
import {
  Search,
  Copy,
  Check,
  LayoutTemplate,
  FileText,
  Tag,
  ArrowRight,
} from "lucide-react";
import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import { marked } from "marked";

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
  const [search, setSearch] = useState("");
  const [selected, setSelected] = useState(templates[0]);
  const [activeCategory, setActiveCategory] = useState("All");
  const [copied, setCopied] = useState(false);
  const [view, setView] = useState("grid"); // "grid" | "list"

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

  const editor = useEditor({
    extensions: [StarterKit],
    editable: false,
    immediatelyRender: false,
    content: "",
    editorProps: {
      attributes: {
        class:
          "prose prose-invert prose-sm max-w-none focus:outline-none min-h-[300px] prose-headings:text-zinc-100 prose-p:text-zinc-300 prose-strong:text-zinc-200 prose-code:text-blue-300 prose-pre:bg-zinc-900 prose-blockquote:border-zinc-700 prose-blockquote:text-zinc-400 prose-li:text-zinc-300 prose-a:text-blue-400 prose-table:text-zinc-300 prose-th:text-zinc-200 prose-td:border-zinc-700 prose-th:border-zinc-700",
      },
    },
  });

  useEffect(() => {
    if (!editor || !selected) return;
    editor.commands.setContent(marked.parse(selected.content));
  }, [editor, selected]);

  const handleCopy = () => {
    if (!selected) return;
    navigator.clipboard?.writeText(selected.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  const handleSelect = (t) => {
    setSelected(t);
  };

  return (
    <div className="h-screen bg-zinc-950 text-white flex overflow-hidden">
      {/* ── Left Sidebar ───────────────────────────────────────── */}
      <aside className="w-72 h-screen bg-zinc-950 flex flex-col border-r border-zinc-800 flex-shrink-0">
        {/* Header */}
        <div className="h-16 px-4 flex items-center gap-3 border-b border-zinc-800">
          <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center flex-shrink-0">
            <LayoutTemplate size={16} className="text-white" />
          </div>
          <div>
            <h1 className="font-semibold text-white text-sm">Templates</h1>
            <p className="text-xs text-zinc-500">
              {templates.length} reusable notes
            </p>
          </div>
        </div>

        {/* Search */}
        <div className="p-3 border-b border-zinc-800">
          <div className="relative">
            <Search
              size={15}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-500"
            />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search templates..."
              className="w-full bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-xl pl-9 pr-3 py-2.5 text-sm text-zinc-200 placeholder-zinc-600 outline-none focus:border-blue-500 transition-colors"
            />
          </div>
        </div>

        {/* Categories */}
        <div className="p-3 border-b border-zinc-800">
          <p className="text-xs uppercase tracking-wider text-zinc-500 mb-2">
            Categories
          </p>
          <div className="flex flex-wrap gap-1.5">
            {ALL_CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xs px-2.5 py-1 rounded-lg border transition-all ${
                  activeCategory === cat
                    ? "bg-blue-600 border-blue-500 text-white shadow-lg shadow-blue-500/20"
                    : "border-zinc-800 text-zinc-400 hover:bg-zinc-900 hover:text-white hover:border-zinc-700"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Template List */}
        <div className="flex-1 overflow-y-auto p-3 space-y-1">
          {filtered.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-10 text-center">
              <FileText size={36} className="text-zinc-700 mb-3" />
              <p className="text-sm font-medium text-zinc-400">
                No templates found
              </p>
              <p className="text-xs text-zinc-600 mt-1">
                Try a different search or category
              </p>
            </div>
          ) : (
            filtered.map((t) => (
              <button
                key={t.id}
                onClick={() => handleSelect(t)}
                className={`w-full group flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left ${
                  selected?.id === t.id
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
                    : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
                }`}
              >
                <div
                  className="w-2 h-2 rounded-full flex-shrink-0"
                  style={{ background: catColor(t.category) }}
                />
                <div className="flex-1 min-w-0">
                  <p
                    className={`text-sm font-medium truncate ${
                      selected?.id === t.id ? "text-white" : "text-zinc-200"
                    }`}
                  >
                    {t.title}
                  </p>
                  <p
                    className={`text-xs mt-0.5 ${
                      selected?.id === t.id ? "text-blue-200" : "text-zinc-500"
                    }`}
                  >
                    {t.category}
                  </p>
                </div>
                <ArrowRight
                  size={14}
                  className={`flex-shrink-0 transition-opacity ${
                    selected?.id === t.id
                      ? "opacity-100"
                      : "opacity-0 group-hover:opacity-100"
                  }`}
                />
              </button>
            ))
          )}
        </div>

        {/* Footer count */}
        <div className="border-t border-zinc-800 px-4 py-3">
          <p className="text-xs text-zinc-600">
            Showing{" "}
            <span className="text-zinc-400 font-medium">{filtered.length}</span>{" "}
            of{" "}
            <span className="text-zinc-400 font-medium">
              {templates.length}
            </span>{" "}
            templates
          </p>
        </div>
      </aside>

      {/* ── Main Panel ─────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col min-w-0 bg-zinc-950">
        {selected ? (
          <>
            {/* Cover Image */}
            {selected.cover && (
              <div className="relative h-44 flex-shrink-0 overflow-hidden">
                <img
                  src={selected.cover}
                  alt={selected.title}
                  className="w-full h-full object-cover"
                />
                {/* dark overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950 via-zinc-950/60 to-transparent" />

                {/* Category badge over image */}
                <div className="absolute bottom-4 left-8">
                  <span
                    className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg"
                    style={{
                      background: `${catColor(selected.category)}22`,
                      color: catColor(selected.category),
                      border: `1px solid ${catColor(selected.category)}44`,
                    }}
                  >
                    <Tag size={11} />
                    {selected.category}
                  </span>
                </div>
              </div>
            )}

            {/* Header */}
            <header
              className={`px-8 border-b border-zinc-800 bg-zinc-950 flex-shrink-0 ${
                selected.cover ? "pt-4 pb-5" : "pt-8 pb-5"
              }`}
            >
              {!selected.cover && (
                <span
                  className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-lg mb-4"
                  style={{
                    background: `${catColor(selected.category)}22`,
                    color: catColor(selected.category),
                    border: `1px solid ${catColor(selected.category)}44`,
                  }}
                >
                  <Tag size={11} />
                  {selected.category}
                </span>
              )}

              <h2 className="text-2xl font-semibold text-white leading-tight">
                {selected.title}
              </h2>

              <p className="text-sm text-zinc-400 mt-2 leading-relaxed max-w-2xl">
                {selected.description}
              </p>

              <div className="flex gap-2.5 mt-5 items-center">
                <button className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 transition text-white rounded-xl px-5 py-2.5 text-sm font-medium shadow-lg shadow-blue-500/20">
                  <LayoutTemplate size={15} />
                  Use Template
                </button>

                <button
                  onClick={handleCopy}
                  className="flex items-center gap-2 border border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700 text-zinc-400 hover:text-white transition rounded-xl px-4 py-2.5 text-sm bg-transparent"
                >
                  {copied ? (
                    <>
                      <Check size={14} className="text-green-400" />
                      <span className="text-green-400">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy size={14} />
                      Copy Markdown
                    </>
                  )}
                </button>
              </div>
            </header>

            {/* Preview */}
            <div className="flex-1 overflow-y-auto px-8 py-6 bg-zinc-950">
              {/* Preview label */}
              <div className="flex items-center gap-3 mb-4">
                <span className="text-xs uppercase tracking-widest text-zinc-600 font-medium">
                  Preview
                </span>
                <div className="flex-1 h-px bg-zinc-800" />
              </div>

              {/* Editor card */}
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl overflow-hidden">
                {/* Fake editor toolbar */}
                <div className="flex items-center gap-1 px-4 py-2.5 border-b border-zinc-800">
                  {["B", "I", "U"].map((l) => (
                    <div
                      key={l}
                      className="w-7 h-7 rounded-md bg-zinc-800 flex items-center justify-center text-xs text-zinc-500 font-medium"
                    >
                      {l}
                    </div>
                  ))}
                  <div className="w-px h-4 bg-zinc-700 mx-1" />
                  {["H1", "H2", "—"].map((l) => (
                    <div
                      key={l}
                      className="w-7 h-7 rounded-md bg-zinc-800 flex items-center justify-center text-xs text-zinc-500"
                    >
                      {l}
                    </div>
                  ))}
                  <div className="ml-auto text-xs text-zinc-600 font-mono">
                    Read-only preview
                  </div>
                </div>

                <div className="p-8">
                  <EditorContent editor={editor} />
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-center gap-3">
            <div className="w-14 h-14 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center">
              <LayoutTemplate size={24} className="text-zinc-600" />
            </div>
            <p className="text-sm font-medium text-zinc-400">
              Select a template to preview
            </p>
            <p className="text-xs text-zinc-600">
              Choose from the list on the left
            </p>
          </div>
        )}
      </main>
    </div>
  );
}
