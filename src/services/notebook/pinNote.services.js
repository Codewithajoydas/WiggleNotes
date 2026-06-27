const pinNote = async (id) => {
  try {
    const result = await window.dbAPI.togglePin(id);
    return result;
  } catch (error) {
    console.error("Failed to retrieve note:", error);
    throw error;
  }
};

export default pinNote;
