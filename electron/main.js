import { app, BrowserWindow, ipcMain, Menu, dialog } from "electron";
import path from "path";
import { fileURLToPath } from "url";
import process from "process";

import { getDb } from "./db.js";
import { registerNoteHandlers } from "./ipc/notes.ipc.js";
import { registerSettingsHandlers } from "./ipc/settings.ipc.js";
import { registerPdfHandlers } from "./ipc/pdf.ipc.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

let win;
let splash;
let IsSaved = true;

function createSplash() {
  splash = new BrowserWindow({
    width: 360,
    height: 420,
    frame: false,
    transparent: true,
    resizable: false,
    movable: true,
    alwaysOnTop: true,
    skipTaskbar: true,
    icon: path.join(__dirname, "icon.ico"),
    webPreferences: {
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  splash.loadFile(path.join(__dirname, "splash.html"));
  splash.center();
}

function createWindow() {
  win = new BrowserWindow({
    width: 1200,
    height: 800,
    show: false, // don't show until ready, avoids white flash
    icon: path.join(__dirname, "icon.ico"),
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "#00000000",
      symbolColor: "#999",
      height: 60,
    },
    webPreferences: {
      preload: path.join(__dirname, "preload.cjs"),
      contextIsolation: true,
      nodeIntegration: false,
      spellcheck: true,
    },
  });

  // Init DB (creates tables if needed)
  getDb();

  // Spellcheck context menu
  win.webContents.on("context-menu", (event, params) => {
    if (!params.misspelledWord) return;
    const menu = Menu.buildFromTemplate([
      ...params.dictionarySuggestions.map((suggestion) => ({
        label: suggestion,
        click: () => win.webContents.replaceMisspelling(suggestion),
      })),
      { type: "separator" },
      {
        label: "Add to Dictionary",
        click: () =>
          win.webContents.session.addWordToSpellCheckerDictionary(
            params.misspelledWord
          ),
      },
    ]);
    menu.popup();
  });

  // Unsaved changes guard
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
  });

  if (app.isPackaged) {
    win.loadFile(path.join(__dirname, "../dist/index.html"));
  } else {
    win.loadURL("http://localhost:5173");
    win.webContents.openDevTools();
  }

  // Swap splash → main window once the renderer has actually painted
  win.once("ready-to-show", () => {
    setTimeout(() => {
      if (splash && !splash.isDestroyed()) splash.close();
      win.show();
    }, 400); // small buffer so the splash doesn't flash too briefly
  });
}

app.whenReady().then(() => {
  createSplash();
  createWindow();

  // Register all IPC handlers
  registerNoteHandlers();
  registerSettingsHandlers();
  registerPdfHandlers();
});

// Unsaved changes IPC
ipcMain.handle("set-unsaved-changes", (_, value) => {
  IsSaved = value;
});

app.on("window-all-closed", () => {
  if (process.platform !== "darwin") app.quit();
});