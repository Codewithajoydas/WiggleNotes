const updateNote = async (note) => {
  try {
    const result = await window.dbAPI.updateNote(note);
    console.log("Note updated:", result);
    return result;
  } catch (error) {
    console.error("Failed to update note:", error);
    throw error;
  }
};

export default updateNote;