import { Plus, Save, Pen } from "lucide-react";

export default function CreateFab({ onClick = () => {}, title = "create" }) {
  const isSave = title.toLocaleLowerCase() === "save";
  const isEdit = title.toLocaleLowerCase() === "edit";

  return (
    <button
      onClick={onClick}
      className="
        fixed
        bottom-6
        right-6
        z-50

        flex
        items-center
        gap-2
        px-4
        h-11

        rounded-xl

        bg-blue-900
        text-zinc-100

        shadow-lg

        hover:bg-blue-800

        transition-all
        duration-200

        cursor-pointer
      "
    >
      {isSave ? (
        <Save size={16} />
      ) : isEdit ? (
        <Pen size={16} />
      ) : (
        <Plus size={16} />
      )}

      <span className="text-sm font-medium">
        {isSave ? "Save Note" : isEdit ? "Edit Note" : "New Note"}
      </span>
    </button>
  );
}
