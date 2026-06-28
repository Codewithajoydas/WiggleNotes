const checkSaved = async (saved) => {
    await window.dbAPI.setUnsavedChanges(saved);
};

export default checkSaved;