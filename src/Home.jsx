import React, { useEffect, useState } from "react";
import readNote from "./services/notebook/readNote.services";
import { Search, FileText, Plus } from "lucide-react";

export default function Home() {
  const [notes, setNotes] = useState([]);
  const [search, setSearch] = useState("");

  const getAllNotes = async () => {
    try {
      const data = await readNote();
      setNotes(data || []);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllNotes();
  }, []);

  const filteredNotes = notes.filter((note) =>
    note.title?.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className="h-screen bg-zinc-100 flex">
      {/* Sidebar */}
      <aside className="w-96 bg-white border-r border-zinc-200 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-zinc-200">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold">Notebook</h1>

            <button
              className="
                h-10 w-10
                rounded-lg
                bg-blue-500
                text-white
                flex items-center justify-center
                hover:bg-blue-600
              "
            >
              <Plus size={18} />
            </button>
          </div>

          <p className="text-sm text-zinc-500 mt-1">{notes.length} Notes</p>
        </div>

        {/* Search */}
        <div className="p-4">
          <div className="relative">
            <Search
              size={18}
              className="
                absolute
                left-3
                top-1/2
                -translate-y-1/2
                text-zinc-400
              "
            />

            <input
              type="text"
              placeholder="Search notes..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="
                w-full
                pl-10
                pr-4
                py-2
                rounded-lg
                border
                border-zinc-300
                outline-none
              "
            />
          </div>
        </div>

        {/* Notes List */}
        <div className="flex-1 overflow-y-auto">
          {filteredNotes.length === 0 ? (
            <div className="p-8 text-center text-zinc-500">No notes found</div>
          ) : (
            filteredNotes.map((note) => (
              <button
                key={note.id}
                className="
                  w-full
                  text-left
                  p-4
                  border-b
                  border-zinc-100
                  hover:bg-zinc-50
                "
              >
                <h3 className="font-semibold truncate">{note.title}</h3>

                <p className="text-sm text-zinc-500 mt-1 line-clamp-2">
                  {note.content}
                </p>
              </button>
            ))
          )}
        </div>
      </aside>

      {/* Preview Area */}
      <main className="flex-1 flex items-center justify-center">
        <div className="text-center">
          <FileText size={80} className="mx-auto text-zinc-300" />

          <h2 className="mt-4 text-2xl font-semibold">Select a Note</h2>

          <p className="mt-2 text-zinc-500">
            Choose a note from the sidebar to view it.
          </p>
        </div>
      </main>
    </div>
  );
}
