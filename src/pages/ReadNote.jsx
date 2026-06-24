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
  Pen,
  Trash,
} from "lucide-react";

import CreateFab from "../components/createFab";
import getNoteById from "../services/notebook/getNoteById.services";
import deleteNote from "../services/notebook/deleteNote.services";
import favNote from "../services/notebook/favNote.services";
import pinNote from "../services/notebook/pinNote.services";
import Header from "../components/Header";

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

  return () => {
    window.removeEventListener("note-updated", loadNote);
  };
}, [id]);

  const content = useMemo(() => {
    if (!note?.content) return {};

    try {
      return JSON.parse(note.content);
    } catch (error) {
      console.error(error);
      return {};
    }
  }, [note]);

  const editor = useEditor({
    immediatelyRender: false,

    editable: false,

    extensions: [
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
        openOnClick: true,
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
    ],

    content: {},
  });

  useEffect(() => {
    if (editor && note) {
      editor.commands.setContent(content);
    }
  }, [editor, note, content]);

  if (!editor || !note) {
    return (
      <div className="h-screen flex items-center justify-center">
        Loading...
      </div>
    );
  }

  const handleDelete = async () => {
    try {
      const confirmation = window.confirm("Are you sure you want to delete?");
      if (!confirmation) return;
      await deleteNote(note.id);
      window.dispatchEvent(new CustomEvent("note-updated"));
      navigate("/");
    } catch (error) {
      console.error(error);
    }
  };

  const handlePin = async () => {
    try {
      await pinNote(note.id);
      loadNote();
    } catch (error) {
      console.error(error);
    }
  };
  const handleFav = async () => {
    try {
      await favNote(note.id);
      loadNote();
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="h-screen flex flex-col bg-zinc-950">
      <Header title={note?.title}>
        <div className="flex items-center gap-1">
          <button
            className="h-9 w-9 rounded-lg hover:bg-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
            onClick={() => navigate(`/edit/note/${note.id}`)}
          >
            <Pen size={18} />
          </button>

          <button
            className="h-9 w-9 rounded-lg hover:bg-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
            onClick={handleFav}
          >
            {note?.is_favorite ? (
              <Star size={18} className="fill-yellow-400 stroke-yellow-400" />
            ) : (
              <Star size={18} />
            )}
          </button>

          <button
            className="h-9 w-9 rounded-lg hover:bg-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white transition-colors"
            onClick={handlePin}
          >
            {note?.is_pinned ? (
              <Pin size={18} className="fill-blue-400 stroke-blue-400" />
            ) : (
              <Pin size={18} />
            )}
          </button>

          <button
            className="h-9 w-9 rounded-lg hover:bg-red-950 text-red-400 hover:text-red-300 flex items-center justify-center transition-colors"
            onClick={handleDelete}
          >
            <Trash size={18} />
          </button>

          <button className="h-9 w-9 rounded-lg hover:bg-zinc-800 flex items-center justify-center text-zinc-300 hover:text-white transition-colors">
            <MoreVertical size={18} />
          </button>
        </div>
      </Header>
      <main className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto px-8 py-4">
          <EditorContent
            editor={editor}
            spellCheck
            className="
              prose
              prose-zinc
              max-w-none
              focus:outline-none
            "
          />
        </div>
      </main>
      <CreateFab
        title="Edit"
        icon={<Pencil size={18} />}
        onClick={() => navigate(`/edit/note/${note.id}`)}
      />
    </div>
  );
}
