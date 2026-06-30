const restoreAllNotes = async () => {
    try {
        const result = await window.dbAPI.restoreAllNotes();
        return result;
    } catch (error) {
        console.error("Failed to restore all notes:", error);
        throw error;
    }
};

export default restoreAllNotes;