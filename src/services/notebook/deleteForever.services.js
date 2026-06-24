const deletePermanently = async (id) => {
  try {
    const result = await window.dbAPI.deleteNotePermanently(id);
    console.log("Note saved:", result);
    return result;
  } catch (error) {
    console.error("Failed to create note:", error);
    throw error;
  }
};

export default deletePermanently;
