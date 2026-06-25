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
} from "lucide-react";
import CreateFab from "../components/createFab";
import createNote from "../services/notebook/createNote.services";
import Alert from "../components/ui/alert";

// ─── Cover Presets ────────────────────────────────────────────────────────────
const SOLID_COLORS = [
  { label: "Slate", value: "#1e293b" },
  { label: "Midnight", value: "#0f172a" },
  { label: "Stone", value: "#292524" },
  { label: "Forest", value: "#14532d" },
  { label: "Navy", value: "#1e3a5f" },
  { label: "Plum", value: "#3b1f5e" },
  { label: "Rose", value: "#4c1130" },
  { label: "Rust", value: "#431407" },
];

const GRADIENTS = [
  {
    label: "Dusk",
    value: "linear-gradient(135deg, #0f0c29, #302b63, #24243e)",
  },
  {
    label: "Aurora",
    value: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
  },
  {
    label: "Ember",
    value: "linear-gradient(135deg, #1a0533, #6b21a8, #db2777)",
  },
  {
    label: "Forest",
    value: "linear-gradient(135deg, #134e4a, #065f46, #166534)",
  },
  {
    label: "Sand",
    value: "linear-gradient(135deg, #451a03, #92400e, #d97706)",
  },
  {
    label: "Night",
    value: "linear-gradient(135deg, #020617, #0f172a, #1e1b4b)",
  },
];

// ─── Cover Settings Panel ─────────────────────────────────────────────────────
function CoverPanel({ cover, onChange, onClose, imageInputRef }) {
  const [tab, setTab] = useState("gradient");

  return (
    <div className="absolute top-14 right-4 z-50 w-80 rounded-2xl bg-zinc-900 border border-zinc-800 shadow-2xl shadow-black/60 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-zinc-800">
        <span className="text-sm font-semibold text-zinc-100 tracking-wide">
          Cover Settings
        </span>
        <button
          onClick={onClose}
          className="text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <X size={16} />
        </button>
      </div>

      {/* Tabs */}
      <div className="flex border-b border-zinc-800">
        {[
          { id: "gradient", icon: <Layers size={13} />, label: "Gradient" },
          { id: "solid", icon: <Sun size={13} />, label: "Solid" },
          { id: "image", icon: <ImageIcon size={13} />, label: "Image" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors ${
              tab === t.id
                ? "text-blue-400 border-b-2 border-blue-500"
                : "text-zinc-500 hover:text-zinc-300"
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>

      <div className="p-4">
        {/* Gradient tab */}
        {tab === "gradient" && (
          <div className="grid grid-cols-3 gap-2">
            {GRADIENTS.map((g) => (
              <button
                key={g.label}
                onClick={() => onChange({ type: "gradient", value: g.value })}
                className={`relative h-14 rounded-xl overflow-hidden ring-2 transition-all ${
                  cover?.value === g.value
                    ? "ring-blue-500 scale-95"
                    : "ring-transparent hover:ring-zinc-600"
                }`}
                style={{ background: g.value }}
                title={g.label}
              >
                <span className="absolute inset-x-0 bottom-0 pb-1 text-[10px] text-white/70 text-center font-medium">
                  {g.label}
                </span>
              </button>
            ))}
          </div>
        )}

        {/* Solid tab */}
        {tab === "solid" && (
          <div className="grid grid-cols-4 gap-2">
            {SOLID_COLORS.map((c) => (
              <button
                key={c.label}
                onClick={() => onChange({ type: "solid", value: c.value })}
                className={`h-12 rounded-xl ring-2 transition-all ${
                  cover?.value === c.value
                    ? "ring-blue-500 scale-95"
                    : "ring-transparent hover:ring-zinc-600"
                }`}
                style={{ background: c.value }}
                title={c.label}
              />
            ))}
            {/* Custom color picker */}
            <label
              className="h-12 rounded-xl ring-2 ring-transparent hover:ring-zinc-600 flex items-center justify-center cursor-pointer bg-zinc-800 transition-all"
              title="Custom color"
            >
              <Palette size={16} className="text-zinc-400" />
              <input
                type="color"
                className="sr-only"
                onChange={(e) =>
                  onChange({ type: "solid", value: e.target.value })
                }
              />
            </label>
          </div>
        )}

        {/* Image tab */}
        {tab === "image" && (
          <div className="space-y-3">
            {cover?.type === "image" && (
              <div
                className="h-24 rounded-xl bg-cover bg-center ring-1 ring-zinc-700"
                style={{ backgroundImage: `url(${cover.value})` }}
              />
            )}
            <button
              onClick={() => imageInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-300 text-sm font-medium transition-colors border border-zinc-700"
            >
              <Upload size={15} />
              Upload image
            </button>
            <p className="text-[11px] text-zinc-600 text-center">
              Recommended: 1500 × 400px
            </p>
          </div>
        )}
      </div>

      {/* Remove cover */}
      {cover && (
        <div className="px-4 pb-4">
          <button
            onClick={() => onChange(null)}
            className="w-full py-2 rounded-xl text-xs text-zinc-500 hover:text-red-400 hover:bg-zinc-800 transition-colors border border-zinc-800"
          >
            Remove cover
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Toolbar Button ───────────────────────────────────────────────────────────
function ToolbarButton({
  onClick,
  active = false,
  disabled = false,
  label,
  children,
}) {
  return (
    <button
      type="button"
      disabled={disabled}
      title={label}
      onMouseDown={(e) => {
        e.preventDefault();
        if (!disabled) onClick?.();
      }}
      className={`
        group relative shrink-0 flex flex-col items-center justify-center gap-0.5
        h-11 w-11 rounded-xl transition-all duration-150 select-none
        ${
          disabled
            ? "opacity-30 cursor-not-allowed"
            : active
              ? "bg-blue-500/20 text-blue-400"
              : "text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100"
        }
      `}
    >
      {children}
      {label && (
        <span
          className={`text-[9px] leading-none font-medium tracking-wide uppercase ${
            active ? "text-blue-400" : "text-zinc-600 group-hover:text-zinc-400"
          }`}
        >
          {label}
        </span>
      )}
    </button>
  );
}

// ─── Toolbar Divider ──────────────────────────────────────────────────────────
function Divider() {
  return <div className="mx-1 h-7 w-px bg-zinc-800 shrink-0" />;
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CreateNote() {
  const imageInputRef = useRef(null);
  const coverImageInputRef = useRef(null);
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

  // Cover image upload
  const handleCoverImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const url = URL.createObjectURL(file);
    setCover({ type: "image", value: url });
    e.target.value = "";
  };

  // Editor image upload
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    const url = URL.createObjectURL(file);
    editor.chain().focus().setImage({ src: url }).run();
    e.target.value = "";
  };

  // Save
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
        cover: cover || null,
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
          <input
            type="text"
            value={title}
            placeholder="Untitled Note"
            onChange={(e) => setTitle(e.target.value)}
            disabled={!editable}
            className="flex-1 min-w-0 text-base font-semibold bg-transparent text-zinc-100 placeholder:text-zinc-600 outline-none"
          />
          <div className="flex items-center gap-1 shrink-0">
            {/* Cover settings */}
            <div className="relative">
              <ToolbarButton
                label="Cover"
                active={showCoverPanel}
                onClick={() => setShowCoverPanel((v) => !v)}
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
      {cover && (
        <div className="w-full h-36 shrink-0 relative" style={coverStyle}>
          {/* Subtle bottom fade into editor bg */}
          <div className="absolute inset-x-0 bottom-0 h-12 bg-gradient-to-t from-zinc-950 to-transparent" />
        </div>
      )}

      {/* ── Editor ── */}
      <div className="flex-1 overflow-auto">
        <div className="max-w-3xl mx-auto">
          <EditorContent
            editor={editor}
            spellCheck
            className="px-8 py-6 focus:outline-none"
          />
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
      <input
        ref={coverImageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleCoverImageUpload}
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
