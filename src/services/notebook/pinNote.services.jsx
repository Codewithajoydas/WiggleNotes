const pinNote = async (id) => {
  try {
    const result = await window.dbAPI.togglePin(id);
    console.log("Note retrieved:", result);
    return result;
  } catch (error) {
    console.error("Failed to retrieve note:", error);
    throw error;
  }
};

export default pinNote;
