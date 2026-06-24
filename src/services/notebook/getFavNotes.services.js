const favNote = async () => {
  try {
    const result = await window.dbAPI.getFavorites();
    console.log("Note retrieved:", result);
    return result;
  } catch (error) {
    console.error("Failed to retrieve note:", error);
    throw error;
  }
};

export default favNote;
