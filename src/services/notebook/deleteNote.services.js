const deleteNote = async (id) => {
    try {
        const result = await window.dbAPI.deleteNote(id);
        return result;
    } catch (error) {
        console.error("Failed to delete note:", error);
        throw error;
    }
}

export default deleteNote