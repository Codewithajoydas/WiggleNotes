import { ipcMain } from "electron";
import { getDb } from "../db.js";

export function registerSettingsHandlers() {
    const db = getDb();

    /* ── GET ─────────────────────────────────────────────────────────────────── */
    ipcMain.handle("get-settings", () => {
        let settings = db.prepare(`SELECT * FROM settings WHERE id = 1`).get();

        if (!settings) {
            db.prepare(`
        INSERT INTO settings (id, theme, accent_color, font_size, auto_save, spell_check, word_wrap, default_view)
        VALUES (1, 'dark', 'blue', 'medium', 1, 1, 1, 'list')
      `).run();
            settings = db.prepare(`SELECT * FROM settings WHERE id = 1`).get();
        }

        return settings;
    });

    /* ── UPDATE ──────────────────────────────────────────────────────────────── */
    ipcMain.handle("update-settings", (_, settings) => {
        db.prepare(`
      UPDATE settings
      SET
        theme        = ?,
        accent_color = ?,
        font_size    = ?,
        auto_save    = ?,
        spell_check  = ?,
        word_wrap    = ?,
        default_view = ?,
        updated_at   = CURRENT_TIMESTAMP
      WHERE id = 1
    `).run(
            settings.theme,
            settings.accent_color,
            settings.font_size,
            settings.auto_save ? 1 : 0,
            settings.spell_check ? 1 : 0,
            settings.word_wrap ? 1 : 0,
            settings.default_view
        );

        return { success: true };
    });
    ipcMain.handle("get-app-version", async () => {
        const pkg = await import("../../package.json", {
            with: { type: "json" },
        });

        return pkg.default.version;
    });
}