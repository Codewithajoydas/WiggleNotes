import React, { useEffect, useState } from "react";
import { Star, Clock3, FileText, Trash2, RotateCcw, X } from "lucide-react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import getDeleted from "../services/notebook/getDeleted.services";
import restoreNote from "../services/notebook/restireNote.services";
import deletePermanently from "../services/notebook/deleteForever.services";
import Confirm from "../components/ui/Confirm";
import Alert from "../components/ui/alert";
import ContextMenu from "../components/contextMenu";

export default function Trash() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();
  const [alert, setAlert] = useState(null);
  const [open, setOpen] = useState(false);
  const [openNotice, setOpenNotice] = useState(true);
  const [id, setId] = useState(null);
  const [menu, setMenu] = useState({ visible: false, x: 0, y: 0 });
  const [selectedNote, setSelectedNote] = useState(null);

  const showAlert = ({ type, title, message }) => {
    setAlert(null);
    requestAnimationFrame(() => setAlert({ type, title, message }));
  };

  const items = [
    {
      label: "Restore",
      icon: <RotateCcw size={15} />,
      action: () => {
        if (!selectedNote) return;
        restoreData(selectedNote.id);
      },
    },
    { separator: true },
    {
      label: "Delete Forever",
      icon: <Trash2 size={15} />,
      action: () => {
        if (!selectedNote) return;
        setId(selectedNote.id);
        setOpen(true);
      },
      danger: true,
    },
  ];

  const handleContextMenu = (e, note) => {
    e.preventDefault();
    setSelectedNote(note);
    setMenu({ visible: true, x: e.clientX, y: e.clientY });
  };

  useEffect(() => {
    getNotes();
  }, []);

  const getNotes = async () => {
    const data = await getDeleted();
    setNotes(data || []);
  };

  const getPreview = (content) => {
    try {
      const json = typeof content === "string" ? JSON.parse(content) : content;
      const extractText = (node) => {
        if (node.text) return node.text;
        if (node.content) return node.content.map(extractText).join(" ");
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
    if (diff < 3600) return `${Math.floor(diff / 60)}m ago`;
    if (diff < 86400) return `${Math.floor(diff / 3600)}h ago`;
    if (diff < 604800) return `${Math.floor(diff / 86400)}d ago`;
    return updated.toLocaleDateString();
  };

  const restoreData = async (id) => {
    try {
      await restoreNote(id);
      showAlert({
        type: "success",
        title: "Success",
        message: "Note restored successfully",
      });
      window.dispatchEvent(new CustomEvent("note-updated"));
      getNotes();
    } catch (error) {
      showAlert({
        type: "error",
        title: "Error",
        message: "Failed to restore note",
      });
    }
  };

  const deleteData = async (id) => {
    try {
      await deletePermanently(id);
      getNotes();
    } catch (error) {
      console.error("Failed to delete note:", error);
    }
  };

  return (
    <>
      <div className="h-full overflow-y-auto bg-zinc-950 text-zinc-100">
        <Header title="Trash" />
        {notes.length !== 0 && openNotice && (
          <div className="rounded-2xl border border-red-900 bg-red-950/40 p-4 m-6 flex justify-between items-center">
            <div>
              <h3 className="text-red-400 font-semibold text-sm">
                Items in Trash will be permanently deleted after 30 days
              </h3>
              <p className="text-red-300/70 text-xs mt-1">
                Restore notes anytime before automatic removal.
              </p>
          </div>
            <X
              size={20}
              color="#fff"
              className=" cursor-pointer"
              onClick={() => setOpenNotice(false)}
            />
            </div>
        )}
        <div className="max-w-7xl mx-auto p-6">
          {notes.length === 0 ? (
            <div className="h-[70vh] flex items-center justify-center">
              <div className="text-center max-w-md">
                <div className="mx-auto h-28 w-28 rounded-full bg-zinc-900 border border-zinc-800 flex items-center justify-center">
                  <Trash2 size={50} className="text-red-500" />
                </div>
                <h2 className="text-2xl font-bold mt-6">Trash is Empty</h2>
                <p className="text-zinc-400 mt-3">
                  Deleted notes will appear here before permanent removal.
                </p>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
              {notes.map((note) => (
                <div
                  key={note.id}
                  onContextMenu={(e) => handleContextMenu(e, note)}
                  className="group bg-zinc-900 border border-zinc-800 rounded-3xl p-5 cursor-pointer transition-all duration-200 hover:border-blue-500 hover:bg-zinc-800 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className="h-10 w-10 rounded-xl bg-zinc-800 flex items-center justify-center">
                      <FileText size={18} className="text-zinc-400" />
                    </div>
                    <div className="h-8 w-8 rounded-lg bg-red-500/10 border border-red-500/20 flex items-center justify-center">
                      <Trash2 size={14} className="text-red-500" />
                    </div>
                  </div>

                  <h2 className="font-semibold text-sm text-zinc-100 line-clamp-2 mb-3">
                    {note.title || "Untitled Note"}
                  </h2>

                  <p className="text-xs text-zinc-400 leading-relaxed line-clamp-4 min-h-[80px]">
                    {getPreview(note.content)}
                  </p>

                  <div className="mt-5 pt-4 border-t border-zinc-800 flex items-center justify-between">
                    <div className="flex items-center gap-2 text-zinc-500 text-xs">
                      <Clock3 size={13} />
                      <span>{formatDate(note.updated_at)}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          restoreData(note.id);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 text-xs font-medium"
                      >
                        Restore
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setId(note.id);
                          setOpen(true);
                        }}
                        className="px-3 py-1.5 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20 text-xs font-medium"
                      >
                        Delete Forever
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        <Confirm
          open={open}
          title="Delete Note"
          message="This note will be permanently deleted. This action cannot be undone."
          confirmText="Delete"
          cancelText="Keep"
          confirmVariant="danger"
          onCancel={() => setOpen(false)}
          onConfirm={() => {
            deleteData(id);
            setOpen(false);
          }}
        />
        {alert && <Alert {...alert} onClose={() => setAlert(null)} />}
      </div>
      <ContextMenu
        h={100}
        {...menu}
        items={items}
        onClose={() => setMenu((prev) => ({ ...prev, visible: false }))}
      />
    </>
  );
}
