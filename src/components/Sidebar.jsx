import React, { useEffect, useRef, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import logo from "../../public/wigglenote_logo.svg";

import {
  Search,
  FilePlus,
  Star,
  Trash2,
  Settings,
  FileText,
  Ellipsis,
  Pin,
  PenLine,
  FolderInput,
  FileCode2,
  FileDown,
  Edit,
  LayoutTemplate,
} from "lucide-react";
import readNote from "../services/notebook/readNote.services";
import SearchBar from "./Search";
import ContextMenu from "./contextMenu";
import renameNotes from "../services/notebook/renameNote.services";
import favNote from "../services/notebook/favNote.services";
import pinNote from "../services/notebook/pinNote.services";
import { generateHTML } from "@tiptap/core";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import TextAlign from "@tiptap/extension-text-align";
import HorizontalRule from "@tiptap/extension-horizontal-rule";
import Underline from "@tiptap/extension-underline";
import TurndownService from "turndown";
import exportPdf from "../services/notebook/downloadPDFNote";
import deleteNote from "../services/notebook/deleteNote.services";

// ─── Nav item used for quick actions + collections ────────────────────────────
function SideNavLink({ to, icon, children }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        `relative flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150 group
        ${
          isActive
            ? "text-white bg-white/6"
            : "text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.04]"
        }`
      }
    >
      {({ isActive }) => (
        <>
          {isActive && (
            <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-blue-500 rounded-full" />
          )}
          <span
            className={`transition-colors ${isActive ? "text-blue-400" : "text-zinc-600 group-hover:text-zinc-400"}`}
          >
            {icon}
          </span>
          <span className="font-medium">{children}</span>
        </>
      )}
    </NavLink>
  );
}

// ─── Section label ─────────────────────────────────────────────────────────────
function SectionLabel({ children, count }) {
  return (
    <div className="flex items-center justify-between px-3 mb-1.5 mt-5 first:mt-0">
      <span className="text-[10px] font-semibold tracking-widest uppercase text-zinc-600">
        {children}
      </span>
      {count !== undefined && (
        <span className="text-[10px] text-zinc-700 font-mono">{count}</span>
      )}
    </div>
  );
}

// ─── Main Sidebar ─────────────────────────────────────────────────────────────
export default function Sidebar() {
  const turndown = new TurndownService();
  const [notes, setNotes] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    window.addEventListener("keydown", (e) => {
      if (e.key === "k" && e.ctrlKey) {
        e.preventDefault();
        setSearchOpen(true);
      }
    });
  }, []);
  // ─── Resize ───────────────────────────────────────────────────────────────
  const sidebarRef = useRef(null);
  const isResizing = useRef(false);
  const [sidebarWidth, setSidebarWidth] = useState(256);

  const handleMouseDown = () => {
    isResizing.current = true;
    document.body.style.cursor = "col-resize";
    document.body.style.userSelect = "none";
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (!isResizing.current) return;
      const newWidth = e.clientX;
      if (newWidth >= 180 && newWidth <= 480) {
        setSidebarWidth(newWidth);
      }
    };

    const handleMouseUp = () => {
      isResizing.current = false;
      document.body.style.cursor = "";
      document.body.style.userSelect = "";
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, []);

  // ─── Notes ────────────────────────────────────────────────────────────────
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
    return () => window.removeEventListener("note-updated", refresh);
  }, []);

  const [menu, setMenu] = useState({ visible: false, x: 0, y: 0 });
  const [selectedNote, setSelectedNote] = useState(null);
  const [renameOpen, setRenameOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const handleContextMenu = (e, note) => {
    e.preventDefault();
    setSelectedNote(note);
    setMenu({ visible: true, x: e.clientX, y: e.clientY });
  };

  const items = [
    {
      label: "Open",
      icon: <FileText size={15} />,
      action: () => {
        if (!selectedNote) return;
        navigate(`/read/note/${selectedNote.id}`);
      },
    },
    { separator: true },
    {
      label: "Rename",
      icon: <PenLine size={15} />,
      action: () => {
        if (!selectedNote) return;
        setNewTitle(selectedNote.title);
        setRenameOpen(true);
      },
    },
    {
      label: "Edit",
      icon: <Edit size={15} />,
      action: () => {
        if (!selectedNote) return;
        navigate(`/edit/note/${selectedNote.id}`);
      },
    },
    {
      label: "Move to folder",
      icon: <FolderInput size={15} />,
      action: () => {},
      disabled: true,
    },
    { separator: true },
    {
      label: selectedNote?.is_favorite
        ? "Remove from favorites"
        : "Add to favorites",
      icon: <Star size={15} />,
      action: async () => {
        if (!selectedNote) return;
        await favNote(selectedNote.id);
        window.dispatchEvent(new Event("note-updated"));
      },
    },
    {
      label: selectedNote?.is_pinned ? "Unpin" : "Pin to top",
      icon: <Pin size={15} />,
      action: async () => {
        if (!selectedNote) return;
        await pinNote(selectedNote.id);
        window.dispatchEvent(new Event("note-updated"));
      },
    },
    { separator: true },
    {
      label: "Export as Markdown",
      icon: <FileCode2 size={15} />,
      action: () => {
        if (!selectedNote) return;
        const html = generateHTML(JSON.parse(selectedNote.content), [
          StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
          Image.configure({ inline: false }),
          Underline,
          Highlight.configure({ multicolor: true }),
          Link.configure({
            openOnClick: false,
            autolink: true,
            linkOnPaste: true,
          }),
          HorizontalRule,
          TaskList,
          TaskItem.configure({ nested: true }),
          TextAlign.configure({ types: ["heading", "paragraph"] }),
        ]);
        const markdown = turndown.turndown(html);
        const blob = new Blob([markdown], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `${selectedNote.title}.md`;
        a.click();
      },
    },
    {
      label: "Export as PDF",
      icon: <FileDown size={15} />,
      action: async () => {
        if (!selectedNote) return;
        const html = generateHTML(JSON.parse(selectedNote.content), [
          StarterKit,
          Image,
          Underline,
          Highlight,
          Link,
          HorizontalRule,
          TaskList,
          TaskItem,
          TextAlign,
        ]);
        await exportPdf(html, selectedNote.title);
      },
    },
    { separator: true },
    {
      label: "Delete",
      icon: <Trash2 size={15} />,
      action: () => {
        if (!selectedNote) return;
        const confirm = window.confirm(
          "Are you sure you want to delete this note?",
        );
        if (confirm) {
          deleteNote(selectedNote.id);
        } else {
          return;
        }
        window.dispatchEvent(new Event("note-updated"));
      },
      danger: true,
    },
  ];

  const handleRename = async () => {
    if (!selectedNote) return;
    await renameNotes({ id: selectedNote.id, title: newTitle });
    setRenameOpen(false);
    const notes = await readNote();
    setNotes(notes);
    window.dispatchEvent(new Event("note-updated"));
  };

  return (
    <>
      <aside
        ref={sidebarRef}
        onContextMenu={(e) => e.preventDefault()}
        style={{ width: sidebarWidth }}
        className="relative h-screen bg-[#0e0e0e] text-white flex flex-col border-r border-white/6 select-none shrink-0"
      >
        {/* ── Brand header ── */}
        <div className="flex items-center gap-2.5 px-4 h-14 border-b border-white/6 shrink-0">
          <img
            src={logo}
            alt=""
            className="w-10 h-10"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.parentElement.innerHTML =
                '<span class="text-white text-xs font-bold">W</span>';
            }}
          />
          <div className="min-w-0">
            <p className="text-sm font-semibold text-white tracking-tight leading-none">
              WiggleNote
            </p>
            <p className="text-[10px] text-zinc-600 mt-0.5 leading-none">
              Personal workspace
            </p>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden py-3 px-2 space-y-0.5 [&::-webkit-scrollbar]:hidden">
          <SectionLabel>Actions</SectionLabel>

          <NavLink
            to="/create-note"
            className={({ isActive }) =>
              `relative flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-all duration-150 group
              ${
                isActive
                  ? "bg-blue-600 text-white shadow-lg shadow-blue-900/30"
                  : "text-zinc-400 hover:text-zinc-100 hover:bg-white/4"
              }`
            }
          >
            <FilePlus size={15} />
            <span className="font-medium">New note</span>
          </NavLink>

          <SideNavLink to="/templates" icon={<LayoutTemplate size={15} />}>
            Templates
          </SideNavLink>

          <button
            onClick={() => setSearchOpen(true)}
            className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm text-zinc-500 hover:text-zinc-200 hover:bg-white/4 transition-all group"
            style={{ WebkitAppRegion: "no-drag" }}
          >
            <span className="flex items-center gap-2.5">
              <Search
                size={15}
                className="text-zinc-600 group-hover:text-zinc-400 transition-colors"
              />
              <span className="font-medium">Search</span>
            </span>
            <kbd className="text-[10px] bg-white/6 text-zinc-600 px-1.5 py-0.5 rounded font-mono">
              ⌘K
            </kbd>
          </button>

          <SectionLabel count={notes.length}>Notes</SectionLabel>

          <div style={{ WebkitAppRegion: "no-drag" }}>
            {notes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 px-4 text-center">
                <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/6 flex items-center justify-center mb-3">
                  <FileText size={18} className="text-zinc-700" />
                </div>
                <p className="text-xs font-medium text-zinc-500">
                  No notes yet
                </p>
                <p className="text-[11px] text-zinc-700 mt-1 leading-relaxed">
                  Create your first note to get started
                </p>
              </div>
            ) : (
              <div className="space-y-0.5">
                {notes.map((note) => (
                  <NavLink
                    onContextMenu={(e) => handleContextMenu(e, note)}
                    key={note.id}
                    to={`/read/note/${note.id}`}
                    className={({ isActive }) =>
                      `relative group flex items-center gap-2.5 px-3 py-2 rounded-lg transition-all duration-150
                      ${
                        isActive
                          ? "bg-white/[0.06] text-white"
                          : "text-zinc-500 hover:text-zinc-200 hover:bg-white/[0.03]"
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        {isActive && (
                          <span className="absolute left-0 top-1/2 -translate-y-1/2 w-0.5 h-5 bg-blue-500 rounded-full" />
                        )}
                        <FileText
                          size={14}
                          className={`shrink-0 transition-colors ${isActive ? "text-blue-400" : "text-zinc-700 group-hover:text-zinc-500"}`}
                        />
                        <span className="flex-1 min-w-0 text-xs font-medium truncate leading-relaxed">
                          {note.title || "Untitled"}
                        </span>
                        <div className="flex items-center gap-1 shrink-0">
                          {note.is_pinned !== 0 && (
                            <Pin size={11} className="text-zinc-600" />
                          )}
                          <button
                            className="opacity-0 group-hover:opacity-100 transition-opacity text-zinc-600 hover:text-zinc-300 p-0.5 rounded"
                            onClick={(e) => {
                              e.preventDefault();
                              e.stopPropagation();
                              handleContextMenu(e, note);
                            }}
                          >
                            <Ellipsis size={13} />
                          </button>
                        </div>
                      </>
                    )}
                  </NavLink>
                ))}
              </div>
            )}
          </div>

          <SectionLabel>Collections</SectionLabel>
          <SideNavLink to="/favorites" icon={<Star size={15} />}>
            Favorites
          </SideNavLink>
          <SideNavLink to="/trash" icon={<Trash2 size={15} />}>
            Trash
          </SideNavLink>
        </div>

        {/* ── Footer ── */}
        <div className="shrink-0 border-t border-white/6 px-2 py-2">
          <SideNavLink to="/settings" icon={<Settings size={15} />}>
            Settings
          </SideNavLink>
        </div>

        {/* ── Drag handle ── */}
        <div
          onMouseDown={handleMouseDown}
          className="absolute right-0 top-0 h-full w-1 cursor-col-resize hover:bg-blue-500/40 transition-colors z-50"
        />
      </aside>

      <SearchBar open={searchOpen} onClose={() => setSearchOpen(false)} />

      {/* ── Rename modal ── */}
      {renameOpen && (
        <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-500">
          <div className="bg-zinc-900/90 backdrop-blur-sm border border-white/8 rounded-2xl p-5 w-80 shadow-2xl">
            <h2 className="text-sm font-semibold text-zinc-100 mb-1">
              Rename note
            </h2>
            <p className="text-xs text-zinc-600 mb-4">
              Enter a new title for this note.
            </p>
            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleRename()}
              autoFocus
              className="w-full px-3 py-2 text-sm rounded-lg bg-white/[0.05] border border-white/[0.08] text-zinc-100 placeholder:text-zinc-600 outline-none focus:border-blue-500/50 transition-colors"
              placeholder="Note title"
            />
            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setRenameOpen(false)}
                className="px-3 py-1.5 text-xs rounded-lg bg-white/[0.05] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.08] transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleRename}
                className="px-3 py-1.5 text-xs rounded-lg bg-blue-600 hover:bg-blue-500 text-white font-medium transition-colors"
              >
                Rename
              </button>
            </div>
          </div>
        </div>
      )}

      <ContextMenu
        {...menu}
        items={items}
        onClose={() => setMenu((prev) => ({ ...prev, visible: false }))}
      />
    </>
  );
}
