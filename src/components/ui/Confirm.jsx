import { TriangleAlert } from "lucide-react";

export default function Confirm({
  open,
  title = "Confirm Action",
  message = "Are you sure you want to continue?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  confirmVariant = "danger",
  onConfirm,
  onCancel,
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      <div className="w-[420px] rounded-xl border border-zinc-800 bg-zinc-950 shadow-2xl animate-scale-in">
        <div className="flex items-start gap-4 p-6">
          <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-red-500/15">
            <TriangleAlert className="text-red-400" size={24} />
          </div>

          <div className="flex-1">
            <h2 className="text-lg font-semibold text-white">{title}</h2>

            <p className="mt-2 text-sm leading-relaxed text-zinc-400">
              {message}
            </p>
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-zinc-800 p-5">
          <button
            onClick={onCancel}
            className="rounded-lg border border-zinc-700 bg-zinc-900 px-4 py-2 text-sm text-zinc-300 transition hover:bg-zinc-800"
          >
            {cancelText}
          </button>

          <button
            onClick={() => {
              onConfirm();
              
            }}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition ${
              confirmVariant === "danger"
                ? "bg-red-600 text-white hover:bg-red-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </div>
  );
}
