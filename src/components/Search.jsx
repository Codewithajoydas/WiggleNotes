import React, { useEffect, useMemo, useState } from "react";
import { Search as SearchIcon, FileText, X, Command } from "lucide-react";
import { useNavigate } from "react-router-dom";
import readNote from "../services/notebook/readNote.services";

function extractText(node) {
  if (!node) return "";

  if (node.type === "taskList" || node.type === "taskItem") {
    return "";
  }

  if (node.type === "text") {
    return node.text || "";
  }

  return (node.content || []).map(extractText).join(" ");
}

export default function SearchBar({ open, onClose }) {
  const navigate = useNavigate();

  const [notes, setNotes] = useState([]);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const getNotes = async () => {
      const data = await readNote();
      setNotes(data || []);
    };

    if (open) {
      getNotes();
    }
  }, [open]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
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
      className="
        fixed inset-0
        bg-black/50
        backdrop-blur-sm
        flex items-start justify-center
        pt-24
        z-1000
      "
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="
          w-full
          max-w-3xl
          overflow-hidden
          rounded-2xl
          bg-zinc-900/60
          backdrop-blur-2xl
          border
          border-zinc-800
          shadow-[0_20px_80px_rgba(0,0,0,0.5)]
          h-[calc(100vh-150px)]
        "
      >
        {/* Search Header */}
        <div className="border-b border-zinc-800">
          <div className="flex items-center gap-3 px-5 py-4">
            <SearchIcon size={20} className="text-zinc-500 flex-shrink-0" />

            <input
              autoFocus
              type="text"
              placeholder="Search notes..."
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="
                flex-1
                bg-transparent
                outline-none
text-sm
                text-zinc-100
                placeholder:text-zinc-500

              "
            />

            <div
              className="
                hidden sm:flex
                items-center gap-1
                px-2 py-1
                rounded-md
                bg-zinc-800
                text-zinc-400

                text-xs
              "
            >
              <Command size={12} />
              ESC
            </div>

            <button
              onClick={onClose}
              className="
                p-2
                rounded-lg

                hover:bg-zinc-800

                text-zinc-400
                hover:text-zinc-100

                transition-colors
              "
            >
              <X size={18} />
            </button>
          </div>

          <div
            className="
              px-5 pb-3

              text-xs
              text-zinc-500
            "
          >
            {filteredNotes.length} result
            {filteredNotes.length !== 1 ? "s" : ""}
          </div>
        </div>

        {/* Results */}
        <div className="max-h-[550px] overflow-y-auto">
          {filteredNotes.length === 0 ? (
            <div
              className="
                py-16

                flex
                flex-col
                items-center
                justify-center
              "
            >
              <div
                className="
                  h-14 w-14

                  rounded-2xl

                  bg-zinc-800

                  flex
                  items-center
                  justify-center
                "
              >
                <SearchIcon size={24} className="text-zinc-500" />
              </div>

              <h3 className="mt-4 font-medium text-zinc-200">No notes found</h3>

              <p className="mt-1 text-sm text-zinc-500">Try another keyword</p>
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
                  className="
                    w-full

                    flex
                    items-start
                    gap-4

                    px-5
                    py-3

                    text-left

                    border-b
                    border-zinc-800

                    hover:bg-zinc-800/60
group
                    transition-colors
                  "
                >
                  <div
                    className="
                      h-7
                      w-7

                      rounded-md

                      bg-zinc-800
                  group-hover:bg-blue-900/20
                  transition
                      flex
                      items-center
                      justify-center

                      flex-shrink-0
                    "
                  >
                    <FileText size={15} className="text-zinc-400 group-hover:text-blue-600" />
                  </div>

                  <div className="flex-1 min-w-0">
                    <h3
                      className="
                        font-medium
                        text-zinc-100
text-sm
                        truncate
                      "
                    >
                      {note.title || "Untitled Note"}
                    </h3>

                    <p
                      className="
                        mt-1

                        text-xs
                        text-zinc-400

                        line-clamp-2
                      "
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
