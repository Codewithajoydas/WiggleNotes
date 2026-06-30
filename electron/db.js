import Database from "better-sqlite3";
import { app } from "electron";
import path from "path";

let db;

export function getDb() {
    if (!db) {
        const dbPath = path.join(app.getPath("userData"), "notebook.db");
        db = new Database(dbPath);
        initTables(db);
    }
    return db;
}

function initTables(db) {
    db.prepare(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      title TEXT NOT NULL DEFAULT '',
      content TEXT NOT NULL DEFAULT '',
      is_pinned INTEGER NOT NULL DEFAULT 0,
      is_favorite INTEGER NOT NULL DEFAULT 0,
      is_archived INTEGER NOT NULL DEFAULT 0,
      is_deleted INTEGER NOT NULL DEFAULT 0,
      cover_type TEXT DEFAULT NULL,
      cover_value TEXT DEFAULT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      deleted_at DATETIME DEFAULT NULL
    )
  `).run();

    db.prepare(`
    CREATE TABLE IF NOT EXISTS settings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      theme TEXT NOT NULL DEFAULT 'dark',
      accent_color TEXT NOT NULL DEFAULT 'blue',
      font_size TEXT NOT NULL DEFAULT 'medium',
      auto_save INTEGER NOT NULL DEFAULT 1,
      spell_check INTEGER NOT NULL DEFAULT 1,
      word_wrap INTEGER NOT NULL DEFAULT 1,
      default_view TEXT NOT NULL DEFAULT 'list',
      backup_folder TEXT DEFAULT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
    )
  `).run();
}