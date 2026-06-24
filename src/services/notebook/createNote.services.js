const createNote = async (note) => {
  try {
    const result = await window.dbAPI.createNote(note);
    console.log("Note saved:", result);
    return result;
  } catch (error) {
    console.error("Failed to create note:", error);
    throw error;
  }
};

export default createNote;
