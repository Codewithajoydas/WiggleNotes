import {
  Palette,
  Type,
  FileText,
  Download,
  Upload,
  Trash2,
  ChevronRight,
  Shield,
  Info,
} from "lucide-react";

import Header from "../components/Header";

export default function Settings() {
  const SettingRow = ({ icon: Icon, title, value }) => (
    <button
      className="
        w-full
        flex
        items-center
        justify-between

        px-4
        py-3

        rounded-xl

        hover:bg-zinc-800

        transition-colors
      "
    >
      <div className="flex items-center gap-3">
        <div
          className="
            h-9
            w-9

            rounded-lg

            bg-zinc-800

            flex
            items-center
            justify-center
          "
        >
          <Icon size={18} className="text-zinc-400" />
        </div>

        <span className="text-sm font-medium text-zinc-100">{title}</span>
      </div>

      <div className="flex items-center gap-2">
        {value && <span className="text-sm text-zinc-500">{value}</span>}

        <ChevronRight size={16} className="text-zinc-600" />
      </div>
    </button>
  );

  return (
    <div className="h-full overflow-y-auto bg-zinc-950 text-zinc-100">
      <Header title="Settings" />
      <div className="max-w-4xl mx-auto p-8">
        {/* Appearance */}
        <div className="mb-8">
          <h2 className="text-xs uppercase tracking-widest text-zinc-500 mb-3">
            Appearance
          </h2>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-2">
            <SettingRow icon={Palette} title="Theme" value="Dark" />

            <SettingRow icon={Palette} title="Accent Color" value="Blue" />

            <SettingRow icon={Type} title="Font Size" value="Medium" />
          </div>
        </div>

        {/* Editor */}
        <div className="mb-8">
          <h2 className="text-xs uppercase tracking-widest text-zinc-500 mb-3">
            Editor
          </h2>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-2">
            <SettingRow icon={FileText} title="Auto Save" value="Enabled" />

            <SettingRow icon={FileText} title="Spell Check" value="Enabled" />

            <SettingRow icon={FileText} title="Word Wrap" value="Enabled" />
          </div>
        </div>

        {/* Notes */}
        <div className="mb-8">
          <h2 className="text-xs uppercase tracking-widest text-zinc-500 mb-3">
            Notes
          </h2>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-2">
            <SettingRow icon={FileText} title="Default View" value="Grid" />

            <SettingRow icon={Trash2} title="Restore Deleted Notes" />

            <SettingRow icon={Trash2} title="Empty Trash" />
          </div>
        </div>

        {/* Data */}
        <div className="mb-8">
          <h2 className="text-xs uppercase tracking-widest text-zinc-500 mb-3">
            Data
          </h2>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-2">
            <SettingRow icon={Upload} title="Import Notes" />

            <SettingRow icon={Download} title="Export Notes" />

            <SettingRow icon={Shield} title="Backup Folder" />
          </div>
        </div>

        {/* About */}
        <div>
          <h2 className="text-xs uppercase tracking-widest text-zinc-500 mb-3">
            About
          </h2>

          <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-2">
            <SettingRow icon={Info} title="Version" value="1.0.0" />
          </div>

          <p className="text-center text-zinc-600 text-sm mt-6">
            Built with Electron, React, TipTap & SQLite
          </p>
        </div>
      </div>
    </div>
  );
}
