export default async function updateSettings(settings) {
    return await window.dbAPI.updateSettings(settings);
}