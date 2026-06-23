import React, { useEffect, useState } from "react";
import { Star, Clock3, FileText } from "lucide-react";
import favNote from "../services/notebook/getFavNotes.services";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

export default function FavNote() {
const [notes, setNotes] = useState([]);
const navigate = useNavigate();

useEffect(() => {
getNotes();
}, []);

const getNotes = async () => {
const data = await favNote();
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

return ( <div className="h-full overflow-y-auto bg-zinc-950 text-zinc-100"> <Header title="Favorite Notes" />

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
            <Star
              size={50}
              className="fill-blue-500 text-blue-500"
            />
          </div>

          <h2 className="text-2xl font-bold mt-6 text-zinc-100">
            Nothing Starred Yet
          </h2>

          <p className="text-zinc-400 mt-3 leading-relaxed">
            Important notes that you mark as favorites will
            appear here for quick access.
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
                <FileText
                  size={18}
                  className="text-zinc-400"
                />
              </div>

              <div
                className="
                  h-8
                  w-8
                  rounded-lg
                  bg-blue-500/10
                  border
                  border-blue-500/20
                  flex
                  items-center
                  justify-center
                "
              >
                <Star
                  size={14}
                  className="fill-blue-500 text-blue-500"
                />
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

              <div
                className="
                  text-xs
                  font-medium
                  text-blue-400
                  opacity-0
                  translate-x-2
                  transition-all
                  duration-200
                  group-hover:opacity-100
                  group-hover:translate-x-0
                "
              >
                Open →
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
