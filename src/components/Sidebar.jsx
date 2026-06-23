import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import {
  Search,
  FilePlus,
  Star,
  Trash2,
  Settings,
  FileText,
  Ellipsis,
} from "lucide-react";

import readNote from "../services/notebook/readNote.services";
import SearchBar from "./Search";

const navLinkClass = ({ isActive }) =>
  `  group
  flex items-center gap-3
  px-3 py-2.5
  rounded-xl
  transition-all duration-200
  ${
    isActive
      ? "bg-blue-600 text-white shadow-lg shadow-blue-500/20"
      : "text-zinc-400 hover:bg-zinc-900 hover:text-white"
  }`;

export default function Sidebar() {
  const [notes, setNotes] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const loadNotes = async () => {
      const data = await readNote();
      setNotes(data || []);
    };

    loadNotes();
  }, []);

  useEffect(() => {
    const refresh = async () => {
      const notes = await readNote();
      setNotes(notes || []);
    };

    window.addEventListener("note-updated", refresh);

    return () => {
      window.removeEventListener("note-updated", refresh);
    };
  }, []);

  return (
    <>
      <aside
        className="
w-72
h-screen
bg-zinc-950
text-white
flex
flex-col
border-r
border-zinc-800
"
        style={{
          WebkitAppRegion: "drag",
        }}
      >
        {/* Header */}{" "}
        <div className="h-16 px-4 flex items-center gap-3 border-b border-zinc-800">
          {" "}
          <img
            src="/wigglenote_logo.svg"
            alt="WiggleNote"
            className="w-8 h-8"
          />
          <div>
            <h1 className="font-semibold text-white">Wigglenote</h1>

            <p className="text-xs text-zinc-500">Personal Workspace</p>
          </div>
        </div>
        {/* Quick Actions */}
        <div className="p-3 border-b border-zinc-800">
          <p className="text-xs uppercase tracking-wider text-zinc-500 mb-3">
            Quick Actions
          </p>

          <div
            className="space-y-2"
            style={{
              WebkitAppRegion: "no-drag",
            }}
          >
            <NavLink to="/create-note" className={navLinkClass}>
              <FilePlus size={18} />
              Create Note
            </NavLink>

            <button
              onClick={() => setSearchOpen(true)}
              className="
            w-full
            flex
            items-center
            justify-between
            px-3
            py-2.5
            rounded-xl
            bg-zinc-900
            hover:bg-zinc-800
            transition-colors
            text-zinc-300
          "
            >
              <div className="flex items-center gap-3">
                <Search size={18} />
                Search
              </div>

              <kbd
                className="
              text-[11px]
              bg-zinc-800
              px-2
              py-1
              rounded-md
              text-zinc-500
            "
              >
                Ctrl K
              </kbd>
            </button>
          </div>
        </div>
        {/* Notes */}
        <div className="flex-1 overflow-y-auto p-3">
          <div className="flex items-center justify-between mb-3">
            <h3 className="text-xs uppercase tracking-wider text-zinc-500">
              Notes
            </h3>

            <span className="text-xs text-zinc-600">{notes.length}</span>
          </div>

          <div
            className="space-y-1"
            style={{
              WebkitAppRegion: "no-drag",
            }}
          >
            {notes.map((note) => (
              <NavLink
                key={note.id}
                to={`/read/note/${note.id}`}
                className={({ isActive }) =>
                  `
              group
              flex
              items-center
              gap-3
              p-3
              rounded-xl
              transition-all
              duration-200
              ${isActive ? "bg-zinc-800" : "hover:bg-zinc-900"}
            `
                }
              >
                <FileText size={16} className="text-blue-400 flex-shrink-0" />

                <div className="flex-1 min-w-0">
                  <p className="truncate text-sm font-medium text-zinc-200">
                    {note.title || "Untitled"}
                  </p>
                </div>

                <button
                  className="
                opacity-0
                group-hover:opacity-100
                transition-opacity
                text-zinc-500
                hover:text-white
              "
                >
                  <Ellipsis size={16} />
                </button>
              </NavLink>
            ))}
          </div>
        </div>
        {/* Collections */}
        <div className="border-t border-zinc-800 p-3">
          <p className="text-xs uppercase tracking-wider text-zinc-500 mb-3">
            Collections
          </p>

          <div
            className="space-y-2"
            style={{
              WebkitAppRegion: "no-drag",
            }}
          >
            <NavLink to="/favorites" className={navLinkClass}>
              <Star size={18} />
              Favorites
            </NavLink>

            <NavLink to="/trash" className={navLinkClass}>
              <Trash2 size={18} />
              Trash
            </NavLink>
          </div>
        </div>
        {/* Footer */}
        <div className="border-t border-zinc-800 p-3">
          <div
            style={{
              WebkitAppRegion: "no-drag",
            }}
          >
            <NavLink to="/settings" className={navLinkClass}>
              <Settings size={18} />
              Settings
            </NavLink>
          </div>
        </div>
      </aside>

      <SearchBar open={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
