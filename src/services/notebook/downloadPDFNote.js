const exportPdf = async (html, fileName) => {
    return await window.dbAPI.exportPdf(
        html,
        fileName
    );
};

export default exportPdf;