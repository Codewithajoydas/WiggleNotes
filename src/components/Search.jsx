import React, { useContext, useEffect, useMemo, useState } from "react";
import { Search as SearchIcon, FileText, X, Command } from "lucide-react";
import { useNavigate } from "react-router-dom";
import readNote from "../services/notebook/readNote.services";
import { SettingsContext } from "../store/Settings.context";
import { getThemeColors } from "../constants/Theme";

function extractText(node) {
  if (!node) return "";
  if (node.type === "taskList" || node.type === "taskItem") return "";
  if (node.type === "text") return node.text || "";
  return (node.content || []).map(extractText).join(" ");
}

export default function SearchBar({ open, onClose }) {
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);
  const [query, setQuery] = useState("");

  const { settings } = useContext(SettingsContext);
  const COLORS = useMemo(
    () => getThemeColors(settings.theme, settings.accent_color),
    [settings.theme, settings.accent_color],
  );

  useEffect(() => {
    const getNotes = async () => {
      const data = await readNote();
      setNotes(data || []);
    };
    if (open) getNotes();
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const filteredNotes = useMemo(() => {
    if (!query.trim()) return notes;
    const search = query.toLowerCase();
    return notes.filter((note) => {
      let contentText = "";
      try {
        contentText = extractText(JSON.parse(note.content)).toLowerCase();
      } catch {
        contentText = "";
      }
      return (
        note.title?.toLowerCase().includes(search) ||
        contentText.includes(search)
      );
    });
  }, [notes, query]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 flex items-start justify-center pt-24 z-[1000]"
      style={{
        backgroundColor: "rgba(0,0,0,0.5)",
        backdropFilter: "blur(4px)",
      }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-3xl overflow-hidden rounded-2xl h-[calc(100vh-150px)]"
        style={{
          backgroundColor: `${COLORS.bgSecondary}cc`,
          backdropFilter: "blur(24px)",
          border: `1px solid ${COLORS.border}`,
          boxShadow: "0 20px 80px rgba(0,0,0,0.5)",
        }}
      >
        {/* Search Header */}
        <div style={{ borderBottom: `1px solid ${COLORS.border}` }}>
          <div className="flex items-center gap-3 px-5 py-4">
            <SearchIcon
              size={20}
              className="flex-shrink-0"
              style={{ color: COLORS.textMuted }}
            />
            <input
              autoFocus
              type="text"
              placeholder="Search notes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="flex-1 bg-transparent outline-none text-sm"
              style={{
                color: COLORS.textPrimary,
              }}
            />
            <div
              className="hidden sm:flex items-center gap-1 px-2 py-1 rounded-md text-xs"
              style={{
                backgroundColor: COLORS.bgHover,
                color: COLORS.textMuted,
              }}
            >
              <Command size={12} />
              ESC
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-lg transition-colors"
              style={{ color: COLORS.textMuted }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = COLORS.bgHover;
                e.currentTarget.style.color = COLORS.textPrimary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = COLORS.textMuted;
              }}
            >
              <X size={18} />
            </button>
          </div>

          <div
            className="px-5 pb-3 text-xs"
            style={{ color: COLORS.textMuted }}
          >
            {filteredNotes.length} result{filteredNotes.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Results */}
        <div className="max-h-[550px] overflow-y-auto">
          {filteredNotes.length === 0 ? (
            <div className="py-16 flex flex-col items-center justify-center">
              <div
                className="h-14 w-14 rounded-2xl flex items-center justify-center"
                style={{ backgroundColor: COLORS.bgHover }}
              >
                <SearchIcon size={24} style={{ color: COLORS.textSubtle }} />
              </div>
              <h3
                className="mt-4 font-medium"
                style={{ color: COLORS.textPrimary }}
              >
                No notes found
              </h3>
              <p className="mt-1 text-sm" style={{ color: COLORS.textSubtle }}>
                Try another keyword
              </p>
            </div>
          ) : (
            filteredNotes.map((note) => {
              let preview = "";
              try {
                preview = extractText(JSON.parse(note.content))
                  .replace(/\s+/g, " ")
                  .trim();
              } catch {
                preview = "";
              }

              return (
                <button
                  key={note.id}
                  onClick={() => {
                    navigate(`/read/note/${note.id}`);
                    onClose();
                  }}
                  className="w-full flex items-start gap-4 px-5 py-3 text-left transition-colors group"
                  style={{ borderBottom: `1px solid ${COLORS.border}` }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = COLORS.bgHover)
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "transparent")
                  }
                >
                  <div
                    className="h-7 w-7 rounded-md flex items-center justify-center flex-shrink-0 transition-colors"
                    style={{ backgroundColor: COLORS.bgHover }}
                    onMouseEnter={(e) =>
                      (e.currentTarget.style.backgroundColor = `${COLORS.accent}22`)
                    }
                    onMouseLeave={(e) =>
                      (e.currentTarget.style.backgroundColor = COLORS.bgHover)
                    }
                  >
                    <FileText size={15} style={{ color: COLORS.textMuted }} />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3
                      className="font-medium text-sm truncate"
                      style={{ color: COLORS.textPrimary }}
                    >
                      {note.title || "Untitled Note"}
                    </h3>
                    <p
                      className="mt-1 text-xs line-clamp-2"
                      style={{ color: COLORS.textMuted }}
                    >
                      {preview || "No content"}
                    </p>
                  </div>
                </button>
              );
            })
          )}
        </div>
      </div>
    </div>
  );
}
