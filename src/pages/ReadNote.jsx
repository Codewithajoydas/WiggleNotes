import { useEffect, useMemo, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";
import Underline from "@tiptap/extension-underline";
import Highlight from "@tiptap/extension-highlight";
import Link from "@tiptap/extension-link";
import TextAlign from "@tiptap/extension-text-align";
import TaskList from "@tiptap/extension-task-list";
import TaskItem from "@tiptap/extension-task-item";
import HorizontalRule from "@tiptap/extension-horizontal-rule";

import {
  ArrowLeft,
  Pencil,
  Star,
  Pin,
  MoreVertical,
  Trash2,
  FileCode2,
  FileDown,
  FolderInput,
  PenLine,
  Edit,
  FileText,
} from "lucide-react";

import CreateFab from "../components/createFab";
import getNoteById from "../services/notebook/getNoteById.services";
import deleteNote from "../services/notebook/deleteNote.services";
import favNote from "../services/notebook/favNote.services";
import pinNote from "../services/notebook/pinNote.services";
import ContextMenu from "../components/contextMenu";
import Header from "../components/Header";

// ─── Icon button used in the header bar ──────────────────────────────────────
function HeaderAction({ onClick, active, danger, title, children }) {
  return (
    <button
      title={title}
      onClick={onClick}
      className={`
        h-8 w-8 rounded-lg flex items-center justify-center transition-all duration-150
        ${
          danger
            ? "text-zinc-600 hover:bg-red-500/10 hover:text-red-400"
            : active
              ? "text-blue-400 bg-blue-500/10"
              : "text-zinc-600 hover:bg-white/[0.06] hover:text-zinc-300"
        }
      `}
    >
      {children}
    </button>
  );
}

const Cover = ({ type, value, children }) => {
  switch (type) {
    case "image":
      return (
        <div
          className="w-full h-50 shrink-0 relative bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${value})`,
          }}
        >
          {children}
        </div>
      );

    case "gradient":
      return (
        <div
          className="w-full h-50 shrink-0 relative"
          style={{
            background: value,
          }}
        >
          {children}
        </div>
      );

    case "color":
      return (
        <div
          className="w-full h-50 shrink-0 relative"
          style={{
            backgroundColor: value,
          }}
        >
          {children}
        </div>
      );

    default:
      return null;
  }
};

export default function ReadNote() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [note, setNote] = useState(null);

  const loadNote = async () => {
    try {
      const data = await getNoteById(id);
      if (!data || data.is_deleted) {
        navigate("/");
        return;
      }
      setNote(data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadNote();
    window.addEventListener("note-updated", loadNote);
    return () => window.removeEventListener("note-updated", loadNote);
  }, [id]);

  const content = useMemo(() => {
    if (!note?.content) return {};
    try {
      return JSON.parse(note.content);
    } catch {
      return {};
    }
  }, [note]);

  const editor = useEditor({
    immediatelyRender: false,
    editable: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Image.configure({ inline: false }),
      Underline,
      Highlight.configure({ multicolor: true }),
      Link.configure({ openOnClick: true, autolink: true, linkOnPaste: true }),
      HorizontalRule,
      TaskList,
      TaskItem.configure({ nested: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
    ],
    content: {},
  });

  useEffect(() => {
    if (editor && note) editor.commands.setContent(content);
  }, [editor, note, content]);

  const handleDelete = async () => {
    const ok = window.confirm("Delete this note? This cannot be undone.");
    if (!ok) return;
    try {
      await deleteNote(note.id);
      window.dispatchEvent(new CustomEvent("note-updated"));
      navigate("/");
    } catch (e) {
      console.error(e);
    }
  };

  const handlePin = async () => {
    try {
      await pinNote(note.id);
      loadNote();
    } catch (e) {
      console.error(e);
    }
  };

  const handleFav = async () => {
    try {
      await favNote(note.id);
      loadNote();
    } catch (e) {
      console.error(e);
    }
  };

  const [menu, setMenu] = useState({ visible: false, x: 0, y: 0 });

  const items = [
    {
      label: "Edit",
      icon: <Edit size={15} />,
      action: () => navigate(`/edit/note/${note.id}`),
    },
    { separator: true },
    { label: "Rename", icon: <PenLine size={15} />, action: () => {} },
    {
      label: "Move to folder",
      icon: <FolderInput size={15} />,
      action: () => {},
      disabled: true,
    },
    { separator: true },
    {
      label: note?.is_favorite ? "Remove from favorites" : "Add to favorites",
      icon: <Star size={15} />,
      action: handleFav,
    },
    {
      label: note?.is_pinned ? "Unpin" : "Pin to top",
      icon: <Pin size={15} />,
      action: handlePin,
    },
    { separator: true },
    {
      label: "Export as Markdown",
      icon: <FileCode2 size={15} />,
      action: () => {},
    },
    { label: "Export as PDF", icon: <FileDown size={15} />, action: () => {} },
    { separator: true },
    {
      label: "Delete",
      icon: <Trash2 size={15} />,
      action: handleDelete,
      danger: true,
    },
  ];

  // Cover style (matches CreateNote cover system)
  const coverStyle = note?.cover
    ? note.cover.type === "image"
      ? {
          backgroundImage: `url(${note.cover.value})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }
      : { background: note.cover.value }
    : null;

  if (!editor || !note) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#0e0e0e]">
        <div className="flex flex-col items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-white/[0.04] border border-white/[0.06] flex items-center justify-center animate-pulse">
            <FileText size={16} className="text-zinc-700" />
          </div>
          <p className="text-xs text-zinc-600">Loading note…</p>
        </div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col bg-zinc-950 text-zinc-100">
      {/* ── Header ── */}

      <Header>
        {/* Actions */}
        <div className="flex items-center gap-0.5">
          <HeaderAction
            title="Edit note"
            onClick={() => navigate(`/edit/note/${note.id}`)}
          >
            <Pencil size={15} />
          </HeaderAction>

          <HeaderAction
            title={
              note.is_favorite ? "Remove from favorites" : "Add to favorites"
            }
            active={!!note.is_favorite}
            onClick={handleFav}
          >
            <Star
              size={15}
              className={
                note.is_favorite ? "fill-yellow-400 stroke-yellow-400" : ""
              }
            />
          </HeaderAction>

          <HeaderAction
            title={note.is_pinned ? "Unpin" : "Pin to top"}
            active={!!note.is_pinned}
            onClick={handlePin}
          >
            <Pin
              size={15}
              className={note.is_pinned ? "fill-blue-400 stroke-blue-400" : ""}
            />
          </HeaderAction>

          <HeaderAction title="Delete note" danger onClick={handleDelete}>
            <Trash2 size={15} />
          </HeaderAction>

          <HeaderAction
            title="More options"
            onClick={(e) => {
              const rect = e.currentTarget.getBoundingClientRect();
              setMenu({
                visible: true,
                x: rect.right - 180,
                y: rect.bottom + 6,
              });
            }}
          >
            <MoreVertical size={15} />
          </HeaderAction>
        </div>
      </Header>

      {/* ── Content ── */}
      <main className="flex-1 overflow-auto">
        {/* ── Cover banner ── */}
        {note.cover_type && (
          <Cover type={note.cover_type} value={note.cover_value}>
            <div className="left-55 absolute bottom-3">
              <h1 className="text-4xl font-bold text-zinc-100 mb-1 leading-snug">
                {note.title || "Untitled"}
              </h1>

              {/* Meta row */}
              <div className="flex items-center gap-3 mb-8">
                {note.is_pinned ? (
                  <span className="inline-flex items-center gap-1 text-[10px] text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded-full font-medium">
                    <Pin size={9} className="fill-blue-400" /> Pinned
                  </span>
                ) : null}
                {note.is_favorite ? (
                  <span className="inline-flex items-center gap-1 text-[10px] text-yellow-400 bg-yellow-500/10 px-2 py-0.5 rounded-full font-medium">
                    <Star size={9} className="fill-yellow-400" /> Favorite
                  </span>
                ) : null}
                {note.created_at && (
                  <span className="text-[11px] text-zinc-300">
                    {new Date(note.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </span>
                )}
              </div>
            </div>

            <div className="absolute inset-x-0 bottom-0 h-16 bg-linear-to-t from-zinc-950 to-transparent" />
          </Cover>
        )}

        <div className="max-w-3xl mx-auto px-8 py-8">
          {/* Note title displayed large above content */}

          {/* Editor */}
          <EditorContent
            editor={editor}
            spellCheck
            className="prose prose-invert prose-zinc max-w-none focus:outline-none
              prose-headings:text-zinc-100 prose-headings:font-semibold
              prose-p:text-zinc-400 prose-p:leading-relaxed
              prose-strong:text-zinc-200
              prose-code:text-blue-300 prose-code:bg-blue-500/10 prose-code:px-1 prose-code:rounded
              prose-blockquote:border-blue-500/40 prose-blockquote:text-zinc-500
              prose-a:text-blue-400 prose-a:no-underline hover:prose-a:underline
              prose-hr:border-white/[0.06]
            "
          />
        </div>
      </main>

      {/* ── FAB ── */}
      <CreateFab
        title="Edit"
        icon={<Pencil size={16} />}
        onClick={() => navigate(`/edit/note/${note.id}`)}
      />

      <ContextMenu
        {...menu}
        items={items}
        onClose={() => setMenu((prev) => ({ ...prev, visible: false }))}
      />
    </div>
  );
}
