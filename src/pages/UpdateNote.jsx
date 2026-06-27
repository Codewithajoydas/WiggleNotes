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
import ToolbarButton from "../components/ui/toolbarButton";
import { CoverPanel } from "../components/CoverPanel";
import checkSaved from "../services/notebook/checkSaved";

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
  const [saved, setSaved] = useState(false);
  const saveTimeout = useRef(null);

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
      setSaved(true);

      setAlert({ type: "success", title: "Saved", message: "Note updated." });
    } catch (err) {
      console.error(err);
      setAlert({
        type: "error",
        title: "Error",
        message: "Failed to save changes.",
      });
    }
  }, [editor, id, title, cover]);

  // Update existing note
  const autoSave = useCallback(async () => {
    if (!editor) return;
    try {
      await updateNote({
        id,
        title: title.trim() || "Untitled Note",
        content: JSON.stringify(editor.getJSON()),
        cover_type: cover?.type,
        cover_value: cover?.value,
      });
      setSaved(true);
      setAlert({
        type: "success",
        title: "Saved",
        message: "Note saved successfully.",
      });
    } catch (err) {
      console.error("Auto Save Failed:", err);
      setAlert({
        type: "error",
        title: "Error",
        message: "Failed to save note.",
      });
    }
  }, [editor, title, cover, id]);

  // Auto save after user stops typing
  useEffect(() => {
    if (!editor) return;

    const save = () => {
      clearTimeout(saveTimeout.current);

      saveTimeout.current = setTimeout(() => {
        autoSave();
      }, 1000);
    };

    editor.on("update", save);

    return () => {
      clearTimeout(saveTimeout.current);
      editor.off("update", save);
    };
  }, [editor, autoSave]);

  // Auto save when title or cover changes
  useEffect(() => {
    if (!editor) return;

    clearTimeout(saveTimeout.current);

    saveTimeout.current = setTimeout(() => {
      autoSave();
    }, 1000);

    return () => clearTimeout(saveTimeout.current);
  }, [title, cover, autoSave]);

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

  useEffect(() => {
    if (!editor) return;
    const handleUpdate = () => {
      setSaved(false);
    };
    editor.on("update", handleUpdate);
    return () => {
      editor.off("update", handleUpdate);
    };
  }, [editor]);

  useEffect(() => {
    if (!editor) return;
    (async () => {
      await checkSaved(saved);
    })();
  }, [editor, saved]);

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
      <div className="flex-1 overflow-y-auto overflow-x-hidden">
        {/* ── Cover banner ── */}
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
