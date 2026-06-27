const favNote = async (id) => {
  try {
    const result = await window.dbAPI.toggleFavorite(id);
    return result;
  } catch (error) {
    console.error("Failed to retrieve note:", error);
    throw error;
  }
};

export default favNote;
