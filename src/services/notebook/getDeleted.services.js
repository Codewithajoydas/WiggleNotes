const getDeleted = async () => {
  try {
    const result = await window.dbAPI.getTrash();
    return result;
  } catch (error) {
    console.error("Failed to retrieve note:", error);
    throw error;
  }
};

export default getDeleted;