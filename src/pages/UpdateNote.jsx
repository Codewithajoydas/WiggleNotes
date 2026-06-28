import { useEffect, useRef, useState } from "react";
import { EditorContent } from "@tiptap/react";
import { useNavigate, useParams } from "react-router-dom";

import CreateFab from "../components/createFab";
import Alert from "../components/ui/alert";
import Toolbar from "../components/Toolbar";
import useTiptapEditor from "../hook/useEditor";
import useNotebookCRUD from "../hook/useNotebookCRUD";
import useNoteImage from "../hook/useNoteImage";
import getNoteById from "../services/notebook/getNoteById.services";

export default function EditNote() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [editable, setEditable] = useState(true);
  const [alert, setAlert] = useState(null);
  const [title, setTitle] = useState("Untitled Note");
  const [cover, setCover] = useState(null);
  const [showCoverPanel, setShowCoverPanel] = useState(false);
  const [saved, setSaved] = useState(false);

  const coverImageInputRef = useRef(null);
  const imageInputRef = useRef(null);

  const editor = useTiptapEditor();

  // noteId is already known from the URL param
  const { save } = useNotebookCRUD({
    editor,
    noteId: id,
    title,
    cover,
    setNoteId: () => {}, // no-op, id already exists
    setSaved,
    setAlert,
  });

  const { handleImageUpload } = useNoteImage({ editor });

  // ─── Load note ──────────────────────────────────────────────────────────────
  useEffect(() => {
    if (!editor) return;

    const loadNote = async () => {
      const note = await getNoteById(id);
      if (!note || note.is_deleted) {
        navigate("/");
        return;
      }
      setTitle(note.title);
      if (note.cover_type)
        setCover({ type: note.cover_type, value: note.cover_value });
      editor.commands.setContent(JSON.parse(note.content));
    };

    loadNote();
  }, [id, editor, navigate]);

  // ─── Refresh on note-updated event ──────────────────────────────────────────
  useEffect(() => {
    if (!editor) return;

    const refresh = async () => {
      const note = await getNoteById(id);
      if (!note || note.is_deleted) {
        navigate("/");
        return;
      }
      setTitle(note.title);
      if (note.cover_type)
        setCover({ type: note.cover_type, value: note.cover_value });
      editor.commands.setContent(JSON.parse(note.content));
    };

    window.addEventListener("note-updated", refresh);
    return () => window.removeEventListener("note-updated", refresh);
  }, [id, editor, navigate]);

  useEffect(() => {
    (async () => {
      await checkSaved(saved);
    })();
  }, [saved]);

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
    <div className="h-screen flex flex-col bg-zinc-950 text-zinc-100 overflow-hidden">
      <Toolbar
        cover={cover}
        title={title}
        setTitle={setTitle}
        editable={editable}
        editor={editor}
        setCover={setCover}
        coverImageInputRef={coverImageInputRef}
        setEditable={setEditable}
        showCoverPanel={showCoverPanel}
        setShowCoverPanel={setShowCoverPanel}
        imageInputRef={imageInputRef}
        noteId={id}
        setNoteId={() => {}}
        setSaved={setSaved}
        setAlert={setAlert}
      />

      <div className="editor overflow-y-auto overflow-x-hidden flex-1">
        {cover && (
          <div className="w-full h-50 shrink-0 relative" style={coverStyle}>
            <input
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="absolute bottom-12.5 left-55 bg-transparent z-1 text-[40px] outline-0 font-bold flex-1 w-full"
            />
            <div className="absolute inset-x-0 bottom-0 h-12 bg-linear-to-t from-zinc-950 to-transparent" />
          </div>
        )}

        <div className="flex-1">
          <div className="max-w-3xl mx-auto">
            <EditorContent
              editor={editor}
              spellCheck
              className="px-8 py-6 focus:outline-none"
            />
          </div>
        </div>
      </div>

      <input
        ref={imageInputRef}
        type="file"
        accept="image/*"
        className="hidden"
        onChange={handleImageUpload}
      />

      <CreateFab title="save" onClick={save} />

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
