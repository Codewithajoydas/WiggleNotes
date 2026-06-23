const { contextBridge, ipcRenderer } = require("electron");

contextBridge.exposeInMainWorld("dbAPI", {
    // Create
    createNote: (note) =>
        ipcRenderer.invoke("create-note", note),

    // Read
    getNotes: () =>
        ipcRenderer.invoke("get-notes"),

    getFavorites: () =>
        ipcRenderer.invoke("get-favorites"),

    getArchived: () =>
        ipcRenderer.invoke("get-archived"),

    getTrash: () =>
        ipcRenderer.invoke("get-trash"),

    getNoteById: (id) =>
        ipcRenderer.invoke("get-note-by-id", id),

    // Update
    updateNote: (note) =>
        ipcRenderer.invoke("update-note", note),

    // Actions
    togglePin: (id) =>
        ipcRenderer.invoke("toggle-pin", id),

    toggleFavorite: (id) =>
        ipcRenderer.invoke("toggle-favorite", id),

    toggleArchive: (id) =>
        ipcRenderer.invoke("toggle-archive", id),

    // Trash
    deleteNote: (id) =>
        ipcRenderer.invoke("delete-note", id),

    restoreNote: (id) =>
        ipcRenderer.invoke("restore-note", id),

    deleteNotePermanently: (id) =>
        ipcRenderer.invoke("delete-note-permanently", id),

    // Search
    searchNotes: (query) =>
        ipcRenderer.invoke("search-notes", query),
});