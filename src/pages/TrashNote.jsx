import React, { useEffect, useState } from "react";
import { Star, Clock3, FileText, Trash2 } from "lucide-react";
import favNote from "../services/notebook/getFavNotes.services";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import getDeleted from "../services/notebook/getDeleted.services";
import restoreNote from "../services/notebook/restireNote.services";
import deletePermanently from "../services/notebook/deleteForever.services";

export default function FavNote() {
  const [notes, setNotes] = useState([]);
  const navigate = useNavigate();

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

        if (node.content) {
          return node.content.map(extractText).join(" ");
        }

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

    if (diff < 3600) {
      return `${Math.floor(diff / 60)}m ago`;
    }

    if (diff < 86400) {
      return `${Math.floor(diff / 3600)}h ago`;
    }

    if (diff < 604800) {
      return `${Math.floor(diff / 86400)}d ago`;
    }

    return updated.toLocaleDateString();
  };

  const restoreData = async (id) => {
    try {
      const result = await restoreNote(id);
      window.dispatchEvent(new CustomEvent("note-updated"));
      console.log("Note restored:", result);
      getNotes();
    } catch (error) {
      console.error("Failed to restore note:", error);
      throw error;
    }
  };

  const deleteData = async (id) => {
    try {
      const confirm = window.confirm("Are you sure you want to delete?");
      if (!confirm) return;

      const result = await deletePermanently(id);
      console.log("Note deleted:", result);
      getNotes();
    } catch (error) {
      console.error("Failed to delete note:", error);
      throw error;
    }
  };
  return (
    <div className="h-full overflow-y-auto bg-zinc-950 text-zinc-100">
      {" "}
      <Header title="Trash" />
      {notes.length !== 0 ? (
        <div className=" rounded-2xl border border-red-900 bg-red-950/40 p-4 m-6">
          <h3 className="text-red-400 font-semibold">
            Items in Trash will be permanently deleted after 30 days
          </h3>

          <p className="text-red-300/70 text-sm mt-1">
            Restore notes anytime before automatic removal.
          </p>
        </div>
      ) : (
        ""
      )}
      <div className="max-w-7xl mx-auto p-6">
        {notes.length === 0 ? (
          <div className="h-[70vh] flex items-center justify-center">
            <div className="text-center max-w-md">
              <div
                className="
              mx-auto
              h-28
              w-28
              rounded-full
              bg-zinc-900
              border
              border-zinc-800
              flex
              items-center
              justify-center
            "
              >
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
                onClick={() => navigate(`/read/note/${note.id}`)}
                className="
              group
              bg-zinc-900
              border
              border-zinc-800
              rounded-3xl
              p-5
              cursor-pointer
              transition-all
              duration-200
              hover:border-blue-500
              hover:bg-zinc-800
              hover:-translate-y-1
              hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]
            "
              >
                <div className="flex items-start justify-between mb-4">
                  <div
                    className="
                  h-10
                  w-10
                  rounded-xl
                  bg-zinc-800
                  flex
                  items-center
                  justify-center
                "
                  >
                    <FileText size={18} className="text-zinc-400" />
                  </div>

                  <div
                    className="
    h-8 w-8
    rounded-lg
    bg-red-500/10
    border
    border-red-500/20
    flex
    items-center
    justify-center
  "
                  >
                    <Trash2 size={14} className="text-red-500" />
                  </div>
                </div>

                <h2
                  className="
                font-semibold
                text-lg
                text-zinc-100
                line-clamp-2
                mb-3
              "
                >
                  {note.title || "Untitled Note"}
                </h2>

                <p
                  className="
                text-sm
                text-zinc-400
                leading-relaxed
                line-clamp-4
                min-h-[80px]
              "
                >
                  {getPreview(note.content)}
                </p>

                <div
                  className="
                mt-5
                pt-4
                border-t
                border-zinc-800
                flex
                items-center
                justify-between
              "
                >
                  <div
                    className="
                  flex
                  items-center
                  gap-2
                  text-zinc-500
                  text-xs
                "
                  >
                    <Clock3 size={13} />
                    <span>{formatDate(note.updated_at)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        restoreData(note.id);
                      }}
                      className="
      px-3
      py-1.5
      rounded-lg
      bg-emerald-500/10
      text-emerald-400
      hover:bg-emerald-500/20
      text-xs
      font-medium
    "
                    >
                      Restore
                    </button>

                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        deleteData(note.id);
                      }}
                      className="
      px-3
      py-1.5
      rounded-lg
      bg-red-500/10
      text-red-400
      hover:bg-red-500/20
      text-xs
      font-medium
    "
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
    </div>
  );
}
