import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import TurndownService from "turndown";

import {
  Star,
  Trash2,
  FileText,
  Pin,
  PenLine,
  FolderInput,
  FileCode2,
  FileDown,
  Edit,
  Clock3,
} from "lucide-react";

import Header from "../components/Header";
import ContextMenu from "../components/contextMenu";

import favNote from "../services/notebook/getFavNotes.services";
import readNote from "../services/notebook/readNote.services";
import renameNotes from "../services/notebook/renameNote.services";
import deleteNote from "../services/notebook/deleteNote.services";
import exportPdf from "../services/notebook/downloadPDFNote";
import pinNote from "../services/notebook/pinNote.services"; // Adjust the path if necessary

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
export default function FavNote() {
  const turndown = new TurndownService();
const [newTitle, setNewTitle] = useState("");
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const [menu, setMenu] = useState({ visible: false, x: 0, y: 0 });
  const [selectedNote, setSelectedNote] = useState(null);
  const [renameOpen, setRenameOpen] = useState(false);

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
        deleteNote(selectedNote.id);
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
  const handleContextMenu = (e, note) => {
    e.preventDefault();
    setSelectedNote(note);
    setMenu({ visible: true, x: e.clientX, y: e.clientY });
  };
  useEffect(() => {
    window.addEventListener("note-updated", getNotes);
    getNotes();
  }, []);

  const getNotes = async () => {
    const data = await favNote();
    setNotes(data || []);
  };

  const getPreview = (content) => {
    try {
      const json = typeof content === "string" ? JSON.parse(content) : content;

      const extractText = (node) => {
        if (node.text) return node.text;

        if (node.content) {
          return node.content.map(extractText).join(" ");
        }

        return "";
      };

      return extractText(json).slice(0, 160);
    } catch {
      return "No preview available";
    }
  };

  const formatDate = (date) => {
    const now = new Date();
    const updated = new Date(date);
    const diff = Math.floor((now - updated) / 1000);

    if (diff < 60) return "Just now";

    if (diff < 3600) {
      return `${Math.floor(diff / 60)}m ago`;
    }

    if (diff < 86400) {
      return `${Math.floor(diff / 3600)}h ago`;
    }

    if (diff < 604800) {
      return `${Math.floor(diff / 86400)}d ago`;
    }

    return updated.toLocaleDateString();
  };

  return (
    <div className="h-full overflow-y-auto bg-zinc-950 text-zinc-100">
      {" "}
      <Header title="Favorite Notes" />
      <div className="max-w-7xl mx-auto p-6">
        {notes.length === 0 ? (
          <div className="h-[70vh] flex items-center justify-center">
            <div className="text-center max-w-md">
              <div
                className="
              mx-auto
              h-28
              w-28
              rounded-full
              bg-zinc-900
              border
              border-zinc-800
              flex
              items-center
              justify-center
            "
              >
                <Star size={50} className="fill-blue-500 text-blue-500" />
              </div>

              <h2 className="text-2xl font-bold mt-6 text-zinc-100">
                Nothing Starred Yet
              </h2>

              <p className="text-zinc-400 mt-3 leading-relaxed">
                Important notes that you mark as favorites will appear here for
                quick access.
              </p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
            {notes.map((note) => (
              <div
                key={note.id}
                onContextMenu={(e) => handleContextMenu(e, note)}
                onClick={() => navigate(`/read/note/${note.id}`)}
                className="
              group
              bg-zinc-900
              border
              border-zinc-800
              rounded-3xl
              p-5
              cursor-pointer
              transition-all
              duration-200
              hover:border-blue-500
              hover:bg-zinc-800
              hover:-translate-y-1
              hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]
            "
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="
                  h-10
                  w-10
                  rounded-xl
                  bg-zinc-800
                  flex
                  items-center
                  justify-center
                "
                  >
                    <FileText size={18} className="text-zinc-400" />
                  </div>

                  <div
                    className="
                  h-8
                  w-8
                  rounded-lg
                  bg-blue-500/10
                  border
                  border-blue-500/20
                  flex
                  items-center
                  justify-center
                "
                  >
                    <Star size={14} className="fill-blue-500 text-blue-500" />
                  </div>
                </div>

                <h2
                  className="
                font-semibold
                text-sm
                text-zinc-100
                line-clamp-2
                mb-3
              "
                >
                  {note.title || "Untitled Note"}
                </h2>

                <p
                  className="
                text-xs
                text-zinc-400
                leading-relaxed
                line-clamp-4
                min-h-[80px]
              "
                >
                  {getPreview(note.content)}
                </p>

                <div
                  className="
                mt-5
                pt-4
                border-t
                border-zinc-800
                flex
                items-center
                justify-between
              "
                >
                  <div
                    className="
                  flex
                  items-center
                  gap-2
                  text-zinc-500
                  text-xs
                "
                  >
                    <Clock3 size={13} />
                    <span>{formatDate(note.updated_at)}</span>
                  </div>

                  <div
                    className="
                  text-xs
                  font-medium
                  text-blue-400
                  opacity-0
                  translate-x-2
                  transition-all
                  duration-200
                  group-hover:opacity-100
                  group-hover:translate-x-0
                "
                  >
                    Open →
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
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
    </div>
  );
}
