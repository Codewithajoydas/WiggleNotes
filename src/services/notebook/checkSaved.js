
export default async function checkSaved(saved) {
    await window.dbAPI.setUnsavedChanges(saved);
};
