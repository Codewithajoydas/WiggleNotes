import {
  useState,
  useRef,
  useEffect,
  useCallback,
  useContext,
  useMemo,
} from "react";
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
  Check,
} from "lucide-react";
import Header from "../components/Header";
import getSettings from "../services/settings/getSettings.services";
import updateSettings from "../services/settings/updateSettings.services";
import { SettingsContext } from "../store/Settings.context";
import { getThemeColors } from "../constants/Theme";
import restoreAllNotes from "../services/notebook/restoreAllNotes.services";
import deleteAllNotes from "../services/notebook/deleteAllNotes.services";

// ─── Dropdown Row ─────────────────────────────────────────────────────────────
function DropdownRow({ icon: Icon, title, value, options, onChange, colors }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handleClick = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors group"
        style={{ color: colors.textPrimary }}
        onMouseEnter={(e) =>
          (e.currentTarget.style.backgroundColor = colors.bgHover)
        }
        onMouseLeave={(e) =>
          (e.currentTarget.style.backgroundColor = "transparent")
        }
      >
        <div className="flex items-center gap-3">
          <Icon size={15} style={{ color: colors.textSubtle }} />
          <span className="text-sm" style={{ color: colors.textMuted }}>
            {title}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span
            className="text-xs px-2 py-1 rounded-md capitalize"
            style={{
              color: colors.textSubtle,
              backgroundColor: colors.bgHover,
            }}
          >
            {value}
          </span>
          <ChevronRight
            size={14}
            style={{ color: colors?.textSubtle }}
            className={`transition-transform duration-200 ${open ? "rotate-90" : ""}`}
          />
        </div>
      </button>

      {open && (
        <div
          className="absolute right-2 top-full mt-1 z-50 rounded-xl shadow-2xl overflow-hidden min-w-36"
          style={{
            backgroundColor: colors?.bgSecondary,
            border: `1px solid ${colors?.border}`,
            boxShadow: "0 20px 40px rgba(0,0,0,0.6)",
          }}
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              onClick={() => {
                onChange(opt.value);
                setOpen(false);
              }}
              className="w-full flex items-center justify-between px-3 py-2 text-sm transition-colors"
              style={{ color: colors?.textMuted }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = colors?.bgHover;
                e.currentTarget.style.color = colors?.textPrimary;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = "transparent";
                e.currentTarget.style.color = colors?.textMuted;
              }}
            >
              {opt.label}
              {opt.value === value && (
                <Check size={13} style={{ color: colors?.accent }} />
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ─── Toggle Row ───────────────────────────────────────────────────────────────
function ToggleRow({ icon: Icon, title, enabled, onChange, colors }) {
  return (
    <button
      onClick={() => onChange(!enabled)}
      className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors group"
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor = colors.bgHover)
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = "transparent")
      }
    >
      <div className="flex items-center gap-3">
        <Icon size={15} style={{ color: colors?.textSubtle }} />
        <span className="text-sm" style={{ color: colors?.textMuted }}>
          {title}
        </span>
      </div>
      <div
        className="relative w-9 h-5 rounded-full transition-colors duration-200"
        style={{ backgroundColor: enabled ? colors?.accent : colors?.bgHover }}
      >
        <div
          className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow-sm transition-transform duration-200 ${
            enabled ? "translate-x-4" : "translate-x-0.5"
          }`}
        />
      </div>
    </button>
  );
}

// ─── Action Row ───────────────────────────────────────────────────────────────
function ActionRow({ icon: Icon, title, value, onClick, danger, colors }) {
  return (
    <button
      onClick={onClick}
      className="w-full flex items-center justify-between px-3 py-2.5 rounded-lg transition-colors group"
      onMouseEnter={(e) =>
        (e.currentTarget.style.backgroundColor = danger
          ? "rgba(239,68,68,0.08)"
          : colors.bgHover)
      }
      onMouseLeave={(e) =>
        (e.currentTarget.style.backgroundColor = "transparent")
      }
    >
      <div className="flex items-center gap-3">
        <Icon
          size={15}
          style={{ color: danger ? "#ef4444" : colors.textSubtle }}
        />
        <span
          className="text-sm"
          style={{ color: danger ? "#f87171" : colors.textMuted }}
        >
          {title}
        </span>
      </div>
      <div className="flex items-center gap-2">
        {value && (
          <span
            className="text-xs px-2 py-1 rounded-md"
            style={{
              color: colors.textSubtle,
              backgroundColor: colors.bgHover,
            }}
          >
            {value}
          </span>
        )}
        <ChevronRight size={14} style={{ color: colors.textSubtle }} />
      </div>
    </button>
  );
}

// ─── Section ──────────────────────────────────────────────────────────────────
function Section({ label, children, colors }) {
  return (
    <div className="mb-6">
      <p
        className="text-[10px] font-semibold tracking-widest uppercase px-3 mb-1.5"
        style={{ color: colors.textSubtle }}
      >
        {label}
      </p>
      <div
        className="rounded-xl px-1 py-1 space-y-0.5"
        style={{
          backgroundColor: colors.bgSecondary,
          border: `1px solid ${colors.border}`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

// ─── Main ─────────────────────────────────────────────────────────────────────
export default function Settings() {
  const { settings, setSettings } = useContext(SettingsContext);
  const version = useMemo(() => window.dbAPI.getAppVersion(), []);
  const COLORS = useMemo(
    () => getThemeColors(settings.theme, settings.accent_color),
    [settings.theme, settings.accent_color],
  );

  const update = useCallback(
    async (key, value) => {
      const updated = { ...settings, [key]: value };
      setSettings(updated);
      await updateSettings(updated);
    },
    [settings],
  );
  const restoreNotes = async () => {
    await restoreAllNotes();
    window.dispatchEvent(new CustomEvent("note-updated"));
  };

  const dltNotes = async () => {
    const firstConfirm = window.confirm(
      "Are you sure you want to delete all trashed notes?",
    );
    if (!firstConfirm) return;

    const secondConfirm = window.confirm(
      "This cannot be undone. Delete all notes?",
    );
    if (!secondConfirm) return;

    await deleteAllNotes();
    window.dispatchEvent(new CustomEvent("note-updated"));
  };
  return (
    <div
      className="h-full overflow-y-auto [&::-webkit-scrollbar]:hidden"
      style={{ backgroundColor: COLORS.bgPrimary, color: COLORS.textPrimary }}
    >
      <Header title="Settings" />

      <div className="max-w-xl mx-auto px-6 py-6">
        <Section label="Appearance" colors={COLORS}>
          <DropdownRow
            icon={Palette}
            title="Theme"
            value={settings.theme}
            options={[
              { label: "Dark", value: "dark" },
              { label: "Light", value: "light" },
              { label: "System", value: "system" },
            ]}
            onChange={(v) => update("theme", v)}
            colors={COLORS}
          />
          <DropdownRow
            icon={Palette}
            title="Accent Color"
            value={settings.accent_color}
            options={[
              { label: "Blue", value: "blue" },
              { label: "Purple", value: "purple" },
              { label: "Green", value: "green" },
              { label: "Orange", value: "orange" },
              { label: "Pink", value: "pink" },
            ]}
            onChange={(v) => update("accent_color", v)}
            colors={COLORS}
          />
          <DropdownRow
            icon={Type}
            title="Font Size"
            value={settings.font_size}
            options={[
              { label: "Small", value: "small" },
              { label: "Medium", value: "medium" },
              { label: "Large", value: "large" },
            ]}
            onChange={(v) => update("font_size", v)}
            colors={COLORS}
          />
        </Section>

        <Section label="Editor" colors={COLORS}>
          <ToggleRow
            icon={FileText}
            title="Auto Save"
            enabled={settings.auto_save}
            onChange={(v) => update("auto_save", v)}
            colors={COLORS}
          />
          <ToggleRow
            icon={FileText}
            title="Spell Check"
            enabled={settings.spell_check}
            onChange={(v) => update("spell_check", v)}
            colors={COLORS}
          />
          <ToggleRow
            icon={FileText}
            title="Word Wrap"
            enabled={settings.word_wrap}
            onChange={(v) => update("word_wrap", v)}
            colors={COLORS}
          />
        </Section>

        <Section label="Notes" colors={COLORS}>
          <DropdownRow
            icon={FileText}
            title="Default View"
            value={settings.default_view}
            options={[
              { label: "List", value: "list" },
              { label: "Grid", value: "grid" },
              { label: "Compact", value: "compact" },
            ]}
            onChange={(v) => update("default_view", v)}
            colors={COLORS}
          />
          <ActionRow
            icon={Trash2}
            title="Restore Deleted Notes"
            onClick={() => {
              restoreNotes();
            }}
            colors={COLORS}
          />
          <ActionRow
            icon={Trash2}
            title="Empty Trash"
            onClick={() => {
              dltNotes();
            }}
            danger
            colors={COLORS}
          />
        </Section>

        {/* <Section label="Data" colors={COLORS}>
          <ActionRow
            icon={Upload}
            title="Import Notes"
            onClick={() => {}}
            colors={COLORS}
          />
          <ActionRow
            icon={Download}
            title="Export Notes"
            onClick={() => {}}
            colors={COLORS}
          />
          <ActionRow
            icon={Shield}
            title="Backup Folder"
            onClick={() => {}}
            colors={COLORS}
          />
        </Section> */}

        <Section label="About" colors={COLORS}>
          <ActionRow
            icon={Info}
            title="Version"
            value={version}
            onClick={() => {}}
            colors={COLORS}
          />
        </Section>

        <p
          className="text-center text-xs mt-4"
          style={{ color: COLORS.textSecondary }}
        >
          Built with Electron · React · TipTap · SQLite
        </p>
      </div>
    </div>
  );
}
