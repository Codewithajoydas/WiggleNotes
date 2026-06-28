import Database from "better-sqlite3";
import { app, BrowserWindow, ipcMain, Menu } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import process from "process";
import fs from "fs";
import { dialog } from "electron";
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let db;
let win;
let IsSaved = true;
function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    icon: path.join(__dirname, "icon.ico"),
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#09090b",
      symbolColor: "#f4f4f5",
      height: 60,
    },

    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      spellcheck: true,
    },
  });

  const dbPath = path.join(app.getPath("userData"), "notebook.db");
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
      cover_type TEXT DEFAULT NULL,
      cover_value TEXT DEFAULT NULL,
      created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      updated_at DATETIME DEFAULT CURRENT_TIMESTAMP,
      deleted_at DATETIME DEFAULT NULL
    )
  `).run();
  
  


  win.webContents.on("context-menu", (event, params) => {
    if (!params.misspelledWord) return;

    const menu = Menu.buildFromTemplate([
      ...params.dictionarySuggestions.map((suggestion) => ({
        label: suggestion,
        click: () => {
          win.webContents.replaceMisspelling(suggestion);
        },
      })),
      { type: "separator" },
      {
        label: "Add to Dictionary",
        click: () => {
          win.webContents.session.addWordToSpellCheckerDictionary(
            params.misspelledWord
          );
        },
      },
    ]);

    menu.popup();
  });

  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  } else {
    win.loadURL("http://localhost:5173");
    win.webContents.openDevTools();
  }
  win.on("close", (event) => {
    if (!IsSaved) {
      event.preventDefault();
      const result = dialog.showMessageBoxSync(win, {
        type: "warning",
        buttons: ["Cancel", "Close"],
        defaultId: 0,
        cancelId: 0,
        title: "Unsaved Changes",
        message: "You have unsaved changes.",
        detail: "Do you really want to close the application?",
      });

      if (result === 1) {
        IsSaved = true;
        win.close();
      }
    }
  })
  // ---------------- Disable Browser Shortcuts ----------------

  // win.webContents.on("before-input-event", (event, input) => {
  //   const key = input.key.toLowerCase();

  //   // Refresh
  //   if (
  //     key === "f5" ||
  //     (input.control && key === "r") ||
  //     (input.control && input.shift && key === "r")
  //   ) {
  //     event.preventDefault();
  //   }

  //   // DevTools
  //   if (
  //     key === "f12" ||
  //     (input.control && input.shift && key === "i")
  //   ) {
  //     event.preventDefault();
  //   }

  //   // Zoom
  //   if (
  //     input.control &&
  //     (key === "+" || key === "-" || key === "=" || key === "0")
  //   ) {
  //     event.preventDefault();
  //   }

  //   // Browser Back / Forward
  //   if (
  //     input.alt &&
  //     (key === "arrowleft" || key === "arrowright")
  //   ) {
  //     event.preventDefault();
  //   }
  // });

  // // Disable zoom completely
  // win.webContents.setZoomFactor(1);
  // win.webContents.setVisualZoomLevelLimits(1, 1);

  // // Disable navigation
  // win.webContents.on("will-navigate", (event) => {
  //   event.preventDefault();
  // });

  // // Disable drag & drop navigation
  // win.webContents.on("will-redirect", (event) => {
  //   event.preventDefault();
  // });


  // // Disable changing page title
  // win.on("page-title-updated", (event) => {
  //   event.preventDefault();
  // });


}

app.whenReady().then(createWindow);



/* -------------------------------------------------------------------------- */
/*                                   CREATE                                   */
/* -------------------------------------------------------------------------- */



ipcMain.handle("create-note", (event, note) => {
  const stmt = db.prepare(`
    INSERT INTO notes (
      title,
      content,
      cover_type,
      cover_value
    )
    VALUES (?, ?, ?, ?)
  `);

  const result = stmt.run(
    note?.title ?? "Untitled",
    note?.content ?? "",
    note?.cover_type ?? null,
    note?.cover_value ?? null
  );

  return {
    success: true,
    id: result.lastInsertRowid,
    result
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
      updated_at DESC,
      id DESC
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
      cover_type = ?,
      cover_value = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `);

  const result = stmt.run(
    note.title,
    note.content,
    note.cover_type,
    note.cover_value,
    note.id
  );

  return {
    success: true,
    changes: result.changes,
    result
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


ipcMain.handle("rename-note", (_, id, title) => {
  const result = db.prepare(`
    UPDATE notes
    SET
      title = ?,
      updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `).run(title, id);

  return {
    success: true,
    changes: result.changes,
  };
});


/* -------------------------------------------------------------------------- */
/*                             PRINT NOTES                                   */
/* -------------------------------------------------------------------------- */


ipcMain.handle("export-pdf", async (_, html, fileName) => {
  const pdfWindow = new BrowserWindow({
    show: false,
  });

  await pdfWindow.loadURL(
    `data:text/html;charset=utf-8,${encodeURIComponent(html)}`
  );

  const pdf = await pdfWindow.webContents.printToPDF({
    printBackground: true,
  });

  const { canceled, filePath } =
    await dialog.showSaveDialog({
      title: "Save PDF",
      defaultPath: `${fileName}.pdf`,
      filters: [
        {
          name: "PDF Files",
          extensions: ["pdf"],
        },
      ],
    });

  if (canceled || !filePath) {
    pdfWindow.close();
    return null;
  }

  fs.writeFileSync(filePath, pdf);

  pdfWindow.close();

  return filePath;
});


ipcMain.handle("set-unsaved-changes", (_, value) => {
  IsSaved = value;
})


app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});