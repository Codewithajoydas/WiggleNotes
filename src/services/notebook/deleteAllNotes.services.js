const deleteAllNotes = async () => {
    try {
        const result = await window.dbAPI.deleteAllNotes();
        return result;
    } catch (error) {
        console.error("Failed to delete all notes:", error);
        throw error;
    }
}

export default deleteAllNotes;