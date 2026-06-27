const getNoteById = async (id) => {
    try {
        const result = await window.dbAPI.getNoteById(id);
        return result;
    } catch (error) {
        console.error("Failed to retrieve note:", error);
        throw error;
    }
}

export default getNoteById