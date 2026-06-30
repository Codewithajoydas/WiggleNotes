
  const restoreNote = async (id) => {
  try {
    const result = await window.dbAPI.restoreNote(id);
    return result;
  } catch (error) {
    console.error("Failed to create note:", error);
    throw error;
  }
};

export default restoreNote;
