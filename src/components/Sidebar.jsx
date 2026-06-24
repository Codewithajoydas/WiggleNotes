import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  Search,
  FilePlus,
  Star,
  Trash2,
  Settings,
  FileText,
  Ellipsis,
  Pin,
  ExternalLink,
  PenLine,
  CopyPlus,
  FolderInput,
  Tags,
  Scissors,
  Copy,
  Clipboard,
  FileCode2,
  FileDown,
  Edit,
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
  const turndown = new TurndownService();
  const [notes, setNotes] = useState([]);
  const [searchOpen, setSearchOpen] = useState(false);
  const navigate = useNavigate();

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

  const [menu, setMenu] = useState({
    visible: false,
    x: 0,
    y: 0,
  });
  const [selectedNote, setSelectedNote] = useState(null);
  const [renameOpen, setRenameOpen] = useState(false);
  const [newTitle, setNewTitle] = useState("");

  const handleContextMenu = (e, note) => {
    e.preventDefault();
    setSelectedNote(note);
    setMenu({
      visible: true,
      x: e.clientX,
      y: e.clientY,
    });
  };

  const items = [
    {
      label: "Open",
      icon: <FileText size={16} />,
      action: () => {
        if (!selectedNote) return;
        navigate(`/read/note/${selectedNote.id}`);
      },
    },
    {
      separator: true,
    },

    {
      label: "Rename",
      icon: <PenLine size={16} />,
      action: () => {
        if (!selectedNote) return;

        setNewTitle(selectedNote.title);
        setRenameOpen(true);
      },
    },
    {
      label: "Edit Note",
      icon: <Edit size={16} />,
      action: () => {
        if (!selectedNote) return;
        navigate(`/edit/note/${selectedNote.id}`);
      },
    },
    {
      label: "Move To Folder",
      icon: <FolderInput size={16} />,
      action: () => {},
      disabled: true,
    },

    {
      separator: true,
    },

    {
      label: selectedNote?.is_favorite ? "Remove Favorite" : "Favorite",
      icon: <Star size={16} />,
      action: async () => {
        if (!selectedNote) return;

        await favNote(selectedNote.id);
        window.dispatchEvent(new Event("note-updated"));
      },
    },
    {
      label: selectedNote?.is_pinned ? "Unpin" : "Pin To Top",
      icon: <Pin size={16} />,
      action: async () => {
        if (!selectedNote) return;

        await pinNote(selectedNote.id);
        window.dispatchEvent(new Event("note-updated"));
      },
    },
    {
      separator: true,
    },

    {
      label: "Export as Markdown",
      icon: <FileCode2 size={16} />,
      action: () => {
        if (!selectedNote) return;
        const html = generateHTML(JSON.parse(selectedNote.content), [
          StarterKit.configure({
            heading: {
              levels: [1, 2, 3],
            },
          }),

          Image.configure({
            inline: false,
          }),

          Underline,

          Highlight.configure({
            multicolor: true,
          }),

          Link.configure({
            openOnClick: false,
            autolink: true,
            linkOnPaste: true,
          }),

          HorizontalRule,

          TaskList,

          TaskItem.configure({
            nested: true,
          }),

          TextAlign.configure({
            types: ["heading", "paragraph"],
          }),
        ]);
        const markdown = turndown.turndown(html);
        const blob = new Blob([markdown], { type: "text/markdown" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `${selectedNote.title}.md`;
        link.click();
      },
    },
    {
      label: "Export as PDF",
      icon: <FileDown size={16} />,
      action: async () => {
        if (!selectedNote) return;

        const content = JSON.parse(selectedNote.content);

        const html = generateHTML(content, [
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

    {
      separator: true,
    },

    {
      label: "Delete",
      icon: <Trash2 size={16} />,
      action: () => {
        if (!selectedNote) return;
        deleteNote(selectedNote.id);
        window.dispatchEvent(new Event("note-updated"));
      },
      danger: true,
    },
  ];

  const handleRename = async () => {
    if (!selectedNote) return;

    await renameNotes({
      id: selectedNote.id,
      title: newTitle,
    });

    setRenameOpen(false);

    const notes = await readNote();
    setNotes(notes);

    window.dispatchEvent(new Event("note-updated"));
  };
  return (
    <>
      <aside
        onContextMenu={(e) => e.preventDefault()}
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
            <ContextMenu
              {...menu}
              items={items}
              onClose={() =>
                setMenu((prev) => ({
                  ...prev,
                  visible: false,
                }))
              }
            />
            {notes.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-10 text-center">
                <FileText size={40} className="text-zinc-700 mb-3" />

                <p className="text-sm font-medium text-zinc-400">
                  No notes found
                </p>

                <p className="text-xs text-zinc-600 mt-1">
                  Create your first note to get started
                </p>
              </div>
            ) : (
              notes.map((note) => (
                <NavLink
                  onContextMenu={(e) => handleContextMenu(e, note)}
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

                  {note.is_pinned !== 0 && (
                    <Pin size={16} className="text-zinc-400 flex-shrink-0" />
                  )}

                  <button
                    className="
          opacity-0
          group-hover:opacity-100
          transition-opacity
          text-zinc-500
          hover:text-white
        "
                    onClick={(e) => {
                      e.stopPropagation();
                      handleContextMenu(e, note);
                    }}
                  >
                    <Ellipsis size={16} />
                  </button>
                </NavLink>
              ))
            )}
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
      {renameOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-zinc-900 p-5 rounded-xl w-96 border border-zinc-800">
            <h2 className="text-lg font-semibold mb-4">Rename Note</h2>

            <input
              value={newTitle}
              onChange={(e) => setNewTitle(e.target.value)}
              className="w-full px-3 py-2 rounded-lg bg-zinc-800 outline-none"
              placeholder="Enter note title"
            />

            <div className="flex justify-end gap-2 mt-4">
              <button
                onClick={() => setRenameOpen(false)}
                className="px-4 py-2 rounded-lg bg-zinc-800"
              >
                Cancel
              </button>

              <button
                onClick={handleRename}
                className="px-4 py-2 rounded-lg bg-blue-600"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
