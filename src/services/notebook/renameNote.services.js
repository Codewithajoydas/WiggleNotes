const renameNotes = async ({ id, title }) => {
    try {
        const result = await window.dbAPI.renameNote(id, title);
        return result;
    } catch (error) {
        console.log("Failed to create note:", error);
        throw error;
    }
}

export default renameNotes