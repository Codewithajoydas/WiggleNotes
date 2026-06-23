import { useEffect, useRef, useState } from "react";
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
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Strikethrough,
  Highlighter,
  Heading1,
  Heading2,
  Heading3,
  List,
  ListOrdered,
  CheckSquare,
  Quote,
  Code2,
  Minus,
  Link2,
  ImageIcon,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  Undo2,
  Redo2,
  Eraser,
  Lock,
  Unlock,
  EyeClosed,
  Eye,
  PencilOff,
  Pencil,
  Save,
} from "lucide-react";
import CreateFab from "../components/createFab";
import createNote from "../services/notebook/createNote.services";
import getNoteById from "../services/notebook/getNoteById.services";
import { useParams } from "react-router-dom";
import updateNote from "../services/notebook/updateNote.services";

export default function EditNote() {
  const imageInputRef = useRef(null);
  const [editable, setEditable] = useState(true);
  const [title, setTitle] = useState("Untitled Note");
  const { id } = useParams();

  const editor = useEditor({
    immediatelyRender: false,

    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3, 4, 5, 6],
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
    ],

    content: `
      <h1>Untitled Note</h1>
      <p>Start writing your thoughts...</p>
    `,
  });
  useEffect(() => {
    async function loadNote() {
      const note = await getNoteById(id);
      setTitle(note.title);
      editor?.commands.setContent(JSON.parse(note.content));
    }

    loadNote();
  }, [id, editor]);
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];

    if (!file || !editor) return;

    const imageUrl = URL.createObjectURL(file);

    editor
      .chain()
      .focus()
      .setImage({
        src: imageUrl,
      })
      .run();

    e.target.value = "";
  };

  const ToolbarButton = ({
    onClick,
    active = false,
    disabled = false,
    children,
  }) => (
    <button
      type="button"
      disabled={disabled}
      onMouseDown={(e) => {
        e.preventDefault();

        if (!disabled) {
          onClick?.();
        }
      }}
      className={`
      shrink-0
      h-9
      w-9
      rounded-lg
      flex
      items-center
      justify-center
      transition-all
      duration-150
      ${
        disabled
          ? "opacity-40 cursor-not-allowed"
          : active
            ? "bg-blue-500 text-white shadow-sm"
            : "text-zinc-600 hover:bg-zinc-100"
      }
    `}
    >
      {children}
    </button>
  );

  if (!editor) return null;

   const handleSubmit = async () => {
     try {
       await updateNote({
         id,
         title: title.trim() ? title : "Untitled Note",
         content: JSON.stringify(editor.getJSON()),
       });

       window.dispatchEvent(new CustomEvent("note-updated"));
     } catch (error) {
       alert(error);
       console.error(error);
     }
   };

  return (
    <div className="h-screen flex flex-col bg-zinc-900 text-zinc-100">
      <div
        className="
   sticky top-0 z-50
    flex items-center gap-2
    h-16
    px-4
    bg-zinc-950/95
    backdrop-blur-xl
    border-b border-zinc-800
    overflow-x-auto
    [&::-webkit-scrollbar]:hidden
    pr-[150px]
  "
      >
        {/* title  */}
        <input
          type="text"
          value={title}
          placeholder="Untitled Note"
          onChange={(e) => setTitle(e.target.value)}
          className="text-lg font-bold outline-none"
          autoFocus
          disabled={!editable}
        />

        {/* Edit Mode */}
        <ToolbarButton
          onClick={() => {
            const next = !editable;
            setEditable(next);
            editor.setEditable(next);
          }}
        >
          {editable ? <Pencil size={18} /> : <PencilOff size={18} />}
        </ToolbarButton>

        {/* Save */}
        <ToolbarButton onClick={handleSubmit}>
          <Save size={18} />
        </ToolbarButton>

        <div className="mx-2 h-6 w-px bg-zinc-300" />

        {/* Formatting */}
        <ToolbarButton
          disabled={!editable}
          active={editor.isActive("bold")}
          onClick={() => editor.chain().focus().toggleBold().run()}
        >
          <Bold size={18} />
        </ToolbarButton>

        <ToolbarButton
          disabled={!editable}
          active={editor.isActive("italic")}
          onClick={() => editor.chain().focus().toggleItalic().run()}
        >
          <Italic size={18} />
        </ToolbarButton>

        <ToolbarButton
          disabled={!editable}
          active={editor.isActive("underline")}
          onClick={() => editor.chain().focus().toggleUnderline().run()}
        >
          <UnderlineIcon size={18} />
        </ToolbarButton>

        <ToolbarButton
          disabled={!editable}
          active={editor.isActive("strike")}
          onClick={() => editor.chain().focus().toggleStrike().run()}
        >
          <Strikethrough size={18} />
        </ToolbarButton>

        <ToolbarButton
          disabled={!editable}
          active={editor.isActive("highlight")}
          onClick={() => editor.chain().focus().toggleHighlight().run()}
        >
          <Highlighter size={18} />
        </ToolbarButton>

        <div className="mx-2 h-6 w-px bg-zinc-300" />

        {/* Headings */}
        <ToolbarButton
          disabled={!editable}
          active={editor.isActive("heading", { level: 1 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
        >
          <Heading1 size={18} />
        </ToolbarButton>

        <ToolbarButton
          disabled={!editable}
          active={editor.isActive("heading", { level: 2 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
        >
          <Heading2 size={18} />
        </ToolbarButton>

        <ToolbarButton
          disabled={!editable}
          active={editor.isActive("heading", { level: 3 })}
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
        >
          <Heading3 size={18} />
        </ToolbarButton>

        <div className="mx-2 h-6 w-px bg-zinc-300" />

        {/* Lists */}
        <ToolbarButton
          disabled={!editable}
          active={editor.isActive("bulletList")}
          onClick={() => editor.chain().focus().toggleBulletList().run()}
        >
          <List size={18} />
        </ToolbarButton>

        <ToolbarButton
          disabled={!editable}
          active={editor.isActive("orderedList")}
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
        >
          <ListOrdered size={18} />
        </ToolbarButton>

        <ToolbarButton
          disabled={!editable}
          active={editor.isActive("taskList")}
          onClick={() => editor.chain().focus().toggleTaskList().run()}
        >
          <CheckSquare size={18} />
        </ToolbarButton>

        <div className="mx-2 h-6 w-px bg-zinc-300" />

        {/* Blocks */}
        <ToolbarButton
          disabled={!editable}
          active={editor.isActive("blockquote")}
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
        >
          <Quote size={18} />
        </ToolbarButton>

        <ToolbarButton
          disabled={!editable}
          active={editor.isActive("codeBlock")}
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
        >
          <Code2 size={18} />
        </ToolbarButton>

        <ToolbarButton
          disabled={!editable}
          onClick={() => editor.chain().focus().setHorizontalRule().run()}
        >
          <Minus size={18} />
        </ToolbarButton>

        <div className="mx-2 h-6 w-px bg-zinc-300" />

        {/* Link */}
        <ToolbarButton
          disabled={!editable}
          active={editor.isActive("link")}
          onClick={() => {
            const url = window.prompt("Enter URL");
            if (!url) return;

            editor
              .chain()
              .focus()
              .extendMarkRange("link")
              .setLink({ href: url })
              .run();
          }}
        >
          <Link2 size={18} />
        </ToolbarButton>

        {/* Image */}
        <ToolbarButton
          disabled={!editable}
          onClick={() => imageInputRef.current?.click()}
        >
          <ImageIcon size={18} />
        </ToolbarButton>

        <div className="mx-2 h-6 w-px bg-zinc-300" />

        {/* Alignment */}
        <ToolbarButton
          disabled={!editable}
          active={editor.isActive({ textAlign: "left" })}
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
        >
          <AlignLeft size={18} />
        </ToolbarButton>

        <ToolbarButton
          disabled={!editable}
          active={editor.isActive({ textAlign: "center" })}
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
        >
          <AlignCenter size={18} />
        </ToolbarButton>

        <ToolbarButton
          disabled={!editable}
          active={editor.isActive({ textAlign: "right" })}
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
        >
          <AlignRight size={18} />
        </ToolbarButton>

        <ToolbarButton
          disabled={!editable}
          active={editor.isActive({ textAlign: "justify" })}
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
        >
          <AlignJustify size={18} />
        </ToolbarButton>

        <div className="mx-2 h-6 w-px bg-zinc-300" />

        {/* History */}
        <ToolbarButton onClick={() => editor.chain().focus().undo().run()}>
          <Undo2 size={18} />
        </ToolbarButton>

        <ToolbarButton onClick={() => editor.chain().focus().redo().run()}>
          <Redo2 size={18} />
        </ToolbarButton>

        <ToolbarButton
          disabled={!editable}
          onClick={() =>
            editor.chain().focus().unsetAllMarks().clearNodes().run()
          }
        >
          <Eraser size={18} />
        </ToolbarButton>
      </div>

      {/* Editor */}

      <div className="flex-1 overflow-auto">
        <div className="max-w-5xl mx-auto">
          <EditorContent
            editor={editor}
            className="
              px-8 py-4
              focus:outline-none
            "
          />
        </div>
      </div>
      <CreateFab title={"save"} onClick={() => handleSubmit()} />
    </div>
  );
}
