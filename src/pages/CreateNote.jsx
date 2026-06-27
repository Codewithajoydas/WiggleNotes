import { useCallback, useEffect, useRef, useState } from "react";
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
import Placeholder from "@tiptap/extension-placeholder";
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
  Pencil,
  PencilOff,
  Save,
  Palette,
  X,
  Upload,
  Sun,
  Layers,
  ArrowLeft,
} from "lucide-react";
import CreateFab from "../components/createFab";
import createNote from "../services/notebook/createNote.services";
import Alert from "../components/ui/alert";
import { useNavigate } from "react-router-dom";
import { unsplash } from "../api/unsplash";
import { CoverPanel } from "../components/CoverPanel";
import ToolbarButton from "../components/ui/toolbarButton";

// ─── Toolbar Divider ──────────────────────────────────────────────────────────
function Divider() {
  return <div className="mx-1 h-7 w-px bg-zinc-800 shrink-0" />;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CreateNote() {
  const navigate = useNavigate();
  const coverImageInputRef = useRef(null);
  const imageInputRef = useRef(null);
  const [editable, setEditable] = useState(true);
  const [alert, setAlert] = useState(null);
  const [title, setTitle] = useState("Untitled Note");
  const [cover, setCover] = useState(null); // { type: 'solid'|'gradient'|'image', value: string }
  const [showCoverPanel, setShowCoverPanel] = useState(false);

  const editor = useEditor({
    immediatelyRender: false,
    extensions: [
      StarterKit.configure({ heading: { levels: [1, 2, 3] } }),
      Image.configure({ inline: false }),
      Underline,
      Highlight.configure({ multicolor: true }),
      Link.configure({ openOnClick: false, autolink: true, linkOnPaste: true }),
      HorizontalRule,
      TaskList,
      TaskItem.configure({ nested: true }),
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Placeholder.configure({
        placeholder: ({ node }) =>
          node.type.name === "heading"
            ? "Untitled Note"
            : "Start writing your thoughts…",
      }),
    ],
    content: ``,
  });

  // Editor image upload
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    const url = URL.createObjectURL(file);
    editor.chain().focus().setImage({ src: url }).run();
    e.target.value = "";
  };

  const handleSubmit = useCallback(async () => {
    if (!editor) return;
    if (editor.isEmpty) {
      setAlert({
        type: "error",
        title: "Error",
        message: "Note cannot be empty.",
      });
      return;
    }
    try {
      const note = {
        title: title.trim() || "Untitled Note",
        content: JSON.stringify(editor.getJSON()),
        cover_type: cover.type || null,
        cover_value: cover.value || null,
      };
      await createNote(note);
      setAlert({
        type: "success",
        title: "Saved",
        message: "Note saved successfully.",
      });
      editor.commands.clearContent();
      setTitle("Untitled Note");
      setCover(null);
      requestAnimationFrame(() => editor.commands.focus("start"));
      window.dispatchEvent(new CustomEvent("note-updated"));
    } catch (err) {
      console.error("Failed to save note:", err);
      setAlert({
        type: "error",
        title: "Save Failed",
        message: "Unable to save the note.",
      });
    }
  }, [editor, title, cover]);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        handleSubmit();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleSubmit]);

  if (!editor) return null;

  // Cover background style
  const coverStyle = cover
    ? cover.type === "image"
      ? {
          backgroundImage: `url(${cover.value})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }
      : { background: cover.value }
    : null;

  return (
    <div className="h-screen flex flex-col bg-zinc-950 text-zinc-100 overflow-hidden">
      {/* ── Toolbar ── */}
      <div className="sticky top-0 z-50 bg-zinc-950/95 backdrop-blur-xl border-b border-zinc-900">
        {/* Top row: title + meta actions */}
        <div className="flex items-center gap-2 px-4 pt-3 pb-1 pr-[150px]">
          <button
            onClick={() => navigate(-1)}
            className="
                       h-9
                       w-9
                       rounded-xl
                       flex
                       items-center
                       justify-center
                       text-zinc-400
                       hover:bg-zinc-800
                       hover:text-blue-400
                       transition-all
                       duration-200
                     "
          >
            <ArrowLeft size={18} />
          </button>
          <input
            type="text"
            value={title}
            placeholder="Untitled Note"
            onChange={(e) => setTitle(e.target.value)}
            disabled={!editable}
            className="flex-1 min-w-0 text-base font-semibold bg-transparent text-zinc-100 placeholder:text-zinc-600 outline-none w-full "
          />
          <div className="flex items-center gap-1 shrink-0">
            {/* Cover settings */}
            <div className="relative">
              <ToolbarButton
                label="Cover"
                active={showCoverPanel}
                onClick={() => {
                  setShowCoverPanel((v) => !v);
                }}
              >
                <Palette size={16} />
              </ToolbarButton>
              {showCoverPanel && (
                <CoverPanel
                  cover={cover}
                  onChange={(val) => {
                    setCover(val);
                    if (val?.type !== "image") setShowCoverPanel(false);
                  }}
                  onClose={() => setShowCoverPanel(false)}
                  imageInputRef={coverImageInputRef}
                />
              )}
            </div>

            {/* Edit toggle */}
            <ToolbarButton
              label={editable ? "Lock" : "Edit"}
              onClick={() => {
                const next = !editable;
                setEditable(next);
                editor.setEditable(next);
              }}
            >
              {editable ? <Pencil size={16} /> : <PencilOff size={16} />}
            </ToolbarButton>

            {/* Save */}
            <ToolbarButton label="Save" onClick={handleSubmit}>
              <Save size={16} />
            </ToolbarButton>
          </div>
        </div>

        {/* Bottom row: formatting toolbar */}
        <div className="flex items-center gap-0.5 px-3 pb-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          {/* History */}
          <ToolbarButton
            label="Undo"
            onClick={() => editor.chain().focus().undo().run()}
          >
            <Undo2 size={15} />
          </ToolbarButton>
          <ToolbarButton
            label="Redo"
            onClick={() => editor.chain().focus().redo().run()}
          >
            <Redo2 size={15} />
          </ToolbarButton>
          <ToolbarButton
            label="Clear"
            disabled={!editable}
            onClick={() =>
              editor.chain().focus().unsetAllMarks().clearNodes().run()
            }
          >
            <Eraser size={15} />
          </ToolbarButton>

          <Divider />

          {/* Inline formatting */}
          <ToolbarButton
            label="Bold"
            disabled={!editable}
            active={editor.isActive("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold size={15} />
          </ToolbarButton>
          <ToolbarButton
            label="Italic"
            disabled={!editable}
            active={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic size={15} />
          </ToolbarButton>
          <ToolbarButton
            label="Under"
            disabled={!editable}
            active={editor.isActive("underline")}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <UnderlineIcon size={15} />
          </ToolbarButton>
          <ToolbarButton
            label="Strike"
            disabled={!editable}
            active={editor.isActive("strike")}
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <Strikethrough size={15} />
          </ToolbarButton>
          <ToolbarButton
            label="Mark"
            disabled={!editable}
            active={editor.isActive("highlight")}
            onClick={() => editor.chain().focus().toggleHighlight().run()}
          >
            <Highlighter size={15} />
          </ToolbarButton>

          <Divider />

          {/* Headings */}
          <ToolbarButton
            label="H1"
            disabled={!editable}
            active={editor.isActive("heading", { level: 1 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            <Heading1 size={15} />
          </ToolbarButton>
          <ToolbarButton
            label="H2"
            disabled={!editable}
            active={editor.isActive("heading", { level: 2 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            <Heading2 size={15} />
          </ToolbarButton>
          <ToolbarButton
            label="H3"
            disabled={!editable}
            active={editor.isActive("heading", { level: 3 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            <Heading3 size={15} />
          </ToolbarButton>

          <Divider />

          {/* Lists */}
          <ToolbarButton
            label="Bullet"
            disabled={!editable}
            active={editor.isActive("bulletList")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <List size={15} />
          </ToolbarButton>
          <ToolbarButton
            label="Order"
            disabled={!editable}
            active={editor.isActive("orderedList")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered size={15} />
          </ToolbarButton>
          <ToolbarButton
            label="Tasks"
            disabled={!editable}
            active={editor.isActive("taskList")}
            onClick={() => editor.chain().focus().toggleTaskList().run()}
          >
            <CheckSquare size={15} />
          </ToolbarButton>

          <Divider />

          {/* Blocks */}
          <ToolbarButton
            label="Quote"
            disabled={!editable}
            active={editor.isActive("blockquote")}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <Quote size={15} />
          </ToolbarButton>
          <ToolbarButton
            label="Code"
            disabled={!editable}
            active={editor.isActive("codeBlock")}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          >
            <Code2 size={15} />
          </ToolbarButton>
          <ToolbarButton
            label="Rule"
            disabled={!editable}
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <Minus size={15} />
          </ToolbarButton>

          <Divider />

          {/* Link & Image */}
          <ToolbarButton
            label="Link"
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
            <Link2 size={15} />
          </ToolbarButton>
          <ToolbarButton
            label="Image"
            disabled={!editable}
            onClick={() => imageInputRef.current?.click()}
          >
            <ImageIcon size={15} />
          </ToolbarButton>

          <Divider />

          {/* Alignment */}
          <ToolbarButton
            label="Left"
            disabled={!editable}
            active={editor.isActive({ textAlign: "left" })}
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
          >
            <AlignLeft size={15} />
          </ToolbarButton>
          <ToolbarButton
            label="Center"
            disabled={!editable}
            active={editor.isActive({ textAlign: "center" })}
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
          >
            <AlignCenter size={15} />
          </ToolbarButton>
          <ToolbarButton
            label="Right"
            disabled={!editable}
            active={editor.isActive({ textAlign: "right" })}
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
          >
            <AlignRight size={15} />
          </ToolbarButton>
          <ToolbarButton
            label="Justify"
            disabled={!editable}
            active={editor.isActive({ textAlign: "justify" })}
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          >
            <AlignJustify size={15} />
          </ToolbarButton>
        </div>
      </div>

      {/* ── Cover Banner ── */}
      <div className="editor overflow-y-auto overflow-x-hidden flex-1">
        {cover && (
          <div className="w-full h-50 shrink-0 relative" style={coverStyle}>
            {/* Subtle bottom fade into editor bg */}
            <input
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="absolute bottom-12.5 left-55 bg-transparent z-1 text-[40px]  outline-0 font-bold flex-1 w-full"
            />
            <div className="absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-zinc-950 to-transparent" />
          </div>
        )}

        {/* ── Editor ── */}
        <div className="flex-1 ">
          <div className="max-w-3xl mx-auto">
            <EditorContent
              editor={editor}
              spellCheck
              className="px-8 py-6 focus:outline-none"
            />
          </div>
        </div>
      </div>

      {/* Hidden file inputs */}
      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      <CreateFab title="save" onClick={handleSubmit} />

      {alert && (
        <Alert
          type={alert.type}
          title={alert.title}
          message={alert.message}
          onClose={() => setAlert(null)}
        />
      )}
    </div>
  );
}
