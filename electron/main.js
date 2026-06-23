import Database from "better-sqlite3";
import { app, BrowserWindow, ipcMain, Menu } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import process from "process";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let db;

function createWindow() {
    const win = new BrowserWindow({
        width: 1200,
        height: 800,
        icon: path.join(__dirname, "public", "icon.png"),
        titleBarStyle: "hidden",
        titleBarOverlay: {
            color: "#09090b",
            symbolColor: "#f4f4f5",
            height: 63,
        },

        webPreferences: {
            preload: path.join(__dirname, "preload.cjs"),
            contextIsolation: true,
            nodeIntegration: false,
            spellcheck: true,
        },
    });
    win.webContents.openDevTools()

    const dbPath = path.join(app.getPath("userData"), "notebook.db");
    console.log(dbPath);
    db = new Database(dbPath);
    db.prepare(`
    CREATE TABLE IF NOT EXISTS notes (
      id INTEGER PRIMARY KEY AUTOINCREMENT,

      title TEXT NOT NULL DEFAULT '',
      content TEXT NOT NULL DEFAULT '',

      is_pinned INTEGER NOT NULL DEFAULT 0,
      is_favorite INTEGER NOT NULL DEFAULT 0,
      is_archived INTEGER NOT NULL DEFAULT 0,
      is_deleted INTEGER NOT NULL DEFAULT 0,

      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      deleted_at DATETIME DEFAULT NULL
    )
  `).run();

    win.menuBarVisible = false;

    win.webContents.on("context-menu", (event, params) => {
        const menu = Menu.buildFromTemplate([
            ...params.dictionarySuggestions.map((suggestion) => ({
                label: suggestion,
                click: () => {
                    win.webContents.replaceMisspelling(suggestion);
                },
            })),

            ...(params.misspelledWord
                ? [
                    { type: "separator" },
                    {
                        label: "Add to Dictionary",
                        click: () => {
                            win.webContents.session.addWordToSpellCheckerDictionary(
                                params.misspelledWord
                            );
                        },
                    },
                ]
                : []),
        ]);

        menu.popup();
    });

    win.loadURL("http://localhost:5173");

    // win.webContents.openDevTools();
}

app.whenReady().then(createWindow);



/* -------------------------------------------------------------------------- */
/*                                   CREATE                                   */
/* -------------------------------------------------------------------------- */

ipcMain.handle("create-note", (event, note) => {
    const stmt = db.prepare(`
    INSERT INTO notes (title, content)
    VALUES (?, ?)
  `);

    const result = stmt.run(
        note?.title || "Untitled",
        note?.content || ""
    );

    return {
        success: true,
        id: result.lastInsertRowid,
    };
});



/* -------------------------------------------------------------------------- */
/*                                 GET NOTES                                  */
/* -------------------------------------------------------------------------- */

ipcMain.handle("get-notes", () => {
    return db.prepare(`
    SELECT *
    FROM notes
    WHERE is_deleted = 0
      AND is_archived = 0
    ORDER BY
      is_pinned DESC,
      updated_at DESC
  `).all();
});



/* -------------------------------------------------------------------------- */
/*                               GET FAVORITES                                */
/* -------------------------------------------------------------------------- */

ipcMain.handle("get-favorites", () => {
    return db.prepare(`
    SELECT *
    FROM notes
    WHERE
      is_deleted = 0
      AND is_favorite = 1
    ORDER BY
      is_pinned DESC,
      updated_at DESC
  `).all();
});



/* -------------------------------------------------------------------------- */
/*                                GET ARCHIVED                                */
/* -------------------------------------------------------------------------- */

ipcMain.handle("get-archived", () => {
    return db.prepare(`
    SELECT *
    FROM notes
    WHERE
      is_archived = 1
      AND is_deleted = 0
    ORDER BY updated_at DESC
  `).all();
});



/* -------------------------------------------------------------------------- */
/*                                  GET TRASH                                 */
/* -------------------------------------------------------------------------- */

ipcMain.handle("get-trash", () => {
    return db.prepare(`
    SELECT *
    FROM notes
    WHERE is_deleted = 1
    ORDER BY deleted_at DESC
  `).all();
});



/* -------------------------------------------------------------------------- */
/*                               GET NOTE BY ID                               */
/* -------------------------------------------------------------------------- */

ipcMain.handle("get-note-by-id", (event, id) => {
    return db.prepare(`
    SELECT *
    FROM notes
    WHERE id = ?
  `).get(id);
});



/* -------------------------------------------------------------------------- */
/*                                  UPDATE                                    */
/* -------------------------------------------------------------------------- */

ipcMain.handle("update-note", (event, note) => {
    const stmt = db.prepare(`
    UPDATE notes
    SET
      title = ?,
      content = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `);

    const result = stmt.run(
        note.title,
        note.content,
        note.id
    );

    return {
        success: true,
        changes: result.changes,
    };
});



/* -------------------------------------------------------------------------- */
/*                                 PIN NOTE                                   */
/* -------------------------------------------------------------------------- */

ipcMain.handle("toggle-pin", (event, id) => {
    return db.prepare(`
    UPDATE notes
    SET
      is_pinned = CASE
        WHEN is_pinned = 1 THEN 0
        ELSE 1
      END,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(id);
});



/* -------------------------------------------------------------------------- */
/*                              FAVORITE NOTE                                 */
/* -------------------------------------------------------------------------- */

ipcMain.handle("toggle-favorite", (event, id) => {
    return db.prepare(`
    UPDATE notes
    SET
      is_favorite = CASE
        WHEN is_favorite = 1 THEN 0
        ELSE 1
      END,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(id);
});



/* -------------------------------------------------------------------------- */
/*                               ARCHIVE NOTE                                 */
/* -------------------------------------------------------------------------- */

ipcMain.handle("toggle-archive", (event, id) => {
    return db.prepare(`
    UPDATE notes
    SET
      is_archived = CASE
        WHEN is_archived = 1 THEN 0
        ELSE 1
      END,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(id);
});



/* -------------------------------------------------------------------------- */
/*                                SOFT DELETE                                 */
/* -------------------------------------------------------------------------- */

ipcMain.handle("delete-note", (event, id) => {
    return db.prepare(`
    UPDATE notes
    SET
      is_deleted = 1,
      deleted_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(id);
});



/* -------------------------------------------------------------------------- */
/*                                   RESTORE                                  */
/* -------------------------------------------------------------------------- */

ipcMain.handle("restore-note", (event, id) => {
    return db.prepare(`
    UPDATE notes
    SET
      is_deleted = 0,
      deleted_at = NULL
    WHERE id = ?
  `).run(id);
});



/* -------------------------------------------------------------------------- */
/*                              DELETE FOREVER                                */
/* -------------------------------------------------------------------------- */

ipcMain.handle("delete-note-permanently", (event, id) => {
    return db.prepare(`
    DELETE FROM notes
    WHERE id = ?
  `).run(id);
});



/* -------------------------------------------------------------------------- */
/*                                   SEARCH                                   */
/* -------------------------------------------------------------------------- */

ipcMain.handle("search-notes", (event, query) => {
    return db.prepare(`
    SELECT *
    FROM notes
    WHERE
      is_deleted = 0
      AND (
        title LIKE ?
        OR content LIKE ?
      )
    ORDER BY
      is_pinned DESC,
      updated_at DESC
  `).all(
        `%${query}%`,
        `%${query}%`
    );
});



app.on("window-all-closed", () => {
    if (process.platform !== "darwin") {
        app.quit();
    }
});