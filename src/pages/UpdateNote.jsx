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
  PencilOff,
  Pencil,
  Save,
  ArrowLeft,
  Palette,
  X,
  Upload,
  Sun,
  Layers,
} from "lucide-react";

import CreateFab from "../components/createFab";
import getNoteById from "../services/notebook/getNoteById.services";
import updateNote from "../services/notebook/updateNote.services";
import { useNavigate, useParams } from "react-router-dom";
import Alert from "../components/ui/alert";

// ─── Cover presets (shared system) ───────────────────────────────────────────
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

// ─── Cover panel ──────────────────────────────────────────────────────────────
function CoverPanel({ cover, onChange, onClose, imageInputRef }) {
  const [tab, setTab] = useState("gradient");
  return (
    <div className="absolute top-14 right-4 z-50 w-80 rounded-2xl bg-zinc-900 border border-white/[0.08] shadow-2xl shadow-black/60 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-3 border-b border-white/[0.06]">
        <span className="text-sm font-semibold text-zinc-100">Cover</span>
        <button
          onClick={onClose}
          className="text-zinc-500 hover:text-zinc-300 transition-colors"
        >
          <X size={15} />
        </button>
      </div>
      <div className="flex border-b border-white/[0.06]">
        {[
          { id: "gradient", icon: <Layers size={12} />, label: "Gradient" },
          { id: "solid", icon: <Sun size={12} />, label: "Solid" },
          { id: "image", icon: <ImageIcon size={12} />, label: "Image" },
        ].map((t) => (
          <button
            key={t.id}
            onClick={() => setTab(t.id)}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 text-xs font-medium transition-colors ${
              tab === t.id
                ? "text-blue-400 border-b-2 border-blue-500"
                : "text-zinc-600 hover:text-zinc-300"
            }`}
          >
            {t.icon}
            {t.label}
          </button>
        ))}
      </div>
      <div className="p-4">
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
              >
                <span className="absolute inset-x-0 bottom-0 pb-1 text-[10px] text-white/60 text-center font-medium">
                  {g.label}
                </span>
              </button>
            ))}
          </div>
        )}
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
            <label
              className="h-12 rounded-xl ring-2 ring-transparent hover:ring-zinc-600 flex items-center justify-center cursor-pointer bg-white/[0.05] transition-all"
              title="Custom"
            >
              <Palette size={15} className="text-zinc-500" />
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
        {tab === "image" && (
          <div className="space-y-3">
            {cover?.type === "image" && (
              <div
                className="h-24 rounded-xl bg-cover bg-center ring-1 ring-white/[0.08]"
                style={{ backgroundImage: `url(${cover.value})` }}
              />
            )}
            <button
              onClick={() => imageInputRef.current?.click()}
              className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-white/[0.05] hover:bg-white/[0.08] text-zinc-300 text-sm font-medium transition-colors border border-white/[0.06]"
            >
              <Upload size={14} /> Upload image
            </button>
            <p className="text-[11px] text-zinc-700 text-center">
              Recommended: 1500 × 400px
            </p>
          </div>
        )}
      </div>
      {cover && (
        <div className="px-4 pb-4">
          <button
            onClick={() => onChange(null)}
            className="w-full py-2 rounded-xl text-xs text-zinc-600 hover:text-red-400 hover:bg-white/[0.04] transition-colors border border-white/[0.05]"
          >
            Remove cover
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Toolbar button ───────────────────────────────────────────────────────────
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
              : "text-zinc-500 hover:bg-white/[0.06] hover:text-zinc-200"
        }
      `}
    >
      {children}
      {label && (
        <span
          className={`text-[9px] leading-none font-medium tracking-wide uppercase ${
            active ? "text-blue-400" : "text-zinc-700 group-hover:text-zinc-500"
          }`}
        >
          {label}
        </span>
      )}
    </button>
  );
}

function Divider() {
  return <div className="mx-1 h-7 w-px bg-white/[0.06] shrink-0" />;
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function EditNote() {
  const navigate = useNavigate();
  const { id } = useParams();
  const imageInputRef = useRef(null);
  const coverImageInputRef = useRef(null);
  const [editable, setEditable] = useState(true);
  const [title, setTitle] = useState("Untitled Note");
  const [cover, setCover] = useState(null);
  const [showCoverPanel, setShowCoverPanel] = useState(false);
  const [alert, setAlert] = useState(null);

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
          node.type.name === "heading" ? "Untitled Note" : "Start writing…",
      }),
    ],
    content: "",
  });

  // Load note
  useEffect(() => {
    async function loadNote() {
      const note = await getNoteById(id);
      if (!note || note.is_deleted) {
        navigate("/");
        return;
      }
      setTitle(note.title);
      if (note.cover_type)
        setCover({
          type: note.cover_type,
          value: note.cover_value,
        });
      editor?.commands.setContent(JSON.parse(note.content));
    }
    if (editor) loadNote();
  }, [id, editor, navigate]);

  useEffect(() => {
    const refresh = async () => {
      const note = await getNoteById(id);
      if (!note || note.is_deleted) {
        navigate("/");
        return;
      }
      setTitle(note.title);
      if (note.cover_type)
        setCover({
          type: note?.cover_type,
          value: note?.cover_value,
        });
      editor?.commands.setContent(JSON.parse(note.content));
    };
    window.addEventListener("note-updated", refresh);
    return () => window.removeEventListener("note-updated", refresh);
  }, [id, editor, navigate]);

  // Image uploads
  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file || !editor) return;
    editor
      .chain()
      .focus()
      .setImage({ src: URL.createObjectURL(file) })
      .run();
    e.target.value = "";
  };
  const handleCoverImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setCover({ type: "image", value: URL.createObjectURL(file) });
    e.target.value = "";
  };

  // Save
  const handleSubmit = useCallback(async () => {
    if (!editor) return;
    try {
      await updateNote({
        id,
        title: title.trim() || "Untitled Note",
        content: JSON.stringify(editor.getJSON()),
        cover_type: cover?.type,
        cover_value: cover?.value,
      });
      setAlert({ type: "success", title: "Saved", message: "Note updated." });
      window.dispatchEvent(new CustomEvent("note-updated"));
    } catch (err) {
      console.error(err);
      setAlert({
        type: "error",
        title: "Error",
        message: "Failed to save changes.",
      });
    }
  }, [editor, id, title, cover]);

  useEffect(() => {
    const onKey = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        handleSubmit();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleSubmit]);

  if (!editor) return null;

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
    <div className="h-screen flex flex-col bg-zinc-950 text-zinc-100">
      {/* ── Toolbar ── */}
      <div className="sticky top-0 z-50 bg-zinc-950 backdrop-blur-xl border-b border-white/[0.06]">
        {/* Top row */}
        <div className="flex items-center gap-2 px-4 pt-3 pb-1">
          {/* Back */}
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

          {/* Title */}
          <input
            type="text"
            value={title}
            placeholder="Untitled Note"
            onChange={(e) => setTitle(e.target.value)}
            disabled={!editable}
            autoFocus
            className="flex-1 min-w-0 text-sm font-semibold bg-transparent text-zinc-100 placeholder:text-zinc-600 outline-none disabled:opacity-60"
          />

          {/* Meta actions */}
          <div className="flex items-center gap-0.5 shrink-0 pr-[150px]">
            {/* Cover */}
            <div className="relative">
              <ToolbarButton
                label="Cover"
                active={showCoverPanel}
                onClick={() => setShowCoverPanel((v) => !v)}
              >
                <Palette size={15} />
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

            {/* Lock */}
            <ToolbarButton
              label={editable ? "Lock" : "Edit"}
              onClick={() => {
                const next = !editable;
                setEditable(next);
                editor.setEditable(next);
              }}
            >
              {editable ? <Pencil size={15} /> : <PencilOff size={15} />}
            </ToolbarButton>

            {/* Save */}
            <ToolbarButton label="Save" onClick={handleSubmit}>
              <Save size={15} />
            </ToolbarButton>
          </div>
        </div>

        {/* Bottom row: formatting */}
        <div className="flex items-center gap-0.5 px-3 pb-2 overflow-x-auto [&::-webkit-scrollbar]:hidden">
          <ToolbarButton
            label="Undo"
            onClick={() => editor.chain().focus().undo().run()}
          >
            <Undo2 size={14} />
          </ToolbarButton>
          <ToolbarButton
            label="Redo"
            onClick={() => editor.chain().focus().redo().run()}
          >
            <Redo2 size={14} />
          </ToolbarButton>
          <ToolbarButton
            label="Clear"
            disabled={!editable}
            onClick={() =>
              editor.chain().focus().unsetAllMarks().clearNodes().run()
            }
          >
            <Eraser size={14} />
          </ToolbarButton>

          <Divider />

          <ToolbarButton
            label="Bold"
            disabled={!editable}
            active={editor.isActive("bold")}
            onClick={() => editor.chain().focus().toggleBold().run()}
          >
            <Bold size={14} />
          </ToolbarButton>
          <ToolbarButton
            label="Italic"
            disabled={!editable}
            active={editor.isActive("italic")}
            onClick={() => editor.chain().focus().toggleItalic().run()}
          >
            <Italic size={14} />
          </ToolbarButton>
          <ToolbarButton
            label="Under"
            disabled={!editable}
            active={editor.isActive("underline")}
            onClick={() => editor.chain().focus().toggleUnderline().run()}
          >
            <UnderlineIcon size={14} />
          </ToolbarButton>
          <ToolbarButton
            label="Strike"
            disabled={!editable}
            active={editor.isActive("strike")}
            onClick={() => editor.chain().focus().toggleStrike().run()}
          >
            <Strikethrough size={14} />
          </ToolbarButton>
          <ToolbarButton
            label="Mark"
            disabled={!editable}
            active={editor.isActive("highlight")}
            onClick={() => editor.chain().focus().toggleHighlight().run()}
          >
            <Highlighter size={14} />
          </ToolbarButton>

          <Divider />

          <ToolbarButton
            label="H1"
            disabled={!editable}
            active={editor.isActive("heading", { level: 1 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 1 }).run()
            }
          >
            <Heading1 size={14} />
          </ToolbarButton>
          <ToolbarButton
            label="H2"
            disabled={!editable}
            active={editor.isActive("heading", { level: 2 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 2 }).run()
            }
          >
            <Heading2 size={14} />
          </ToolbarButton>
          <ToolbarButton
            label="H3"
            disabled={!editable}
            active={editor.isActive("heading", { level: 3 })}
            onClick={() =>
              editor.chain().focus().toggleHeading({ level: 3 }).run()
            }
          >
            <Heading3 size={14} />
          </ToolbarButton>

          <Divider />

          <ToolbarButton
            label="Bullet"
            disabled={!editable}
            active={editor.isActive("bulletList")}
            onClick={() => editor.chain().focus().toggleBulletList().run()}
          >
            <List size={14} />
          </ToolbarButton>
          <ToolbarButton
            label="Order"
            disabled={!editable}
            active={editor.isActive("orderedList")}
            onClick={() => editor.chain().focus().toggleOrderedList().run()}
          >
            <ListOrdered size={14} />
          </ToolbarButton>
          <ToolbarButton
            label="Tasks"
            disabled={!editable}
            active={editor.isActive("taskList")}
            onClick={() => editor.chain().focus().toggleTaskList().run()}
          >
            <CheckSquare size={14} />
          </ToolbarButton>

          <Divider />

          <ToolbarButton
            label="Quote"
            disabled={!editable}
            active={editor.isActive("blockquote")}
            onClick={() => editor.chain().focus().toggleBlockquote().run()}
          >
            <Quote size={14} />
          </ToolbarButton>
          <ToolbarButton
            label="Code"
            disabled={!editable}
            active={editor.isActive("codeBlock")}
            onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          >
            <Code2 size={14} />
          </ToolbarButton>
          <ToolbarButton
            label="Rule"
            disabled={!editable}
            onClick={() => editor.chain().focus().setHorizontalRule().run()}
          >
            <Minus size={14} />
          </ToolbarButton>

          <Divider />

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
            <Link2 size={14} />
          </ToolbarButton>
          <ToolbarButton
            label="Image"
            disabled={!editable}
            onClick={() => imageInputRef.current?.click()}
          >
            <ImageIcon size={14} />
          </ToolbarButton>

          <Divider />

          <ToolbarButton
            label="Left"
            disabled={!editable}
            active={editor.isActive({ textAlign: "left" })}
            onClick={() => editor.chain().focus().setTextAlign("left").run()}
          >
            <AlignLeft size={14} />
          </ToolbarButton>
          <ToolbarButton
            label="Center"
            disabled={!editable}
            active={editor.isActive({ textAlign: "center" })}
            onClick={() => editor.chain().focus().setTextAlign("center").run()}
          >
            <AlignCenter size={14} />
          </ToolbarButton>
          <ToolbarButton
            label="Right"
            disabled={!editable}
            active={editor.isActive({ textAlign: "right" })}
            onClick={() => editor.chain().focus().setTextAlign("right").run()}
          >
            <AlignRight size={14} />
          </ToolbarButton>
          <ToolbarButton
            label="Justify"
            disabled={!editable}
            active={editor.isActive({ textAlign: "justify" })}
            onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          >
            <AlignJustify size={14} />
          </ToolbarButton>
        </div>
      </div>
      <div className="flex-1 overflow-auto">
        {/* ── Cover banner ── */}
        {cover && (
          <div className="w-full h-50 shrink-0 relative" style={coverStyle}>
            {/* Subtle bottom fade into editor bg */}
            <input
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="absolute bottom-12.5 left-55 bg-transparent z-100 text-[40px]  outline-0 font-bold flex-1 w-full"
            />
            <div className="absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-zinc-950 to-transparent" />
          </div>
        )}

        {/* ── Editor ── */}
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

      <CreateFab title="Save" onClick={handleSubmit} />

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
