import { useCallback, useContext, useEffect, useRef } from "react";
import createNote from "../services/notebook/createNote.services";
import updateNote from "../services/notebook/updateNote.services";
import checkSaved from "../services/notebook/checkSaved";
import { SettingsContext } from "../store/Settings.context";

/**
 * useNotebookCRUD
 *
 * Handles the full note lifecycle:
 *  - First save   → createNote, stores returned id
 *  - Subsequent   → updateNote (autosave on editor change, title/cover change, Ctrl+S)
 *
 * @param {object} params
 * @param {import('@tiptap/react').Editor} params.editor     - Tiptap editor instance
 * @param {string|null}  params.noteId                       - Current note id (null = not yet created)
 * @param {string}       params.title                        - Note title
 * @param {object|null}  params.cover                        - { type, value } or null
 * @param {function}     params.setNoteId
 * @param {function}     params.setSaved
 * @param {function}     params.setAlert
 * @param {number}       [params.debounceMs=1000]            - Autosave debounce delay
 */
export default function useNotebookCRUD({
  editor,
  noteId,
  title,
  cover,
  setNoteId,
  setSaved,
  setAlert,
  debounceMs = 1000,
}) {
  // Keep a stable ref so callbacks always see the latest noteId
  // without needing it in every dependency array
  const noteIdRef = useRef(noteId);
  useEffect(() => {
    noteIdRef.current = noteId;
  }, [noteId]);

  const saveTimeout = useRef(null);

  // ─── settings ───────────────────────────────────────────────────────────────

  const { settings } = useContext(SettingsContext);

  // SQLite stores auto_save as INTEGER (0/1), but depending on IPC serialization
  // it can arrive as a string ("0"/"1"). Boolean("0") === true, so coerce via
  // Number(...) === 1 instead of relying on Boolean() directly.
  const isAutoSaveOn = Number(settings.auto_save) === 1;

  // ─── helpers ────────────────────────────────────────────────────────────────

  const buildPayload = useCallback(
    (id = null) => ({
      ...(id ? { id } : {}),
      title: title.trim() || "Untitled Note",
      content: JSON.stringify(editor.getJSON()),
      cover_type: cover?.type ?? null,
      cover_value: cover?.value ?? null,
    }),
    [editor, title, cover],
  );

  const notify = useCallback(
    (type, title, message) => {
      setAlert({ type, title, message });
    },
    [setAlert],
  );

  // ─── create (first save) ────────────────────────────────────────────────────

  const create = useCallback(async () => {
    if (!editor || noteIdRef.current) return;
    if (editor.isEmpty) {
      notify("error", "Error", "Note is empty.");
      return;
    }
    try {
      const result = await createNote(buildPayload());
      setNoteId(result.id);
      noteIdRef.current = result.id; // keep ref in sync immediately
      setSaved(true);
      notify("success", "Saved", "Note created successfully.");
      window.dispatchEvent(new CustomEvent("note-updated"));
    } catch (err) {
      console.error("Failed to create note:", err);
      notify("error", "Error", "Failed to create note.");
    }
  }, [editor, buildPayload, setNoteId, setSaved, notify]);

  // ─── update (autosave) ──────────────────────────────────────────────────────

  const save = useCallback(async () => {
    const id = noteIdRef.current;
    if (!editor || !id) return;

    try {
      await updateNote(buildPayload(id));
      setSaved(true);
      notify("success", "Saved", "Note saved successfully.");
      window.dispatchEvent(new CustomEvent("note-updated"));
    } catch (err) {
      console.error("Auto save failed:", err);
      notify("error", "Error", "Failed to save note.");
    }
  }, [editor, buildPayload, setSaved, notify]);

  // ─── debounced save ─────────────────────────────────────────────────────────

  const debouncedSave = useCallback(() => {
    clearTimeout(saveTimeout.current);
    saveTimeout.current = setTimeout(save, debounceMs);
  }, [save, debounceMs]);

  // ─── Ctrl + S ───────────────────────────────────────────────────────────────
  // Note: manual save (Ctrl+S) intentionally ignores auto_save — it should
  // always work regardless of the autosave setting.

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "s") {
        e.preventDefault();
        clearTimeout(saveTimeout.current); // flush any pending debounce
        noteIdRef.current ? save() : create();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [save, create]);

  // ─── editor content change → autosave ───────────────────────────────────────

  useEffect(() => {
    if (!editor) return;
    const onUpdate = () => {
      setSaved(false);
      if (noteIdRef.current && isAutoSaveOn) {
        debouncedSave();
      }
    };

    editor.on("update", onUpdate);
    return () => {
      clearTimeout(saveTimeout.current);
      editor.off("update", onUpdate);
    };
  }, [editor, debouncedSave, setSaved]); // isAutoSaveOn removed, checked via ref inside

  // ─── title / cover change → autosave ────────────────────────────────────────

  useEffect(() => {
    if (!noteIdRef.current) return;
    if (!isAutoSaveOn) return;
    debouncedSave();
    return () => clearTimeout(saveTimeout.current);
  }, [title, cover, debouncedSave, isAutoSaveOn]);

  // ─── public API ─────────────────────────────────────────────────────────────

  return { create, save };
}
