
export const checkSaved = async (saved) => {
    await window.dbAPI.setUnsavedChanges(saved);
};
